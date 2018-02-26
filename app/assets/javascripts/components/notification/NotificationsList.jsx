/**
* @prop userId - id of currently logged in user
*/

class NotificationsList extends React.Component {
  constructor() {
    super();
    this.state = {
      notifications: [],
    };
  }

  componentDidMount = () => {
    this.fetchNotifications();
  }

  fetchNotifications = () => {
    compare = (a, b) => {
      if (a.read && !b.read) { return 1; }
      else if (!a.read && b.read) { return -1; }
      else { return 0; }
    }

    Requester.get(`/api/users/${this.props.userId}/notifications`)
    .then((notifications) => {
      notifications.sort(compare);
      this.setState({ notifications });
    });
  }

  onNotificationRead = () => {
    const notificationIds = this.state.notifications.reduce((unread, notification) => {
      if (!notification.read) {
        unread.push(notification.id);
      }
      return unread;
    }, []);
    if (notificationIds.length) {
      const params = {
        notification_ids: notificationIds,
      };
      Requester.update(`/api/users/${this.props.userId}/notifications/read`, params)
      .then(() => {
        console.log('Notifications read');
        this.fetchNotifications();
      });
    }
  }

  markNotificationRead = (notifId) => {
    Requester.update(`/api/users/${this.props.userId}/notifications/${notifId}/read`)
      .then(() => {
        this.fetchNotifications();
    })
  }

  // Returns an object with the text describing the notification as well
  // as the location to link to that is most relevant to this notification.
  getNotificationText = (notification) => {
    const notificationType = notification.notification_type;
    const notifiedByUser = notification.notified_by;
    const createdAtTime = notification.created_at;
    const { read, notifiable } = notification;
    console.log(notifiable)
    switch (notificationType) {
      case 0:
        return {
          notificationText: <span>{notifiedByUser.first_name} assigned you a task:
                            <span className="notification-main-text">{notifiable.title}</span></span>,
          notificationHref: `/clients/${notifiable.client_id}`,
        };
      case 1:
        return {
          notificationText: <span>{notifiedByUser.first_name} unassigned you from a task:
                            <span className="notification-main-text">{notifiable.title}</span></span>,
          notificationHref: `/clients/${notifiable.client_id}`,
        };
      case 2:
        return {
          notificationText: <span>{notifiedByUser.first_name} replied to your comment:
                            <span className="notification-main-text">{notifiable.content}</span></span>,
          notificationHref: `/clients/${notifiable.client_id}`,
        };
      case 3:
        return {
          notificationText: <span>{notifiedByUser.first_name} mentioned you in a comment:
                            <span className="notification-main-text">{notifiable.title}</span></span>,
          notificationHref: `/clients/${notifiable.client_id}`,
        };
      default:
        return {
          text: "Something went wrong."
        }
    }
  }

  render = () => {
    const notifications = this.state.notifications.map((notification, index) => {
      const { notificationText, notificationHref } = this.getNotificationText(notification)
      const _className = notification.read ? "notification-read" : "notification-unread";

      let markAsRead;
      if (!notification.read) {
        markAsRead = (
          <a onClick={() => this.markNotificationRead(notification.id)}
            className="mark-as-read">
            mark as read
          </a>
        )
      }
      return (
        <div className={`notification ${_className}`} key={index} >
          <a href={notificationHref} className="notif-text">
            {notificationText}
          </a>
          {markAsRead}
        </div>
      );
    });

    return (
      <div>
        <div className="page-bar">
          <div className="container">
            <div className="page-bar-title">Notifications</div>
            <div className="page-bar-left">
              <button className="button"
                onClick={this.onNotificationRead}>Mark all as read</button>
            </div>
          </div>
        </div>
        <div className="container notifications-container card-bg">
          {notifications}
        </div>
      </div>
    );
  }
}
