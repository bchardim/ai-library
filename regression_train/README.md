# Linear Regression

Linear regression is used to establish the relationship between a dependent variable and one (simple linear regression) or more independent variables (multivariate regression) using a best fit straight line.

## Contents

`regression.py` - Linear regression model.
##### Parameters
* trainingdata - location of training data set (csv of independent variables with last column being the dependent variable)
* outputmodel - location to store trained model

## Sample REST call

curl -v http://regression-ai-library.10.16.208.2.nip.io/api/v0.1/predictions -d '{"strData":"trainingdata=risk_analysis/training.csv, outputmodel=risk_analysis/regression.pkl"}' -H "Content-Type: application/json"

### Save Data

The following example shows what an individual training data looks like. 

    training.csv
       S0,S1,S2,S3,S4,S5,S6,S7,S8,S9,S10,Risk
       0,0,1,0,0,0,0,0,0,0,0.8
       0,0,1,0,0,0,1,1,0,0,0.5
       ..
       ..
