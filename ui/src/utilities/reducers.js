import { combineReducers } from "redux";
import { notificationsReducer} from "../Notifications/reducers";
import { regressionReducer } from "../Regression/reducers";
import { flakeReducer } from "../Flake/reducers";

const rootReducer = combineReducers({
  notificationsReducer,
  regressionReducer,
  flakeReducer
});

export default rootReducer;
