using 'batch.bicep'

param location = 'japaneast'
param functionAppName = ''
param uploadStroageAccountName = 'upload2yakumi'
param functionsRuntime = {
  runtime: 'node'
  linuxFxVersion: 'Node|20'
  kind: 'functionapp,linux'
  extensionVersion: '~4'
}
param sqlServerName = ''
param sqlServerDbName = ''
