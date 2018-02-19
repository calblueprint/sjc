class RegisterClient extends React.Component {

  constructor(props) {
    super();
    this.state = {success: null};
    this.select = this.select.bind(this);
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

  InputGroup({ id, label, help, inputs, ...props }) {
    const { Checkbox, Radio, FormGroup, ControlLabel, FormControl, Button, HelpBlock } = ReactBootstrap;
    const radioItems = inputs.map((input, i) =>
        <Radio key={i} name={input.name} value={input.value} inline >
          {input.choice}
        </Radio>
    );
    return (
      <FormGroup controlId={id} onChange={this.select}>
        <ControlLabel >{label}</ControlLabel>
        {radioItems}
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
    console.log(payload);
    Requester.post('/api/clients', payload).then((data) => {
      this.setState({success: 1});
    }).catch((data) => {
      this.setState({success: 0});
    });

    return false;
  }

  select(event) {
    console.log(event.target.name);
    console.log(event.target.value);
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
          <FormGroup onChange={this.select}>
            <ControlLabel>Do you have a US Citizen of LPR spouse?</ControlLabel>
            <Radio name="citizenSpouse" value={true} inline>
            Yes
            </Radio>{' '}
            <Radio name="citizenSpouse" value={false} inline>
            No
            </Radio>{' '}
          </FormGroup>
          <FormGroup onChange={this.select}>
            <ControlLabel>Do you have a USC or LPR child over 21?</ControlLabel>
            <Radio name="citizenChild" value={true} inline>
            Yes
            </Radio>{' '}
            <Radio name="citizenChild" value={false} inline>
            No
            </Radio>{' '}
          </FormGroup>
          <this.InputField
            id="formControlsText"
            type="text"
            label="Victim of crime or domestic violence? When, where, what? Police Report?"
            name="victimCrime"
          />
          <FormGroup onChange={this.select}>
            <ControlLabel>If under 21, living with both parents?</ControlLabel>
            <Radio name="livingWParents" value={true} inline>
            Yes
            </Radio>{' '}
            <Radio name="livingWParents" value={false} inline>
            No
            </Radio>{' '}
          </FormGroup>
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
