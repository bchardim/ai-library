import os
import sys
import json
import argparse
from scipy.stats.stats import pearsonr


class correlation(object):

    def __init__(self):
        self.model = 'None'

    def predict(self,data,features_names):
      
      result = "PASS"
      params = dict((item.strip()).split("=") for item in data.split(":"))
      eparams = ["x", "y"]
      if not all (x in params for x in eparams):
        print("Not all parameters have been defined")
        result = "FAIL"
        return result
      x = json.loads(params['x'])
      y = json.loads(params['y'])
      corr = pearsonr(x,y)
      strength = '';
      sign = '';
      sig=' '
      conclusion = '';
      r=abs(corr[0])
      if r >0.1 and r < 0.3:
          strength = 'small correlation'
      elif r >0.3 and r < 0.5:
          strength = 'medium/moderate correation'
      elif r >0.5:
          strength = 'large/strong correlation'
      else:
          strength = 'no correlation'
      if corr[0] > 0:
          sign = 'positive'
      else:
          sign = 'negative'

      if corr[1] < 0.05:
          sig = 'statistically significant'
      else:
          sig = 'statistically insignificant'

      if strength == 'no correlation':
          conclusion = 'Two datasets have no correlation'
      else:
          conclusion='Two datasets have '+ sign + ' '+ strength +' and this result is ' + sig +'.'
      result = '1. The correlation coefficient is: ' + str(corr[0]) + ', 2. P value is: ' + str(corr[1]) + ', 3. Conclusion: ' + conclusion
      print(result)
      return result

def main():
  parser = argparse.ArgumentParser()
  parser.add_argument('-data', help='prediction data set', default='')
  args = parser.parse_args()
  data = args.data
  obj = correlation()
  obj.predict(data,20)

if __name__== "__main__":
  main()

