# Flake Analysis

Flake analysis is used to identify false positive in test failures. The model uses DBSCAN clustering algorithm to cluster false positives and then predict the chances of a given failure being a false positive.

## Contents

`flakes_training.py` - Clustering (DBSCAN) based model to group false positives in test failures

This is designed to be ran inside an Argo workflow.  The workflow will define the input and output locations (on S3 storage).
Argo can be configured to handle the S3 authentication or that information can be defined in the Argo workflow yaml itself.

##### Parameters
* inputdir - Directory where training data is located


## Sample Data

The input data should be a set of json files.  If using S3 storage and an Argo workflow, the files should be zipped together in a single file.

The following example shows what an individual training data looks like. 

    record1.json
    {
        "id":"041f6832-aa14-4f6e-891d-31aaf8d7ed01",
        "status":"failure",
        "pull":7331,
        "log":"# ----------------------------------------------------------------------\n# testFormatTypes (check_storage_format.TestStorage)\n#\n> Using older 'udisks2' implementation: 2.1.8\nnot ok 26 testFormatTypes (check_storage_format.TestStorage) duration: 78s\nTraceback (most recent call last):\n  File \"/build/cockpit/bots/../test/verify/check-storage-format\", line 74, in testFormatTypes\n    check_type(\"ext4\")\n  File \"/build/cockpit/bots/../test/verify/check-storage-format\", line 71, in check_type\n    self.content_row_wait_in_col(1, 1, type + \" File System\")\n  File \"/build/cockpit/test/verify/storagelib.py\", line 89, in content_row_wait_in_col\n    self.retry(None, lambda: self.browser.is_present(col) and val in self.browser.text(col), None)\n  File \"/build/cockpit/test/verify/storagelib.py\", line 65, in retry\n    b.wait_checkpoint()\n  File \"/build/cockpit/test/common/testlib.py\", line 291, in wait_checkpoint\n    return self.phantom.wait_checkpoint()\n  File \"/build/cockpit/test/common/testlib.py\", line 821, in <lambda>\n    return lambda *args: self._invoke(name, *args)\n  File \"/build/cockpit/test/common/testlib.py\", line 847, in _invoke\n    raise Error(res['error'])\nError: timeout happened\nWrote TestStorage-testFormatTypes-debian-testing-127.0.0.2-2801-FAIL.png\nWrote TestStorage-testFormatTypes-debian-testing-127.0.0.2-2801-FAIL.html\nWrote TestStorage-testFormatTypes-debian-testing-127.0.0.2-2801-FAIL.js.log\nJournal extracted to TestStorage-testFormatTypes-debian-testing-127.0.0.2-2801-FAIL.log\n",
        "test":"testFormatTypes (check_storage_format.TestStorage)",
        "context":"verify/debian-testing",
        "date":"2017-07-19T11:56:01Z",
        "merged":true,
        "revision":"b32635869b9e87cdd9e42b6e6123150d500f6862"
    }

## Training this model with data from S3 storage via an Argo workflow

* Edit the tools/flakes-training-sample.yaml template so that the values marked with < and > match your environment.
The modified values will point to your input data location (on S3 storage), your output data location (S3) as well as the credentials for your S3 storage.
* Note the accessKeySecret and secretKeySecret values point to a secret that you must have defined.  The values in that secret will be the **base64 encoded** values of your S3 accessKey and secretKey
You can edit the tools/secret-sample.yaml to include your **base64 encoded** values and then run `oc create -f tools/secret-sample.yaml` to create the secrets.
* Launch the argo workflow via the argo cli:  `argo submit --watch ./tools/flakes-training-sample.yaml`