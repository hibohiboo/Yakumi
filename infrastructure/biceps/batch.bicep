param location string = resourceGroup().location
param functionsRuntime object
param functionAppName string
param uploadStroageAccountName string
param sqlServerName string
param sqlServerDbName string

var storageAccountName = '${uniqueString(resourceGroup().id)}azfunctions'
var applicationInsightsName = '${uniqueString(resourceGroup().id)}applicationinsights'
var logAnalyticsName = '${uniqueString(resourceGroup().id)}logAnalytics'
var environments = [
  {
    name: 'TARGET_STORAGE_ACCOUNT__accountName'
    value: uploadStroageAccountName
  }
  {
    name: 'TARGET_STORAGE_ACCOUNT__blobServiceUri'
    value: 'https://${uploadStroageAccountName}.blob.core.windows.net'
  }
  {
    name: 'TARGET_STORAGE_ACCOUNT__queueServiceUri'
    value: 'https://${uploadStroageAccountName}.queue.core.windows.net'
  }
  {
    name: 'DATABASE_CONNECTION_STRING'
    value: 'Server=tcp:${sqlServerName}.database.windows.net;Authentication=Active Directory Default; Database=${sqlServerDbName};'
  }
]
module myFunctionsApplicationInsights 'core/host/applications.bicep' = {
  name: 'myFunctionsApplicationInsights'
  params: {
    location: location
    applicationInsightsName: applicationInsightsName
    logAnalyticsName: logAnalyticsName
  }
}

module myFunctionsStorage 'core/storage/storage-account.bicep' = {
  name: 'myFunctionsStorage'
  params: {
    location: location
    storageAccountName: storageAccountName
  }
}

module myFunctions 'core/host/functions.bicep' = {
  name: 'myFunctions'
  params: {
    functionAppName: functionAppName
    location: location
    storageAccountName: storageAccountName
    kind: functionsRuntime.kind
    runtime: functionsRuntime.runtime
    linuxFxVersion: functionsRuntime.linuxFxVersion
    extensionVersion: functionsRuntime.extensionVersion
    applicationInsightsInstrumentationKey: myFunctionsApplicationInsights.outputs.applicationInsightsInstrumentationKey
    environments: environments
  }
}

// 組み込みロール: https://learn.microsoft.com/ja-jp/azure/role-based-access-control/built-in-roles
var storageRoleDefinitionId= 'ba92f5b4-2d11-453d-a403-e96b0029c9fe' // ストレージ BLOB データ共同作成者
var principalId = myFunctions.outputs.principalId
module myStorageRole 'core/rbac/role.bicep' = {
  name: 'myStorageRole'
  params: {
    uploadStroageAccountName: uploadStroageAccountName
    principalId: principalId
    roleDefinitionId: storageRoleDefinitionId
  }
}
