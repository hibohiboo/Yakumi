param queueAndContainerStorageAccountName string
param principalId string
param roleDefinitionId string

resource storageAccount 'Microsoft.Storage/storageAccounts@2023-01-01' existing = {
  name: queueAndContainerStorageAccountName
}

resource roleAssignment 'Microsoft.Authorization/roleAssignments@2022-04-01' = {
  scope: storageAccount
  name: guid(storageAccount.id, principalId, roleDefinitionId)
  properties: {
    roleDefinitionId: resourceId('Microsoft.Authorization/roleDefinitions', roleDefinitionId)
    principalId: principalId
    principalType: 'ServicePrincipal'
  }
}
