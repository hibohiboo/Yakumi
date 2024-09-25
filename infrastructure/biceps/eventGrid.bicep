param location string = resourceGroup().location
param functionAppName string
param blobExtensionKey string
param uploadStroageAccountName string
module myTopic 'core/eventGrid/topic.bicep' = {
  name: 'myTopic'
  params: {
    location: location
    uploadStroageAccountName: uploadStroageAccountName
  }
}

module mySubscription 'core/eventGrid/subscription.bicep' = {
  name: 'mySubscription'
  params: {
    functionAppName: functionAppName
    blobExtensionKey: blobExtensionKey
  }
}

// // 組み込みロール: https://learn.microsoft.com/ja-jp/azure/role-based-access-control/built-in-roles
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
