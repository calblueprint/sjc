
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
      this.setState({
        tasks: data,
      });
    });

    Requester.get('/api/users/').then((data) => {
      this.setState({
        users: data,
      });
      let userIdToName = {};
      data.forEach((user) => {
        userIdToName[user.id] = user.first_name + " " + user.last_name;
      });
      this.setState({
        usersMap: userIdToName,
      });
    });
  }

  render() {
    const { client, comments, currentUser } = this.props;
    const fullAddress = `${client.street}, ${client.city}, ${client.state}, ${client.postal_code}`;

    return (
      <div className="clients-page">
        <ClientPageHeader client={client} page={"cases"} />

        <div className="container">
          <div className="clients-page-main-container clients-pages-cases-container">
            <div className="client-cases-header">
              <h2 className="title">Cases</h2>
              <a href={`/cases/new?client_id=${client.id}`} className="button">
                Create Case
              </a>
            </div>
            <ClientCaseList client={client} />
          </div>

          <ClientComments threads={comments} client={client} user={currentUser} />
        </div>
      </div>
    );
  }

}
