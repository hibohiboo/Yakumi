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
