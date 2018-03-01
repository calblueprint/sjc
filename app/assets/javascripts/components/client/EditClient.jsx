
class EditClient extends React.Component {

  constructor(props) {
    super();
    this.state = {
      users: [],
    }
  }

  componentDidMount() {

    Requester.get('/api/users/').then((data) => {
      this.setState({users: data});
    });
  }

  render() {
    const { client } = this.props;

    return (
      <div className="clients-page">
        <ClientPageHeader client={this.props.client} page={"edit"} />

        <div className="container">
          <div className="card-bg">
            Edit profile here
          </div>
        </div>
      </div>
    );
  }

}
