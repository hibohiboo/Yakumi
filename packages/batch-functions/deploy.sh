#!/bin/bash
BIN_DIR=$(cd $(dirname $0) && pwd)
BUILD_DIR=$BIN_DIR/build

# 事前にビルド
bash build.sh

cd $BUILD_DIR && func azure functionapp publish $APP_NAME --subscription $AZURE_SUBSCRIPTION_ID

