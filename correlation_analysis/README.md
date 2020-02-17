# Correlation Analysis

Correlation analysis is a statistical method used to measure the strength of relationship between two variables.

# Content

`correlation.py` - Perform correlation analysis on given dataset.
#### Parameters
* x - column1 data
* y - column2 data

# Sample Query

curl -v http://corr-ai-library.10.16.208.2.nip.io/api/v0.1/predictions -d '{"strData":"x=[1,2,3,4,5,6,7,8,9,10]:y=[2,4,6,6,8,8,4,19,20,20]"}' -H "Content-Type: application/json"
