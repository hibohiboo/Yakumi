#!/bin/bash
BIN_DIR=$(cd $(dirname $0) && pwd)
BUILD_DIR=$BIN_DIR/build
rimraf ./build
rimraf ./dist
npm run build
mkdir $BUILD_DIR
cp -r dist $BUILD_DIR
cp host.json $BUILD_DIR
cp .funcignore $BUILD_DIR
cp local.settings.json $BUILD_DIR
# package.json から devDependencies を削除して、本番環境用の node_modules を作成 (@async-ttrpg/typescript-configなどmonorepoの機能で参照しているパッケージがエラーを引き起こすため)
jq 'del(.devDependencies)' package.json > temp.json && mv temp.json $BUILD_DIR/package.json

npm run build --if-present

cd $BUILD_DIR && npm install -omit=dev 