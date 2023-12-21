import * as cdk from 'aws-cdk-lib';
import {
  CachePolicy,
  OriginAccessIdentity,
  AllowedMethods,
  ViewerProtocolPolicy,
  CacheHeaderBehavior,
  Distribution,
  PriceClass,
  ResponseHeadersPolicy,
  HeadersFrameOption,
  HeadersReferrerPolicy,
  IDistribution,
  Function,
  FunctionCode,
  FunctionEventType,
  CfnOriginAccessControl,
  CfnDistribution,
} from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import { Effect, PolicyStatement, ServicePrincipal } from 'aws-cdk-lib/aws-iam';
import { BlockPublicAccess, Bucket, IBucket } from 'aws-cdk-lib/aws-s3';
import { BucketDeployment, Source } from 'aws-cdk-lib/aws-s3-deployment';
import { Construct } from 'constructs';

interface DeployPaths {
  path: string;
  alias: string;
}

interface Props extends cdk.StackProps {
  bucketName: string;
  identityName: string;
  defaultCachePolicyName: string;
  functionName: string;
  distributionName: string;
  projectNameTag: string;
  subDirectoryPath: DeployPaths[];
  oacName: string;
}
export class CardDraftTRPGFrontCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);
    // CloudFront オリジン用のS3バケットを作成
    const bucket = this.createS3(props.bucketName);
    const oac = this.createOAC(props.oacName);
    // CloudFrontディストリビューションを作成
    const distribution = this.createCloudFront(bucket, oac, props);
    this.createPolicy(bucket, distribution);

    // // // 指定したディレクトリをデプロイ
    // for (const item of props.subDirectoryPath) {
    //   this.deployS3(
    //     bucket,
    //     distribution,
    //     item.path,
    //     props.bucketName,
    //     item.alias,
    //   );
    //   // 確認用にCloudFrontのURLに整形して出力
    //   new cdk.CfnOutput(
    //     this,
    //     `${props.distributionName}-${item.alias}-top-url`,
    //     {
    //       value: `https://${distribution.distributionDomainName}/${item.alias}/`,
    //     },
    //   );
    // }

    cdk.Tags.of(this).add('Project', props.projectNameTag);
  }
  private createS3(bucketName: string) {
    const bucket = new Bucket(this, bucketName, {
      bucketName,
      blockPublicAccess: BlockPublicAccess.BLOCK_ALL,
      removalPolicy: cdk.RemovalPolicy.DESTROY,
      autoDeleteObjects: true,
      // デフォルト = accessControl: BucketAccessControl.PRIVATE,
    });
    return bucket;
  }
  private createOAC(name: string) {
    const cfnOriginAccessControl = new CfnOriginAccessControl(this, name, {
      originAccessControlConfig: {
        name,
        originAccessControlOriginType: 's3',
        signingBehavior: 'always', // 推奨:CloudFront は S3 バケットオリジンに送信するすべてのリクエストに常に署名。
        signingProtocol: 'sigv4', // オリジンアクセスコントロールの署名プロトコル。有効な値は sigv4 のみ
        description: 'S3 Access Control',
      },
    });
    return cfnOriginAccessControl;
  }
  private createPolicy(bucket: Bucket, distribution: Distribution) {
    const myBucketPolicy = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ['s3:GetObject', 's3:ListBucket'],
      principals: [new ServicePrincipal('cloudfront.amazonaws.com')],
      resources: [bucket.bucketArn + '/*', bucket.bucketArn],
    });
    bucket.addToResourcePolicy(myBucketPolicy);
    myBucketPolicy.addCondition('StringEquals', {
      'AWS:SourceArn': `arn:aws:cloudfront::${
        cdk.Stack.of(this).account
      }:distribution/${distribution.distributionId}`,
    });
  }
  private createCloudFront(
    bucket: Bucket,
    oac: CfnOriginAccessControl,
    props: {
      defaultCachePolicyName: string;
      distributionName: string;
      functionName: string;
    },
  ) {
    const { defaultCachePolicyName, distributionName } = props;
    const defaultPolicyOption = {
      cachePolicyName: defaultCachePolicyName,
      comment: '薬味ポリシー',
      enableAcceptEncodingGzip: true,
      enableAcceptEncodingBrotli: true,
    };
    const myCachePolicy = new CachePolicy(
      this,
      defaultCachePolicyName,
      defaultPolicyOption,
    );

    const origin = new S3Origin(bucket);

    const spaRoutingFunction = new Function(this, 'SpaRoutingFunction', {
      functionName: props.functionName,
      // 拡張子が含まれないURLはSPAファイルにリダイレクト
      code: FunctionCode.fromInline(`
      function handler(event) {
        var request = event.request;
        if(request.uri.includes('.')){
          return request;
        } else if(request.uri.startsWith('/app')) {
          request.uri = '/app/index.html';
        } else if (request.uri.endsWith('/')) {
          request.uri = request.uri + 'index.html';
        }
        return request;
      }
      `),
    });

    const responseHeadersPolicy = this.createResponseHeadersPolicy();
    const additionalBehaviors = {
      'data/*': {
        origin,
        allowedMethods: AllowedMethods.ALLOW_ALL,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        cachePolicy: new CachePolicy(
          this,
          `${distributionName}-data-cache-policy`,
          {
            cachePolicyName: `${distributionName}-data-cache-cache-policy`,
            comment: 'CloudFront 薬味 データ部用ポリシー',
            defaultTtl: cdk.Duration.seconds(0),
            maxTtl: cdk.Duration.seconds(10),
            headerBehavior: CacheHeaderBehavior.allowList('content-type'),
          },
        ),
      },
    };
    const d = new Distribution(this, distributionName, {
      comment: 'Yakumi',
      defaultRootObject: '/index.html',
      priceClass: PriceClass.PRICE_CLASS_200,
      defaultBehavior: {
        origin,
        cachePolicy: myCachePolicy,
        viewerProtocolPolicy: ViewerProtocolPolicy.REDIRECT_TO_HTTPS,
        responseHeadersPolicy,
        functionAssociations: [
          {
            eventType: FunctionEventType.VIEWER_REQUEST,
            function: spaRoutingFunction,
          },
        ],
      },
      additionalBehaviors,
    });
    cdk.Tags.of(d).add('Service', 'Cloud Front');
    this.settindDestribution(d, bucket, oac);

    return d;
  }

  private settindDestribution(
    d: Distribution,
    bucket: Bucket,
    oac: CfnOriginAccessControl,
  ) {
    // Additional settings for origin 0 (0:appBucket)
    const cfnDistribution = d.node.defaultChild as CfnDistribution;
    // Delete OAI
    cfnDistribution.addOverride(
      'Properties.DistributionConfig.Origins.0.S3OriginConfig.OriginAccessIdentity',
      '',
    );

    // OAC does not require CustomOriginConfig
    cfnDistribution.addPropertyDeletionOverride(
      'DistributionConfig.Origins.0.CustomOriginConfig',
    );

    // By default, the s3 WebsiteURL is set and an error occurs, so set the S3 domain name
    cfnDistribution.addPropertyOverride(
      'DistributionConfig.Origins.0.DomainName',
      bucket.bucketRegionalDomainName,
    );

    // OAC settings
    cfnDistribution.addPropertyOverride(
      'DistributionConfig.Origins.0.OriginAccessControlId',
      oac.getAtt('Id'),
    );
  }

  private createResponseHeadersPolicy() {
    const responseHeadersPolicy = new ResponseHeadersPolicy(
      this,
      'ResponseHeadersPolicy',
      {
        securityHeadersBehavior: {
          contentTypeOptions: { override: true },
          frameOptions: {
            frameOption: HeadersFrameOption.SAMEORIGIN,
            override: true,
          },
          referrerPolicy: {
            referrerPolicy: HeadersReferrerPolicy.SAME_ORIGIN,
            override: true,
          },
          strictTransportSecurity: {
            accessControlMaxAge: cdk.Duration.seconds(63072000),
            includeSubdomains: true,
            preload: true,
            override: true,
          },
          xssProtection: {
            protection: true,
            modeBlock: true,
            override: true,
          },
        },
        corsBehavior: {
          accessControlAllowOrigins: [
            'https://dh5e1l151hf9t.cloudfront.net',
            'https://ccfolia.com',
          ],
          accessControlAllowHeaders: ['*'],
          accessControlAllowMethods: ['ALL'],
          accessControlAllowCredentials: false,
          originOverride: true,
        },
        customHeadersBehavior: {
          customHeaders: [
            {
              header: 'Cache-Control',
              value: 'no-cache',
              override: true,
            },
            {
              header: 'pragma',
              value: 'no-cache',
              override: true,
            },
            {
              header: 'server',
              value: '',
              override: true,
            },
          ],
        },
      },
    );
    return responseHeadersPolicy;
  }

  private deployS3(
    siteBucket: IBucket,
    distribution: IDistribution,
    sourcePath: string,
    bucketName: string,
    basepath: string,
  ) {
    new BucketDeployment(
      this,
      `${bucketName}-deploy-with-invalidation-${basepath}`,
      {
        sources: [Source.asset(sourcePath)],
        destinationBucket: siteBucket,
        distribution,
        distributionPaths: [`/${basepath}/*`],
        destinationKeyPrefix: basepath,
      },
    );
  }
}
