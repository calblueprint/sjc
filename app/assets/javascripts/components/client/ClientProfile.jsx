
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

    let _true_text = "True";
    let _false_text = "False";

    let _flee_country = null;
    if (client.flee_country) {
      _flee_country = _true_text;
    } else {
      _flee_country = _false_text;
    }

    let _citizen_spouse = null;
    if (client.citizen_spouse) {
      _citizen_spouse = _true_text;
    } else {
      _citizen_spouse = _false_text;
    }

    let _citizen_child = null;
    if (client.citizen_child) {
      _citizen_child = _true_text;
    } else {
      _citizen_child = _false_text;
    }

    let _living_w_parents = null;
    if (client.living_w_parents) {
      _living_w_parents = _true_text;
    } else {
      _living_w_parents = _false_text;
    }

    _stage = "Case Opening";
    switch(client.stage) {
      case 1:
        _stage = "Case Opening";
        break;
      case 2:
        _stage = "Case Starting";
        break;
      case 3:
        _stage = "Middle Phase";
        break;
      case 4:
        _stage = "Litigation";
        break;
      case 5:
        _stage = "Post-Litigation";
        break;
      case 6:
        _stage = "Case Closing";
        break;
    }

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
            {client.client_income}

            <h4>Family Income</h4>
            {client.family_income}

            <h4>Help</h4>
            {client.help}

            <h4>Flee Country</h4>
            {_flee_country}

            <h4>Citizen Spouse</h4>
            {_citizen_spouse}

            <h4>Citizen Child</h4>
            {_citizen_child}

            <h4>Victim Crime</h4>
            {client.victim_crime}

            <h4>Living With Parents</h4>
            {_living_w_parents}

            <h4>Initial Intake</h4>
            {client.initial_intake}

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
            {client.court_date ? client.court_date.slice(0, 10) : 'N/A'}

            <h4>Stage</h4>
            {_stage}
            <br />

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
