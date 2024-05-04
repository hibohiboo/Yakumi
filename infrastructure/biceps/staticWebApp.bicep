param staticSites_yakumi_static_web_app_name string = 'yakumi-web-app'
param staticSitesLocation string = 'eastasia'

resource staticSites_my_first_static_web_app_name_resource 'Microsoft.Web/staticSites@2023-01-01' = {
  name: staticSites_yakumi_static_web_app_name
  location: staticSitesLocation
  sku: {
    name: 'Free'
    tier: 'Free'
  }
  properties: {
    repositoryUrl: 'https://dev.azure.com/hibohiboo/カルタグラフ/_git/yakumi'
    branch: 'main'
    stagingEnvironmentPolicy: 'Enabled'
    allowConfigFileUpdates: true
    provider: 'DevOps'
    enterpriseGradeCdnStatus: 'Disabled'
  }
}

resource staticSites_my_first_static_web_app_name_default 'Microsoft.Web/staticSites/basicAuth@2023-01-01' = {
  parent: staticSites_my_first_static_web_app_name_resource
  name: 'default'
  properties: {
    applicableEnvironmentsMode: 'SpecifiedEnvironments'
  }
}
