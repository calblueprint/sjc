class RegisterClient extends React.Component {

  constructor(props) {
    super();
    this.state = {
      success: null,
      successMsg: "",
      failureMsg: ""
    };
    this.select = this.select.bind(this);
    this.renderSelections = this.renderSelections.bind(this);
    this.InputGroup = this.InputGroup.bind(this);
    this.InputField = this.InputField.bind(this);
  }
  InputField({ id, label, help, ...props }) {
    const { Checkbox, Radio, FormGroup, ControlLabel, FormControl, Button, HelpBlock } = ReactBootstrap;
    return (
      <FormGroup controlId={id} onChange={this.select} className="input-container marginBot-md">
        <ControlLabel className="label label--newline">{label}</ControlLabel>
        {help && <HelpBlock>{help}</HelpBlock>}
        <FormControl {...props} className="input" />
      </FormGroup>
    );
  }

  renderSelections(selections) {
    const { Checkbox, Radio, FormGroup, ControlLabel, FormControl, Button, HelpBlock } = ReactBootstrap;
    return selections.map((selection, index) => {
      return (
        <Radio name={selection.name} value={selection.value} inline
               key={index} className="radio">
          {selection.choice}
        </Radio>
      );
    });
  }

  InputGroup({ id, label, help, inputs, ...props }) {
    const { Checkbox, Radio, FormGroup, ControlLabel, FormControl, Button, HelpBlock } = ReactBootstrap;
    return (
      <FormGroup controlId={id} onChange={this.select} className="input-container marginBot-md">
        <ControlLabel className="label label--newline">{label}</ControlLabel>
        {help && <HelpBlock>{help}</HelpBlock>}
        {this.renderSelections(inputs)}
      </FormGroup>
    );
  }

  createClient = (evt) => {
    evt.preventDefault()
    const payload = {
      first_name: this.state.firstName,
      last_name: this.state.lastName,
      education: this.state.education,
      client_income: this.state.clientIncome,
      family_income: this.state.familyIncome,
      help: this.state.help,
      court_date: this.state.courtDate,
      flee_country: this.state.fleeCountry,
      citizen_spouse: this.state.citizenSpouse,
      citizen_child: this.state.citizenChild,
      victim_crime: this.state.victimCrime,
      living_w_parents: this.state.livingWParents,
      initial_intake: this.state.initialIntake,
      phone_number: this.state.phone_number,
      country: this.state.country,
      state: this.state.state,
      postal_code: this.state.postal_code,
      city: this.state.city,
      street: this.state.street
    };
    Requester.post('/api/clients', payload).then((data) => {
      this.setState({success: 1});
      window.location.href = '/clients'
    }).catch((data) => {
      this.setState({success: 0});
    });

    return false;
  }

  select(event) {
    this.setState({[event.target.name]: event.target.value});
  }

  render() {

    const { Checkbox, Radio, FormGroup, ControlLabel, FormControl, Button } = ReactBootstrap;

    let successMessage = "";

    if (this.state.success != null) {
      if (this.state.success == 1) {
        successMessage = (
          <h2>Client created!</h2>
        );
      } else {
        successMessage = (
          <h2>Failed to create client!</h2>
        );
      }
    }

    return (
      <div className="register-client-page card-bg">
        <a href="/clients" className="link marginBot-xs">
          <span className="fa fa-angle-left marginRight-xxs"></span>
          back to All Clients
        </a>
        <h1 className="title">Register Client</h1>
        <form onSubmit={this.createClient}>
          <div className="input-row">
            <this.InputField
              id="fname"
              type="text"
              label="First Name"
              placeholder="John"
              name="firstName"
            />
            <this.InputField
              id="lname"
              type="text"
              label="Last Name"
              placeholder="Doe"
              name="lastName"
            />
          </div>
          <this.InputField
            id="highest_edu"
            label="Highest Education Achieved"
            type="text"
            name="education"
          />
          <div className="input-row">
            <this.InputField
              id="client_monthly_income"
              type="number"
              label="Client's Monthly Income"
              placeholder="1800"
              name="clientIncome"
            />
            <this.InputField
              id="family_monthly_income"
              type="number"
              label="Family's Monthly Income"
              placeholder="2000"
              name="familyIncome"
            />
          </div>
          <this.InputField
            id="how_can_we_help"
            type="text"
            label="How can we help?"
            name="help"
          />
          <this.InputField
            id="next_court_date"
            type="date"
            label="Next Court Date"
            name="courtDate"
          />
          <this.InputGroup
              id="fleeCountry"
              label="Did you flee your country?"
              inputs = {[{name:"fleeCountry", value: true, choice: "Yes" }, {name:"fleeCountry", value: false, choice: "No" }]}
          />
          <this.InputGroup
              id="citizenSpouse"
              label="Do you have a US Citizen of LPR spouse?"
              inputs = {[{name:"citizenSpouse", value: true, choice: "Yes" }, {name:"citizenSpouse", value: false, choice: "No" }]}
          />
          <this.InputGroup
              id="citizenChild"
              label="Do you have a USC or LPR child over 21?"
              inputs = {[{name:"citizenChild", value: true, choice: "Yes" }, {name:"citizenChild", value: false, choice: "No" }]}
          />
          <this.InputField
            id="victim_crime"
            type="text"
            label="Victim of crime or domestic violence?"
            help="When, where, what? Police Report?"
            name="victimCrime"
          />
          <this.InputGroup
              id="livingWParents"
              label="If client is under 21, living with both parents?"
              inputs = {[{name:"livingWParents", value: true, choice: "Yes" }, {name:"livingWParents", value: false, choice: "No" }]}
          />
          <this.InputField
            id="initial_intake"
            type="text"
            label="Result of initial intake"
            name="initialIntake"
          />

          <div className="profile-section">
            <h3 className="title">Contact Information</h3>
            <this.InputField
              id="phone_number"
              type="text"
              label="Phone Number"
              placeholder="Phone Number"
              name="phone_number"
            />
            <this.InputField
              id="country"
              type="text"
              label="Country"
              placeholder="Country"
              name="country"
            />
            <this.InputField
              id="state"
              type="text"
              label="State"
              placeholder="State"
              name="state"
            />
            <this.InputField
              id="postal_code"
              type="text"
              label="Postal Code"
              placeholder="Postal Code"
              name="postal_code"
            />
            <this.InputField
              id="city"
              type="text"
              label="City"
              placeholder="City"
              name="city"
            />
            <this.InputField
              id="street"
              type="text"
              label="Street"
              placeholder="Street"
              name="street"
            />
          </div>

          {successMessage}
          <Button type="submit" className="button pull-right marginTop-md">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}
