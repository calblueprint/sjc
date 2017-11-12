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
		Requester.get(`/api/users/${this.props.userId}/notifications`)
		.then((notifications) => {
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
			});
		}
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
					notificationText: `${notifiedByUser.first_name} assigned you a task: ${notifiable.description}`,
					notificationHref: `/clients/${notifiable.client_id}`,
				};
			case 1:
				return {
					notificationText: `${notifiedByUser.first_name} unassigned you from a task: ${notifiable.description}`,
					notificationHref: `/clients/${notifiable.client_id}`,
				};
			case 2:
				return {
					notificationText: `${notifiedByUser.first_name} replied to your comment: ${notifiable.content}`,
					notificationHref: `/clients/${notifiable.client_id}`,
				};
			case 3:
				return {
					notificationText: `${notifiedByUser.first_name} mentioned you in a comment: ${notifiable.description}`,
					notificationHref: `/clients/${notifiable.client_id}`,
				};
			default:
				return {
					text: "Something went wrong."
				}
		}
	}

  render = () => {
  	const { ListGroup, ListGroupItem } = ReactBootstrap;
  	const notifications = this.state.notifications.map((notification, index) => {
  		const { notificationText, notificationHref } = this.getNotificationText(notification)
  		const _className = notification.read ? "notification-read" : "notification-unread";
  		return (
  			<ListGroupItem href={notificationHref} key={index} bsClass={`${_className} list-group-item`}>
  				{notificationText}
  			</ListGroupItem>
  		);
  	});

  	return (
  		<ListGroup>
  			{notifications}
  		</ListGroup>
  	);
  }
}
