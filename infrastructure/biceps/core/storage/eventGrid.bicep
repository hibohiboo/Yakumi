param location string
param functionAppName string

var uploadStroageAccountName = 'upload2yakumi'
var eventSubName = 'subToStorage'
var systemTopicName = 'mystoragesystemtopic'


resource uploadedStorageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' existing = {
  name: uploadStroageAccountName
}

resource systemTopic 'Microsoft.EventGrid/systemTopics@2023-12-15-preview' = {
  name: systemTopicName
  location: location
  identity: {
    type: 'SystemAssigned'
  }
  properties: {
    source: uploadedStorageAccount.id
    topicType: 'Microsoft.Storage.StorageAccounts'
  }
}
resource functionApp 'Microsoft.Web/sites/functions@2022-09-01' existing  = {
  name: functionAppName
}
var endpoint = 'https://${functionAppName}.azurewebsites.net/runtime/webhooks/blobs?functionName=Host.Functions.BlobTriggerEventGrid&code=${listKeys(functionApp.id, '2022-09-01').keys[0].value}'

resource eventSubscription 'Microsoft.EventGrid/systemTopics/eventSubscriptions@2023-12-15-preview' = {
  parent: systemTopic
  name: eventSubName
  properties: {
    destination: {
      properties: {
        endpointUrl: endpoint
      }
      endpointType: 'WebHook'
    }
    filter: {
      includedEventTypes: [
        'Microsoft.Storage.BlobCreated' // 	BLOB が作成または置換されたときにトリガー.  https://learn.microsoft.com/ja-jp/azure/event-grid/event-schema-blob-storage
      ]
    }
  }
}

