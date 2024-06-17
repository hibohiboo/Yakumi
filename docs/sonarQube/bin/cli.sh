#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
work_dir=$(cd $bin_dir/../../.. && pwd)

source $bin_dir/.env
cd $work_dir

docker run \
    --rm \
     -v sonar_cache:/opt/sonar-scanner/.sonar/cache \
    -e SONAR_HOST_URL="http://host.docker.internal:9000/"  \
    -e SONAR_TOKEN="$SONAR_TOKEN" \
    -v ".:/usr/src" \
    sonarsource/sonar-scanner-cli