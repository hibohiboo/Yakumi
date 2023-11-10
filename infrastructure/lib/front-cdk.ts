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
} from 'aws-cdk-lib/aws-cloudfront';
import { S3Origin } from 'aws-cdk-lib/aws-cloudfront-origins';
import {
  CanonicalUserPrincipal,
  Effect,
  PolicyStatement,
} from 'aws-cdk-lib/aws-iam';
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
}
export class CardDraftTRPGFrontCdkStack extends cdk.Stack {
  constructor(scope: Construct, id: string, props: Props) {
    super(scope, id, props);
    // CloudFront オリジン用のS3バケットを作成
    const bucket = this.createS3(props.bucketName);

    // CloudFront で設定する オリジンアクセスアイデンティティ を作成
    const identity = this.createIdentity(bucket, props.identityName);

    // S3バケットポリシーで、CloudFrontのオリジンアクセスアイデンティティを許可
    this.createPolicy(bucket, identity);

    // CloudFrontディストリビューションを作成
    const distribution = this.createCloudFront(bucket, identity, props);

    // // 指定したディレクトリをデプロイ
    for (const item of props.subDirectoryPath) {
      this.deployS3(
        bucket,
        distribution,
        item.path,
        props.bucketName,
        item.alias,
      );
      // 確認用にCloudFrontのURLに整形して出力
      new cdk.CfnOutput(
        this,
        `${props.distributionName}-${item.alias}-top-url`,
        {
          value: `https://${distribution.distributionDomainName}/${item.alias}/`,
        },
      );
    }

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

  private createIdentity(bucket: Bucket, identityName: string) {
    const identity = new OriginAccessIdentity(this, identityName, {
      comment: `${bucket.bucketName} access identity`,
    });
    return identity;
  }
  private createPolicy(bucket: Bucket, identity: OriginAccessIdentity) {
    const myBucketPolicy = new PolicyStatement({
      effect: Effect.ALLOW,
      actions: ['s3:GetObject', 's3:ListBucket'],
      principals: [
        new CanonicalUserPrincipal(
          identity.cloudFrontOriginAccessIdentityS3CanonicalUserId,
        ),
      ],
      resources: [bucket.bucketArn + '/*', bucket.bucketArn],
    });
    bucket.addToResourcePolicy(myBucketPolicy);
  }
  private createCloudFront(
    bucket: Bucket,
    identity: OriginAccessIdentity,
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

    const origin = new S3Origin(bucket, {
      originAccessIdentity: identity,
    });

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

    return d;
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
