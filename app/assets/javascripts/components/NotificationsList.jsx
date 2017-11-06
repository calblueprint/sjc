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

	getNotificationText = (notification) => {
		const notificationType = notification.notification_type;
		const notifiedByUser = notification.notified_by;
		const createdAtTime = notification.created_at;
		const { read, notifiable } = notification;
		switch (notificationType) {
			case 0:
				return `${notifiedByUser.first_name} assigned you a task: ${notifiable.description}`;
			case 1:
				return `${notifiedByUser.first_name} unassigned you from a task: ${notifiable.description}`;
			case 2:
				return `${notifiedByUser.first_name} replied to your comment: ${notifiable.content}`;
			case 3:
				return `${notifiedByUser.first_name} mentioned you in a comment: ${notifiable.description}`
			default:
				return "Something went wrong.";
		}
	}

  render = () => {
  	const { ListGroup, ListGroupItem } = ReactBootstrap;
  	const notifications = this.state.notifications.map((notification, index) => {
  		return (<ListGroupItem key={index}> {this.getNotificationText(notification)} </ListGroupItem>);
  	});

  	return (
  		<ListGroup>
  			{notifications}
  		</ListGroup>
  	);
  }
}
