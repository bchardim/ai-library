ENV_FILE := .env

ifneq ("$(wildcard $(ENV_FILE))","")
include ${ENV_FILE}
export $(shell sed 's/=.*//' ${ENV_FILE})
endif

.DEFAULT_GOAL := build

.PHONY: oc-login
oc-login:
	${OC} login ${OC_URL} -u ${OC_USER} -p ${OC_PASSWORD} --insecure-skip-tls-verify=true
	${OC} project ${PROJECT} 2> /dev/null || oc new-project ${PROJECT}

.PHONY: openshift-build
openshift-build: oc-login
	./install/deploy-openshift-build.sh

.PHONY: rollout-openshift-build
rollout-openshift-build: oc-login
	./install/rollout-openshift-build.sh

.PHONY: undeploy-openshift-build
undeploy-openshift-build: oc-login
	./install/undeploy-openshift-build.sh

.PHONY: build
build:
	./install/build.sh

.PHONY: push
push:
	./install/push.sh

.PHONY: deploy
deploy: oc-login
	./install/deploy.sh

.PHONY: rollout
rollout: oc-login
	./install/rollout.sh

.PHONY: undeploy
undeploy: oc-login
	./install/undeploy.sh

