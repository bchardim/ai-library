#!/usr/bin/env /bin/sh

DIR=`pwd`
IMAGE_REPOSITORY=${IMAGE_REPOSITORY:-quay.io/opendatahub/ai-library-ui:latest}

echo "Building ${IMAGE_REPOSITORY} from local"

cd ${DIR}
rm -rf build
yarn install
yarn build
s2i build ./build centos/nginx-114-centos7 ${IMAGE_REPOSITORY}
