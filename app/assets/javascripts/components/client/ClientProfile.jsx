
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

  formatText = (data) => {
    return data || "No Information";
  }

  render() {
    const { comments, currentUser } = this.props;
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
          <div className="clients-page-main-container client-profile card-bg">
            <div className="profile-section">
              <h2 className="title">Personal Details</h2>
              <h3>Name</h3>
              {this.formatText(`${client.first_name} ${client.last_name}`)}

              <h3>Education</h3>
              {this.formatText(client.education)}

              <h3>Income</h3>
              {this.formatText(client.client_income)}

              <h3>Family Income</h3>
              {this.formatText(client.family_income)}

              <h3>Help</h3>
              {this.formatText(client.help)}

              <h3>Flee Country</h3>
              {_flee_country}

              <h3>Citizen Spouse</h3>
              {_citizen_spouse}

              <h3>Citizen Child</h3>
              {_citizen_child}

              <h3>Victim Crime</h3>
              {this.formatText(client.victim_crime)}

              <h3>Living With Parents</h3>
              {_living_w_parents}

              <h3>Initial Intake</h3>
              {this.formatText(client.initial_intake)}
            </div>

            <div className="profile-section">
              <h2 className="title">Contact Information</h2>

              <h3>Phone Number</h3>
              {this.formatText(client.phone_number)}

              <h3>Country</h3>
              {this.formatText(client.country)}

              <h3>State</h3>
              {this.formatText(client.state)}

              <h3>Postal Code</h3>
              {this.formatText(client.postal_code)}

              <h3>City</h3>
              {this.formatText(client.city)}

              <h3>Street</h3>
              {this.formatText(client.street)}
            </div>

            <h2 className="title">Immigration History</h2>

            <h3>Court Date</h3>
            {client.court_date ? client.court_date.slice(0, 10) : 'N/A'}

            <h3>Stage</h3>
            {_stage}
          </div>
          <ClientComments threads={comments} client={client} user={currentUser} />
        </div>
      </div>
    );
  }

}
