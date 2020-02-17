# Linear Regression Predictor

Linear regression Predictor is used to predict a dependent variable given the independent variables (multivariate regression).

## Contents

`regr_classifier_predict.py` - Predictor function for linear regression model

##### Parameters
* model - location of trained model
* data - prediction data

## Sample REST call

### Health Predictor Model

curl -v http://regrclassifier-ai-library.10.16.208.2.nip.io/api/v0.1/predictions -d '{"strData":"model=healthpredictor/model.pkl, data=69:150"}' -H "Content-Type: application/json"

### Risk Analysis Model

curl -v http://regrclassifier-ai-library.10.16.208.2.nip.io/api/v0.1/predictions -d '{"strData":"model=mlflow/regression.pkl, data=0:0:0:0:0:0:0:0:0:0:0:0:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:0:1:0:0:0:0:0:0:0:0:0:0:0:0:0:0:1:0:0:0:0:0"}' -H "Content-Type: application/json"
