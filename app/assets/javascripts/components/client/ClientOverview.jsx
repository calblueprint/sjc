
class ClientOverview extends React.Component {

  constructor(props) {
    super();
    this.state = {
      users: [],
      tasks: [],
      usersMap: {}
    }
  }

  componentDidMount() {
    Requester.get('/api/tasks/show?client_id=' + this.props.client.id).then((data) => {
      this.setState({tasks: data});
    });

    Requester.get('/api/users/').then((data) => {
      this.setState({users: data});
      let userIdToName = {};
      data.forEach((user) => {
        userIdToName[user.id] = user.first_name + " " + user.last_name;
      });
      this.setState({usersMap:userIdToName});
    });
  }

  render() {
    const { client, comments, currentUser } = this.props;
    const fullAddress = `${client.street}, ${client.city}, ${client.state}, ${client.postal_code}`;
    const taskArray = this.state.tasks.map(
      (task) => {
        return (
          <li key={task.id}>
            <p>{task.description}</p>
            <AssignUser taskId={task.id} users={this.state.users} usersMap={this.state.usersMap} />
          </li>
        );
      }
    );

    return (
      <div className="clients-page">
        <ClientPageHeader client={client} page={"cases"} />

        <div className="container">
          <div className="clients-page-main-container card-bg">
            <small>
              <div> Case ID: {client.case_id} </div>
              <div> Phone Number: {client.phone_number} </div>
              <div> Country: {client.country} </div>
              <div> Address: {fullAddress} </div>
            </small>
            <a href={`/cases/new?client_id=${client.id}`}>
              <button className="button">Create Case</button>
            </a>
            <ul>
              {taskArray}
            </ul>
            <CreateTask clientId={this.props.client.id} />
          </div>

          <ClientComments threads={comments} client={client} user={currentUser} />
        </div>
      </div>
    );
  }

}
