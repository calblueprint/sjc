
class EditClient extends React.Component {

  constructor(props) {
        super();
        this._update = this._update.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this.state = {
            client: {},
            showForm: true,
            message: '',
            error: ''
        };
    }

  componentDidMount() {
    Requester.get('/api/clients/' + this.props.client.id).then((data) => {
      this.setState({client: data});
    });
  }

  _update = (name, val) => {
    const client = this.state.client;
    client[name] = val;
    this.setState({
      client: client
    });
  }

  _safeTrim = (val) => {
      if (val != undefined) {
          return val.trim()
      }
      return val
  }

  _handleSubmit = (e) => {
      e.preventDefault();
      const payload = {
          client: this.state.client
      };

      Requester.update('/api/clients/' + this.state.client.id, payload).then((data) => {
          this.setState({
              "message": data.message,
              "error": data.error,
              "showForm": false
          });
      });

      window.location = '/clients/' + this.state.client.id + '/profile';

      return false;
  }

  render() {
    if (!this.state.showForm) {
      if (!this.state.error) {
        return (
            <div>
            <p>{this.state.message}</p>
            </div>
        )
      } else {
        return (
            <div>
            <p>{this.state.error}</p>
            </div>
        )
      }
    }
    const { client } = this.props;

    return (
      <div className="clients-page">
        <ClientPageHeader client={this.props.client} page={"edit"} />

        <div className="container">
          <div className="card-bg">
            <h3>Personal Details</h3>
            <Input
                type="text"
                title="First Name"
                placeholder="First Name"
                name="first_name"
                initData={client.first_name}
                update={this._update} />

            <Input
                type="text"
                title="Last Name"
                placeholder="Last Name"
                name="last_name"
                initData={client.last_name}
                update={this._update} />
            
            <Input
                type="text"
                title="Education"
                placeholder="Education"
                name="education"
                initData={client.education}
                update={this._update} />

            <Input
                type="text"
                title="Income"
                placeholder="Income"
                name="clientIncome"
                initData={client.clientIncome}
                update={this._update} />

            <Input
                type="text"
                title="Family Income"
                placeholder="Family Income"
                name="familyIncome"
                initData={client.familyIncome}
                update={this._update} />

            <Input
                type="text"
                title="Help"
                placeholder="Help"
                name="help"
                initData={client.help}
                update={this._update} />

            <Input
                type="text"
                title="Flee Country"
                placeholder="Flee Country"
                name="fleeCountry"
                initData={client.fleeCountry}
                update={this._update} />

            <Input
                type="text"
                title="Citizen Spouse"
                placeholder="Citizen Spouse"
                name="citizenSpouse"
                initData={client.citizenSpouse}
                update={this._update} />

            <Input
                type="text"
                title="Citizen Child"
                placeholder="Citizen Child"
                name="citizenChild"
                initData={client.citizenChild}
                update={this._update} />

            <Input
                type="text"
                title="Victim Crime"
                placeholder="Victim Crime"
                name="victimCrime"
                initData={client.victimCrime}
                update={this._update} />

            <Input
                type="text"
                title="Living With Parents"
                placeholder="Living With Parents"
                name="livingWParents"
                initData={client.livingWParents}
                update={this._update} />

            <Input
                type="text"
                title="Initial Intake"
                placeholder="Initial Intake"
                name="initialIntake"
                initData={client.initialIntake}
                update={this._update} />

            <h3>Contact Information</h3>
            <Input
                type="text"
                title="Phone Number"
                placeholder="Phone Number"
                name="phone_number"
                initData={client.phone_number}
                update={this._update} />

            <Input
                type="text"
                title="Country"
                placeholder="Country"
                name="country"
                initData={client.country}
                update={this._update} />

            <Input
                type="text"
                title="State"
                placeholder="State"
                name="state"
                initData={client.state}
                update={this._update} />

            <Input
                type="text"
                title="Postal Code"
                placeholder="Postal Code"
                name="postal_code"
                initData={client.postal_code}
                update={this._update} />

            <Input
                type="text"
                title="City"
                placeholder="City"
                name="city"
                initData={client.city}
                update={this._update} />

            <Input
                type="text"
                title="Street"
                placeholder="Street"
                name="street"
                initData={client.street}
                update={this._update} />

            <h3>Immigration History</h3>

            <Input
                type="text"
                title="Court Date"
                placeholder="Court Date"
                name="courtDate"
                initData={client.courtDate}
                update={this._update} />

            <Input
                type="text"
                title="Stage"
                placeholder="Stage"
                name="stage"
                initData={client.stage}
                update={this._update} />

            <button
              className="button"
              onClick={this._handleSubmit}>
            Save Profile
            </button>
            <a href={`profile`}>
              <button className="button button--sm button--outline button--text-black button--black">
              Cancel
              </button>
            </a>
          </div>
        </div>
      </div>
    );
  }

}
