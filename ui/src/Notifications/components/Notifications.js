import React  from "react";
import { connect } from "react-redux";

import {
  TimedToastNotification,
  ToastNotificationList
} from "patternfly-react";

import { deleteNotification } from "../actions";
import "./Notifications.scss";


function Notifications({notifications, deleteNotification}) {
  const onDismiss = (notification) => {
    deleteNotification(notification);
  };

  return (
    <ToastNotificationList className="notifications">
      {notifications.map(notification => (
        <TimedToastNotification
          key={notification.key}
          type={notification.type}
          persistent={notification.persistent}
          timerdelay={notification.timerdelay}
          onDismiss={() => onDismiss(notification)}
        >
              <span>
                <strong>{notification.header}</strong> &nbsp;
                {notification.message}
              </span>
        </TimedToastNotification>
      ))}
    </ToastNotificationList>
  );
}

function mapStateToProps(state) {
  return state.notificationsReducer;
}

function mapDispatchToProps(dispatch) {
  return {
    deleteNotification: (notification) => {
      dispatch(deleteNotification(notification));
    }
  };
}


export default connect(mapStateToProps, mapDispatchToProps)(Notifications);
