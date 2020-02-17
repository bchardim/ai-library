#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

REPLICAS=${REPLICAS:-1}
IMAGE_REPOSITORY=${IMAGE_REPOSITORY:-quay.io/opendatahub/ai-library-ui:latest}

echo "Deploying ${IMAGE_REPOSITORY}"

oc process -f ${DIR}/templates/ui-webserver.yml \
  -p REPLICAS=${REPLICAS} \
  -p IMAGE_REPOSITORY=${IMAGE_REPOSITORY} \
  -p REGRESSOR_URL=${REGRESSOR_URL} \
  -p FLAKE_URL=${FLAKE_URL} \
  | oc create -f -
