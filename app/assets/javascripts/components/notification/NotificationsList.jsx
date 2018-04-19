/**
* @prop userId - id of currently logged in user
*/

class NotificationsList extends React.Component {
  constructor() {
    super();
    this.state = {
      readNotifications: [],
      unreadNotifications: []
    };
  }

  componentDidMount = () => {
    this.fetchNotifications();
  }

  fetchNotifications = () => {
    Requester.get(`/api/users/${this.props.userId}/readnotifications`).then((notifications) => {
      this.setState({
        readNotifications: notifications
      });
    });
    Requester.get(`/api/users/${this.props.userId}/unreadnotifications`).then((notifications) => {
      this.setState({
        unreadNotifications: notifications
      });
    });
  }

  markAllNotificationRead = () => {
    const notificationIds = this.state.unreadNotifications.map((notification, index) => {
      return notification.id;
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
    switch (notificationType) {
      case 0:
        return {
          notificationText: <span>{showValue(notifiedByUser.first_name)} assigned you a task:
                            <span className="notification-main-text">{showValue(notifiable.title)}</span></span>,
          notificationHref: `/clients/${notifiable.client_id}`,
        };
      case 1:
        return {
          notificationText: <span>{showValue(notifiedByUser.first_name)} unassigned you from a task:
                            <span className="notification-main-text">{showValue(notifiable.title)}</span></span>,
          notificationHref: `/clients/${notifiable.client_id}`,
        };
      case 2:
        return {
          notificationText: <span>{showValue(notifiedByUser.first_name)} replied to your comment:
                            <span className="notification-main-text">{showValue(notifiable.content)}</span></span>,
          notificationHref: `/clients/${notifiable.client_id}`,
        };
      case 3:
        if (notifiable) {
          return {
            notificationText: <span>{showValue(notifiedByUser.first_name)} mentioned you in a comment
                              <span className="notification-main-text">{showValue(notifiable.description)}</span></span>,
            notificationHref: `/clients/${notifiable.client_id}`,
          };
        }
      default:
        return {
          text: "Something went wrong."
        }
    }
  }

  renderNotifications(notifications, read) {
    const _className = read? "notification-read" : "notification-unread";
    if (notifications.length == 0) {
      return (
        <div><span className="fa fa-exclamation-circle marginRight-xxs"></span>No Notifications</div>
      );
    }

    return notifications.map((notification, index) => {
      let markAsRead = (
        <a onClick={() => this.markNotificationRead(notification.id)}
          className="mark-as-read">
          mark as read
        </a>
      );
      const { notificationText, notificationHref } = this.getNotificationText(notification);

      return (
        <div className={`notification ${_className}`} key={index} >
          <a href={notificationHref} className="notif-text">
            {showValue(notificationText)}
          </a>
          { read
            ? null
            : markAsRead
          }
        </div>
      );
    });
  }

  render = () => {
    return (
      <div>
        <div className="page-bar">
          <div className="container">
            <div className="page-bar-title">Notifications</div>
            <div className="page-bar-right">
              <button className="button"
                onClick={this.markAllNotificationRead}>Mark all as read</button>
            </div>
          </div>
        </div>
        <div className="container notifications-container card-bg">
          <h1>Unread Notifications</h1>
          {this.renderNotifications(this.state.unreadNotifications, false)}
          <br />
          <h1>Read Notifications</h1>
          {this.renderNotifications(this.state.readNotifications, true)}
        </div>
      </div>
    );
  }
}
