# Fraud Detection

Fraud Detection is used to identify fradulent transactions among credit card transactions. The model is based on RandomForest regressor and returns a 1 or 0 indicating whether a given transaction is fradulent or not.

## Contents

`detect_fraud.py` - RandomeForest regressor model to identify fraudulent transaction.
##### Parameters
* model - location of trained model.
* data - ":" separated value of a credit card transactions to run prediction on.

## Sample REST call

curl -v http://detectfraud-ai-library.10.16.208.2.nip.io/api/v0.1/predictions -d '{"strData":"model=fraud_detection/model.pkl, data=0.0:-1.3598071337:-0.0727811733:2.536346738:1.3781552243:-0.3383207699:0.4623877778:1491111.62"}' -H "Content-Type: application/json"

## Sample result

The following example shows what an individual prediction result looks like. The field 'ndarray' shows whether the given transaction is fraudulent or not (1.0 or 0.0).

     {
        "meta": {
         "puid": "j9qa1jjb375qrfjbb55skrd2sq",
         "tags": {
         },
         "routing": {
         },
         "requestPath": {
           "c-detectfraud": "docker.io/panbalag/fraud_detection"
         },
         "metrics": []
       },
       "data": {
         "names": [],
         "ndarray": [0.0]
      }

