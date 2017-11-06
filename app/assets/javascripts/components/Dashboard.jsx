class Dashboard extends React.Component {
  render() {
  	const { Tab, Row, Col, Nav, NavItem } = ReactBootstrap;
  	const { user } = this.props;
  	const fullName = `${user.first_name} ${user.last_name}`
		return (
			<div>
				<DashboardHeader name={fullName} firstName={user.first_name} />
				<Tab.Container id="dashboard-nav" defaultActiveKey={1}>
					<Row className="clearfix">
						<Col sm={2} bsClass="nav-buttons col">
							<Nav stacked bsClass="nav dashboard-nav-tab" bsStyle="pills">
								<NavItem eventKey={1}>
									Tasks
								</NavItem>
								<NavItem eventKey={2}>
									Clients
								</NavItem>
								<NavItem eventKey={3}>
									Notifications
								</NavItem>
							</Nav>
						</Col>
						<Col sm={6} bsClass="dashboard-content col">
							<Tab.Content animation>
								<Tab.Pane eventKey={1}>
									<div className="dashboard-content-header">
										Current Tasks
									</div>
									<TaskList userId={user.id} />
								</Tab.Pane>
								<Tab.Pane eventKey={2}>
									<ClientList />
								</Tab.Pane>
								<Tab.Pane eventKey={3}>
									<NotificationsList userId={user.id} />
								</Tab.Pane>
							</Tab.Content>
						</Col>
					</Row>
				</Tab.Container>
			</div>
		);
  }
}
