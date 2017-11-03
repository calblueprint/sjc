/**
* @prop userId - id of currently logged in user
*/

class NotificationsDropdown extends React.Component {
	constructor() {
		super();
		this.state = {
			notifications: [],
		};
	}

	componentDidMount() {
		Requester.get(`/api/users/${this.props.userId}/notifications`)
		.then((notifications) => {
			this.setState({ notifications });
		});
	}
  render() {
  	const { Glyphicon, DropdownButton } = ReactBootstrap;
  	const notifications = this.state.notifications.map((notification, index) => {
  		return (<div key={index}> {notification.created_at} </div>);
  	});
  	const notificationGlyph = <Glyphicon glyph="exclamation-sign" />

  	return (
  		<DropdownButton title={notificationGlyph} id="notification_dropdown" noCaret>
  			{notifications}
  		</DropdownButton>
  	);
  }
}
