
class ClientProfile extends React.Component {

  constructor(props) {
    super();
    this.state = {
      users: [],
    }
  }

  componentDidMount() {

    Requester.get('/api/users/show').then((data) => {
      this.setState({users: data});
    });
  }

  render() {
    const { client } = this.props;

    return (
      <div className="clients-page">
        <ClientPageHeader client={this.props.client} page={"profile"} />

        <div className="container">
          <div className="card-bg">
            profile page here
          </div>
        </div>
      </div>
    );
  }

}
