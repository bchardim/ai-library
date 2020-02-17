# Anomaly Detection

Anomaly Detection is used to anomalous records in data. The model is based on outlier detection using Isolation Forest.

## Contents

`detect_anomaly.py` - IsolationForest model to identify anomalies.

This is designed to be ran inside an Argo workflow.  The workflow will define the input and output locations (on S3 storage).
Argo can be configured to handle the S3 authentication or that information can be defined in the Argo workflow yaml itself.

##### Parameters
* inputdir - Directory where training data is located
* outputdir - Directory where the trained model and other supporting entities get uploaded

## Training this model with data from S3 storage via an Argo workflow

* The workflow in tools/anomaly-detection-training.yaml has been set up to accept parameters for -
    - endpoint
    - bucket
    - credentials
    - input-data-key
    - result-key

Ensure that the parameters that are specified for `endpoint`, `bucket`, `input-data-key` and `result-key` match your S3 environment,
 and the parameter for `credentials` matches the credentials in your environment


* Note the accessKeySecret and secretKeySecret values point to a secret that you must have defined.  The values in that secret will be the **base64 encoded** values of your S3 accessKey and secretKey
You can edit the tools/secret-sample.yaml to include your **base64 encoded** values and then run `oc create -f tools/secret-sample.yaml` to create the secrets.
* Launch the argo workflow via the argo cli:  
`argo submit --watch ./tools/anomaly-detection-training.yaml -p endpoint=<endpoint> -p bucket=<bucket> -p credentials=<credentials> -p input-data-key=<input-data-key> -p result-key=<result-key>`