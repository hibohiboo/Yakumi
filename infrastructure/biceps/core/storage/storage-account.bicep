param storageAccountName string
param storageAccountType string = 'Standard_LRS'
param location string
resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' = {
  name: storageAccountName
  location: location
  kind: 'StorageV2'
  sku: { name: storageAccountType }
}
