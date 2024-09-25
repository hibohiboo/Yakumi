using 'batch.bicep'

param functionsRuntime = {
  runtime: 'node'
  linuxFxVersion: 'Node|20'
  kind: 'functionapp,linux'
  extensionVersion: '~4'
}

