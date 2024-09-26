param functionAppName string
param blobExtensionKey string

var eventSubName = 'subToStorage'
var systemTopicName = 'mystoragesystemtopic'

resource systemTopic 'Microsoft.EventGrid/systemTopics@2023-12-15-preview' existing = {
  name: systemTopicName
}

var endpoint = 'https://${functionAppName}.azurewebsites.net/runtime/webhooks/blobs?functionName=Host.Functions.BlobTriggerEventGrid&code=${blobExtensionKey}'

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

