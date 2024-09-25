#!/bin/bash

BIN_DIR=$(cd $(dirname $0) && pwd)
BICEP_DIR=$(cd $BIN_DIR/../biceps && pwd)

# 環境変数読み込み
source $BIN_DIR/.env

EXT_KEY=$(az functionapp keys list -g yakumi -n nkymspaiut5dsazfunctionsapp |  jq -r '.systemKeys.blobs_extension' )

cd $BICEP_DIR && az deployment group create \
  --name ExampleDeployment \
  --template-file eventGrid.bicep \
  --parameters \
    functionAppName=$BATCH_NAME \
    blobExtensionKey=$EXT_KEY \
    uploadStroageAccountName=$UPLOAD_STORAGE_ACCOUNT_NAME \
  -g $RESOURCE_GROUP_NAME

