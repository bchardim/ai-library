# ai-library-operator

This is an Operator which deploys the components of AI Library Openshift. 

This Operator is an Ansible Operator

This project was generated using [operator-sdk](https://github.com/operator-framework/operator-sdk).

To deploy the operator (Requires cluster admin rights):
**Note:  In order to deploy models with this operator, Seldon must already be installed.**

```
$ oc create -f deploy/service_account.yaml
$ oc create -f deploy/role.yaml
$ oc create -f deploy/role_binding.yaml
$ oc create -f deploy/crds/ailibrary_v1alpha1_ailibrary_crd.yaml
$ oc create -f deploy/operator.yaml
```

To launch a set of AI Library components defined in a custom resource (you may also choose to edit this file before instantiating it for customization of the components you are installing):
```
$ oc create -f deploy/crds/ailibrary_v1alpha1_ailibrary_cr.yaml
```

To remove this operator and all objects created by it (Requires cluster admin rights):
```
$ oc delete ailibrary --all
$ oc delete crd ailibraries.ailibrary.opendatahub.io
$ oc delete serviceaccount ailibrary-operator
$ oc delete rolebinding ailibrary-operator
$ oc delete role ailibrary-operator
$ oc delete deployment ailibrary-operator