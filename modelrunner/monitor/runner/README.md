The source in this directory is what will be used, in combination with the model file (from S3/Ceph storage), to
creat the image that will be used by Seldon to serve the model.

This image will typically get built by OpenShift as a result of calls to `oc new-build ...` and `oc start-build ...`.
It will use registry.access.redhat.com/ubi8/python-36 as the base image during that build.

If you want to build this locally, you can run the oc new-build and oc start-build commands in this directory after
you have copied your model.pkl file into this directory.

After you have the image built, you could either use oc new-app to launch the image directly or you could create
a new SeldonDeployment object, specifying your new image, and allow Seldon to handle the hosting of the new service
for your model.
