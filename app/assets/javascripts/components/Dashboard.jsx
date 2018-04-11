class Dashboard extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    return (
      <div className="dashboard-page">
        <div className="page-bar">
          <div className="container">
            <h2 className="page-bar-title">My Dashboard</h2>
          </div>
        </div>
        <Tasks user={this.props.user}
               activeTasks={`/api/users/${this.props.user.id}/activetasks`}
               completedTasks={`/api/users/${this.props.user.id}/completedtasks`}
               updateRoute={`api/users/${this.props.user.id}/updatetasks`}
               creationRoute={`api/users/${this.props.user.id}/createtask`}
        />
      </div>
    );
  }
}
