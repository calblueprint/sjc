class Dashboard extends React.Component {
  render() {
    const { Tab, Row, Col, Nav, NavItem } = ReactBootstrap;
    const { user } = this.props;
    const fullName = `${user.first_name} ${user.last_name}`
    return (
      <div>
        <div className="page-bar">
          <div className="container">
            <h2 className="page-bar-title">My Dashboard</h2>
            <div className="page-bar-left">
              <TaskCreationForm />
            </div>
          </div>
        </div>
        <div className="container">
          <div className="dashboard-content-header">
            Current Tasks
          </div>
          <TaskList userId={user.id} />
          <NotificationsList userId={user.id} />
        </div>
      </div>
    );
  }
}
