class RegisterClient extends React.Component {

  constructor(props) {
    super();
    this.state = {
      success: null
    };
    this.select = this.select.bind(this);
    this.renderSelections = this.renderSelections.bind(this);
    this.InputGroup = this.InputGroup.bind(this);
    this.InputField = this.InputField.bind(this);
  }

  InputField({ id, label, help, ...props }) {
    const { Checkbox, Radio, FormGroup, ControlLabel, FormControl, Button, HelpBlock } = ReactBootstrap;
    return (
      <FormGroup controlId={id} onChange={this.select}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }

  renderSelections(selections) {
    const { Checkbox, Radio, FormGroup, ControlLabel, FormControl, Button, HelpBlock } = ReactBootstrap;
    return selections.map((selection) => {
      return (
        <Radio name={selection.name} value={selection.value} inline>
          {selection.choice}
        </Radio>
      );
    });
  }

  InputGroup({ id, label, help, inputs, ...props }) {
    const { Checkbox, Radio, FormGroup, ControlLabel, FormControl, Button, HelpBlock } = ReactBootstrap;
    return (
      <FormGroup controlId={id} onChange={this.select}>
        <ControlLabel >{label}</ControlLabel>
        {this.renderSelections(inputs)}
        {help && <HelpBlock>{help}</HelpBlock>}
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
      initial_intake: this.state.initialIntake
    };
    Requester.post('/api/clients', payload).then((data) => {
      this.setState({success: 1});
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
      <div>
        <h1>Register Client</h1>
        {successMessage}
        <form onSubmit={this.createClient}>
          <this.InputField
            id="formControlsText"
            type="text"
            label="First Name"
            placeholder="John"
            name="firstName"
          />
          <this.InputField
            id="formControlsText"
            type="text"
            label="Last Name"
            placeholder="Doe"
            name="lastName"
          />
          <this.InputField
            id="formControlsText"
            label="Highest Education Achieved"
            type="text"
            name="education"
          />
          <this.InputField
            id="formControlsText"
            type="number"
            label="Client's Monthly Income"
            placeholder="1800"
            name="clientIncome"
          />
          <this.InputField
            id="formControlsText"
            type="number"
            label="Family's Monthly Income"
            placeholder="2000"
            name="familyIncome"
          />
          <this.InputField
            id="formControlsText"
            type="text"
            label="How can we help?"
            name="help"
          />
          <this.InputField
            id="formControlsDate"
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
            id="formControlsText"
            type="text"
            label="Victim of crime or domestic violence? When, where, what? Police Report?"
            name="victimCrime"
          />
          <this.InputGroup
              id="livingWParents"
              label="If under 21, living with both parents?"
              inputs = {[{name:"livingWParents", value: true, choice: "Yes" }, {name:"livingWParents", value: false, choice: "No" }]}
          />
          <this.InputField
            id="formControlsText"
            type="text"
            label="Result of initial intake"
            name="initialIntake"
          />
          <Button type="submit">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}
