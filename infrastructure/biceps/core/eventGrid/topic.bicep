param location string

var uploadStroageAccountName = 'upload2yakumi'
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
