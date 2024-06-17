#!/bin/bash

bin_dir=$(cd $(dirname $0) && pwd)
parent_dir=$(cd $bin_dir/.. && pwd)
work_dir=$(cd $bin_dir/../../.. && pwd)

source $bin_dir/.env
cd $work_dir

# docker run \
#     --rm \
#      -v sonar_cache:/opt/sonar-scanner/.sonar/cache \
#     -e SONAR_HOST_URL="http://host.docker.internal:9000/"  \
#     -e SONAR_TOKEN="$SONAR_TOKEN" \
#     -v ".:/usr/src" \
#     sonarsource/sonar-scanner-cli

# cd $parent_dir && curl -s -u admin:$SONAR_PASS -G -d "component=Yakumi" -d "metricKeys=cognitive_complexity" http://localhost:9000/api/measures/component_tree | jq '.baseComponent' > ./reports/cognitiveComplexity.json
# cd $parent_dir && curl -s -u admin:$SONAR_PASS -G -d "component=Yakumi" -d "metricKeys=duplicated_blocks" http://localhost:9000/api/measures/component_tree | jq '.baseComponent' > ./reports/duplicated_blocks.json
cd $parent_dir && curl -s -u admin:$SONAR_PASS -G -d "component=Yakumi" -d "metricKeys=new_violations" http://localhost:9000/api/measures/component_tree | jq '.baseComponent' > ./reports/new_violations.json
cd $parent_dir && curl -s -u admin:$SONAR_PASS -G -d "component=Yakumi" -d "metricKeys=code_smells" http://localhost:9000/api/measures/component_tree | jq '.baseComponent' > ./reports/code_smells.json
cd $parent_dir && curl -s -u admin:$SONAR_PASS -G -d "component=Yakumi" -d "metricKeys=bugs" http://localhost:9000/api/measures/component_tree | jq '.baseComponent' > ./reports/bugs.json
cd $parent_dir && curl -s -u admin:$SONAR_PASS -G -d "component=Yakumi" -d "metricKeys=classes" http://localhost:9000/api/measures/component_tree | jq '.baseComponent' > ./reports/classes.json
cd $parent_dir && curl -s -u admin:$SONAR_PASS -G -d "component=Yakumi" -d "metricKeys=comment_lines" http://localhost:9000/api/measures/component_tree | jq '.baseComponent' > ./reports/comment_lines.json

cd $parent_dir && curl -s -u admin:$SONAR_PASS -G -d "component=Yakumi" -d "metricKeys=coverage" http://localhost:9000/api/measures/component_tree | jq '.baseComponent' > ./reports/coverage.json
cd $parent_dir && curl -s -u admin:$SONAR_PASS -G -d "component=Yakumi" -d "metricKeys=tests" http://localhost:9000/api/measures/component_tree | jq '.baseComponent' > ./reports/tests.json
