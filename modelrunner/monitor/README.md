**NOTE:  In order for this to work, the Seldon CRD must be installed on the cluster and the Seldon services must be running
in the same project where this utility will run.**

This is the source for the image that will run the "monitor.py" script that will poll s3 storage for new models
in the specified bucket/folder.  When a new model is detected, it will trigger openshift to do a build of a new
image consisting of the model along with a wrapper python script that is used by Seldon to serve that model
in a SeldonDeployment.

If you just want to run this "out of the box" **(note the required parameter values on the oc create secret command)**.
1.  `oc create secret generic s3secrets --from-literal=S3SECRET=<your s3 secret> --from-literal=S3KEY=<your s3 key> --from-literal=S3ENDPOINT=<your s3 endpoint> --from-literal=S3POLLINTERVAL=<desired poll interval in seconds> --from-literal=S3PREFIX=<your folder/prefix to monitor> --from-literal=S3BUCKET=<your s3 bucket>`
2.  `oc create -f modelrunner.yaml`
3.  `oc new-app --template=modelrunner`


The image can be built with:
s2i build . quay.io/croberts/pythonocbase:latest quay.io/croberts/modelrunner
The environment variables can also be overridden at runtime as part of the oc new-app call.

The base image used above (quay.io/croberts/modelrunner) can be built in the ../base_image directory of this repo.
To build that, you can use either podman or docker to build that Dockerfile.  You could then use your own version
of the base image in the s2i command above.
