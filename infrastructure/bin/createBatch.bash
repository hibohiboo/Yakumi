#!/bin/bash

BIN_DIR=$(cd $(dirname $0) && pwd)
BICEP_DIR=$(cd $BIN_DIR/../biceps && pwd)

# 環境変数読み込み
source $BIN_DIR/.env

cd $BICEP_DIR && az deployment group create \
  --name ExampleDeployment \
  --template-file batch.bicep \
  --parameters batch.bicepparam \
  --parameters \
    functionAppName=$BATCH_NAME \
    uploadStroageAccountName=$UPLOAD_STORAGE_ACCOUNT_NAME \
    sqlServerName=$DB_SERVER_NAME \
    sqlServerDbName=$SQLSERVER_DB_NAME \
  -g $RESOURCE_GROUP_NAME

