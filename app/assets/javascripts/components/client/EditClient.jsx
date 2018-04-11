
class EditClient extends React.Component {

  constructor(props) {
    super();
    this._update = this._update.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.state = {
      client: {},
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

  _handleChange = (e) => {
  const client = this.state.client;
  client[$(e.target).attr("name")] = $(e.target).val();
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
      });
    });

    window.location = '/clients/' + this.state.client.id + '/profile';

    return false;
  }

  render() {
    const { client, comments, currentUser } = this.props;

    return (
      <div className="clients-page">
        <ClientPageHeader client={this.props.client} page={"edit"} />

        <div className="container">
          <div className="clients-page-main-container client-profile card-bg">
            <div className="marginTop-md profile-edit-header">
              <h2 className="title">Editing Profile</h2>
              <div className="button-container">
                <a className="button marginRight-xxs"
                  onClick={this._handleSubmit}>
                  Save Changes
                </a>
                <a href={`profile`} className="button button--text-alert">
                  Cancel
                </a>
              </div>
            </div>
            <div className="profile-section">
              <h3 className="title">Personal Details</h3>
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
                type="number"
                min="0"
                title="Income"
                placeholder="Income"
                name="client_income"
                initData={client.client_income}
                update={this._update} />

              <Input
                type="number"
                min="0"
                title="Family Income"
                placeholder="Family Income"
                name="family_income"
                initData={client.family_income}
                update={this._update} />

              <Input
                type="text"
                title="Help"
                placeholder="Help"
                name="help"
                initData={client.help}
                update={this._update} />

              <Input
                type="checkbox"
                title="Flee Country"
                placeholder="Flee Country"
                name="flee_country"
                initData={client.flee_country}
                update={this._update} />

              <Input
                type="checkbox"
                title="Citizen Spouse"
                placeholder="Citizen Spouse"
                name="citizen_spouse"
                initData={client.citizen_spouse}
                update={this._update} />

              <Input
                type="checkbox"
                title="Citizen Child"
                placeholder="Citizen Child"
                name="citizen_child"
                initData={client.citizen_child}
                update={this._update} />

              <Input
                type="text"
                title="Victim Crime"
                placeholder="Victim Crime"
                name="victim_crime"
                initData={client.victim_crime}
                update={this._update} />

              <Input
                type="checkbox"
                title="Living With Parents"
                placeholder="Living With Parents"
                name="living_w_parents"
                initData={client.living_w_parents}
                update={this._update} />

              <Input
                type="text"
                title="Initial Intake"
                placeholder="Initial Intake"
                name="initial_intake"
                initData={client.initial_intake}
                update={this._update} />
            </div>

            <div className="profile-section">
              <h3 className="title">Contact Information</h3>
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
            </div>

            <h3 className="title">Immigration History</h3>

            <Input
              type="date"
              title="Court Date"
              placeholder="Court Date"
              name="court_date"
              initData={client.court_date ? client.court_date.slice(0, 10) : null}
              update={this._update} />

            <div className="input-container">
              <label className="label--newline">Stage</label>
              <select
                  className="select"
                  name="stage"
                  onChange={this._handleChange}
                  defaultValue={client.stage} >
                  <option value="1">Case Opening</option>
                  <option value="2">Case Starting</option>
                  <option value="3">Middle Phase</option>
                  <option value="4">Litigation</option>
                  <option value="5">Post-Litigation</option>
                  <option value="6">Case Closing</option>
              </select>
            </div>
          </div>
          <ClientComments threads={comments} client={client} user={currentUser} />
        </div>
      </div>
    );
  }

}
