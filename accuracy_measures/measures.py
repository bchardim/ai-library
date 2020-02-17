from math import sqrt
import statistics

def predictive_accuracy(y_true, y_pred, metric):
    try:
        # Calculate the absolute error between observed values
        # and predicted values
        abs_error = [abs(m - n) for m,n in zip(y_true, y_pred)]
        val = 0
        if metric == "MAE":
          val = mean_absolute_error(abs_error)
        elif metric == "MdAE":
          val = median_absolute_error(abs_error)
        elif metric == "MSE":
          val = mean_square_error(abs_error)
        elif metric == "MdSE":
          val = median_square_error(abs_error)
        elif metric == "RMSE":
          val = root_mean_square_error(y_true, y_pred, abs_error)
        elif metric == "RMdSE":
          val = root_median_square_error(y_true, y_pred, abs_error)
        elif metric == "MAPE":
          val = mean_absolute_percentage_error(y_true, y_pred)
        elif metric == "MdPE":
          val = median_absolute_percentage_error(y_true, y_pred)
        elif metric == "SMAPE":
          val = symmetric_mean_absolute_percentage_error(y_true, y_pred)
        elif metric == "SMdAPE":
          val = symmetric_median_absolute_percentage_error(y_true, y_pred)
    except Exception as ex:
        raise Exception('Error while computing ' + metric + ': ' + str(ex))
    return val

def mean_absolute_error(abs_error):
    try:
        return statistics.mean(abs_error)
    except Exception as ex:
        raise Exception('Error while computing mean absolute error (MAE):' + str(ex))

def median_absolute_error(abs_error):
    try:
        return statistics.median(abs_error)
    except Exception as ex:
        raise Exception('Error while computing median absolute error (MdAE):' + str(ex))

def mean_square_error(abs_error):
    try:
        square_error = map(lambda x: x ** 2, abs_error)
        return statistics.mean(square_error)
    except Exception as ex:
        raise Exception('Error while computing mean square error (MSE):' + str(ex))

def median_square_error(abs_error):
    try:
        square_error = map(lambda x: x ** 2, abs_error)
        return statistics.median(square_error)
    except Exception as ex:
        raise Exception('Error while computing median square error (MdSE):' + str(ex))

def root_mean_square_error(y_true, y_pred, abs_error):
    try:
        mse = mean_square_error(abs_error)
        return sqrt(mse)
    except Exception as ex:
        raise Exception('Error while computing root mean square error (RMSE):' + str(ex))

def root_median_square_error(y_true, y_pred,abs_error):
    try:
        mdse = median_square_error(abs_error)
        return sqrt(mdse)
    except Exception as ex:
        raise Exception('Error while computing root median square error (RMdSE) ' + str(ex))

def mean_absolute_percentage_error(y_true, y_pred):
    try:
        abs_percentage_error = [abs((m - n)/m) for m,n in zip(y_true, y_pred)]
        return statistics.mean(abs_percentage_error)
    except Exception as ex:
        raise Exception('Error while computing mean absolute percentage error (MAPE)' + str(ex))

def median_absolute_percentage_error(y_true, y_pred):
    try:
        abs_percentage_error = [abs((m - n)/m) for m,n in zip(y_true, y_pred)]
        return statistics.median(abs_percentage_error)
    except Exception as ex:
        raise Exception('Error while computing median absolute percentage error (MdAPE) ' + str(ex))

def symmetric_mean_absolute_percentage_error(y_true, y_pred):
    try:
        symmetric_percentage_error = [abs(m - n)/(abs(m) + abs(n)) for m,n in zip(y_true, y_pred)]
        return statistics.mean(symmetric_percentage_error)
    except Exception as ex:
        raise Exception('Error while computing symmetric mean absolute percentage error (SMAPE)' + str(ex))

def symmetric_median_absolute_percentage_error(y_true, y_pred):
    try:
        symmetric_percentage_error = [abs(m - n)/(abs(m) + abs(n)) for m,n in zip(y_true, y_pred)]
        return statistics.median(symmetric_percentage_error)
    except Exception as ex:
        raise Exception('Error while computing symmetric median absolute percentage error (SMdAPE) ' + str(ex))

