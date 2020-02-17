import joblib


class modelrunner(object):
    def __init__(self):
        self.class_names = ["class:{}".format(str(i)) for i in range(10)]
        self.clf = joblib.load('./model.pkl')

    def predict(self, X, feature_names):
        predictions = self.clf.predict(X)
        return predictions
