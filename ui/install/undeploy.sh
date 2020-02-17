#!/usr/bin/env bash

DIR="$( cd "$( dirname "${BASH_SOURCE[0]}" )" >/dev/null 2>&1 && pwd )"

IMAGE_REPOSITORY=${IMAGE_REPOSITORY:-quay.io/opendatahub/ai-library-ui:latest}

echo "Removing ${IMAGE_REPOSITORY}"

oc process -f ${DIR}/templates/ui-webserver.yml | oc delete -f -
