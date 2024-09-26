#!/bin/bash

BIN_DIR=$(cd $(dirname $0) && pwd)
BICEP_DIR=$(cd $BIN_DIR/../biceps && pwd)
RESOURCE_GROUP_NAME='yakumi'
LOCATION=japaneast

cd $BICEP_DIR && az deployment sub create \
  --name demoSubDeployment \
  --location $LOCATION \
  --template-file resourceGroup.bicep \
  --parameters resourceGroupName=$RESOURCE_GROUP_NAME resourceGroupLocation=$LOCATION

cd $BICEP_DIR && az deployment group create \
  --name ExampleDeployment \
  --template-file staticWebApp.bicep \
  -g $RESOURCE_GROUP_NAME

