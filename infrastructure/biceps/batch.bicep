param location string = resourceGroup().location
param functionsRuntime object

var storageAccountName = '${uniqueString(resourceGroup().id)}azfunctions'
var applicationInsightsName = '${uniqueString(resourceGroup().id)}applicationinsights'
var logAnalyticsName = '${uniqueString(resourceGroup().id)}logAnalytics'
var functionAppName = '${uniqueString(resourceGroup().id)}azfunctionsapp'

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
  }
}

// module myTopic 'core/eventGrid/topic.bicep' = {
//   name: 'myTopic'
//   params: {
//     location: location
//   }
// }

// module mySubscription 'core/eventGrid/subscription.bicep' = {
//   name: 'mySubscription'
//   params: {
//     functionAppName: functionAppName
//   }
// }

// 組み込みロール: https://learn.microsoft.com/ja-jp/azure/role-based-access-control/built-in-roles
// var storageRoleDefinitionId= 'ba92f5b4-2d11-453d-a403-e96b0029c9fe' // ストレージ BLOB データ共同作成者
// var queueRoleDefinitionId= '974c5e8b-45b9-4653-ba55-5f855dd0fb88' // ストレージ キュー データ共同作成者
// var principalId = myFunctions.outputs.principalId
// module myStorageRole 'core/rbac/role.bicep' = {
//   name: 'myStorageRole'
//   params: {
//     queueAndContainerStorageAccountName: queueAndContainerStorageAccountName
//     principalId: principalId
//     roleDefinitionId: storageRoleDefinitionId
//   }
// }
