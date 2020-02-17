# AI Library UI

## Development
Edit the .env to include your endpoints for services such as `REACT_APP_DEV_REGRESSOR_URL`
run `yarn start`

## Build and deployment
To facilitate building a new image and deploying, a `makefile` has been included with several target instructions.  Several command require editing a `.env` file.  Follow the [.env.example](.env.example) as needed.  Run `make cmd` to perform a task.
- `build`: Creates the container by running `yarn` and `s2i` commands.  Those tools are required to build the UI.  In addition, you must use Node.js version 12.  A `.nvmrc` file is supplied for use with nvm.
- `push`: Pushes the built image to a repository.  Uses the `IMAGE_REPOSITORY` set in the .env file but defaulted to `quay.io/opendatahub/ai-library-ui:latest`.
- `deploy`: Deploys a new nginx deployment to the server declared in the .env file using the built container from the image repo.
- `rollout`: Redeploys an existing nginx deployment from the updated container in the image repo.
- `undeploy`: Deletes all artifacts from the nginx deployment.

## Alternate Build and Deployment on OpenShift
Instead of locally building the assets, creating the image, pushing the image, and deploying just the Nginx deployment, you use the Openshift s2i capabilities build from source and deploy everything on the cluster.
- `openshift-build`: Creates s2i builds for the react application, nginx s2i, and deploys the application.
- `rollout-openshift-build`: Triggers a rebuild and deployment of the application.
- `undeploy-openshift-build`: Removes all build and deployment artifacts.


