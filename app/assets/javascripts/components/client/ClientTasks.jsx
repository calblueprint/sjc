class ClientTasks extends React.Component {

  constructor(props) {
    super();
    this.state = {
      client: {},
      dataLoaded: false,
    }
  }

  componentDidMount() {
    Requester.get('/api/clients/' + this.props.client.id).then((data) => {
      this.setState({
        client: data,
        dataLoaded: true,
      });
    });
  }

  formatText = (data) => {
    return data || "No Information";
  }

  render() {
    const { comments, currentUser } = this.props;
    const { client, dataLoaded } = this.state;

    if (!dataLoaded) {
      pageContent = <div className="clients-page-main-container card-bg">Loading...</div>
    } else {
      pageContent = (
        <Tasks user={this.props.currentUser.id}
               activeTasks={`/api/users/${this.props.currentUser.id}/activetasks`}
               completedTasks={`/api/users/${this.props.currentUser.id}/completedtasks`}
        />
      )
    }

    return (

      <div className="clients-page">
        <ClientPageHeader client={client} page={"cases"} />

        <div className="container">
          <div className="clients-page-main-container clients-pages-cases-container">
            <div className="client-cases-header">
              <h2 className="title">Tasks</h2>
            </div>
            {pageContent}
          </div>

          <ClientComments threads={comments} client={client} user={currentUser} />
        </div>
      </div>

    );
  }

}
