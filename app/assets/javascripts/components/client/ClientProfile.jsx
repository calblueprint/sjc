
class ClientProfile extends React.Component {

  constructor(props) {
    super();
    this.state = {
      client: {},
    }
  }

  componentDidMount() {
    Requester.get('/api/clients/' + this.props.client.id).then((data) => {
      this.setState({client: data});
    });
  }

  render() {
    const { client } = this.state;

    return (
      <div className="clients-page">
        <ClientPageHeader client={this.props.client} page={"profile"} />

        <div className="container">
          <div className="card-bg">
            <h3>Personal Details</h3>
            <h4>Name</h4>
            {client.first_name} {client.last_name}
            
            <h4>Education</h4>
            {client.education}

            <h4>Income</h4>
            {client.clientIncome}

            <h4>Family Income</h4>
            {client.familyIncome}

            <h4>Help</h4>
            {client.help}

            <h4>Flee Country</h4>
            {client.fleeCountry}

            <h4>Citizen Spouse</h4>
            {client.citizenSpouse}

            <h4>Citizen Child</h4>
            {client.citizenChild}

            <h4>Victim Crime</h4>
            {client.victimCrime}

            <h4>Living With Parents</h4>
            {client.livingWParents}

            <h4>Initial Intake</h4>
            {client.initialIntake}

            <h3>Contact Information</h3>
            <h4>Phone Number</h4>
            {client.phone_number}
            <h4>Country</h4>
            {client.country}
            <h4>State</h4>
            {client.state}
            <h4>Postal Code</h4>
            {client.postal_code}
            <h4>City</h4>
            {client.city}
            <h4>Street</h4>
            {client.street}

            <h3>Immigration History</h3>

            <h4>Court Date</h4>
            {client.education}

            <h4>Stage</h4>
            {client.stage}

            <a href={`edit`}>
              <button className="button">
              Edit Profile
              </button>
            </a>
          </div>
        </div>
      </div>
    );
  }

}
