class RegisterClient extends React.Component {

  constructor(props) {
    super();
    this.state = {success: null};
    this.select = this.select.bind(this);
  }

  FieldGroup({ id, label, help, ...props }) {
    const { Checkbox, Radio, FormGroup, ControlLabel, FormControl, Button, HelpBlock } = ReactBootstrap;
    return (
      <FormGroup controlId={id}>
        <ControlLabel>{label}</ControlLabel>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }

  createClient = (evt) => {
    evt.preventDefault()
    console.log(evt.target);
    console.log(evt.firstName);
    console.log(this.firstName);
    const payload = {
      first_name: this.firstName,
      last_name: this.lastName,
      education: this.education,
      client_income: this.clientIncome,
      family_income: this.familyIncome,
      help: this.help,
      court_date: this.courtDate,
      flee_country: this.state.fleeCountry,
      citizen_spouse: this.state.citizenSpouse,
      citizen_child: this.state.citizenChild,
      victim_crime: this.victimCrime,
      living_w_parents: this.state.livingWParents,
      initial_intake: this.initialIntake
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
          <this.FieldGroup
            onChange={this.select}
            id="formControlsText"
            type="text"
            label="First Name"
            placeholder="John"
            ref={input => this.firstName = input}
          />
          <this.FieldGroup
            id="formControlsText"
            type="text"
            label="Last Name"
            placeholder="Doe"
            ref={input => this.lastName = input}
          />
          <this.FieldGroup
            id="formControlsText"
            label="Highest Education Achieved"
            type="text"
            ref={input => this.education = input}
          />
          <this.FieldGroup
            id="formControlsText"
            type="number"
            label="Client's Monthly Income"
            placeholder="1800"
            ref={input => this.clientIncome = input}
          />
          <this.FieldGroup
            id="formControlsText"
            type="number"
            label="Family's Monthly Income"
            placeholder="2000"
            ref={input => this.familyIncome = input}
          />
          <this.FieldGroup
            id="formControlsText"
            type="text"
            label="How can we help?"
            ref={input => this.help = input}
          />
          <this.FieldGroup
            id="formControlsDate"
            type="date"
            label="Next Court Date"
            ref={input => this.courtDate = input}
          />
          <FormGroup onChange={this.select}>
            <ControlLabel>Did you flee your country?</ControlLabel>
            <input type="radio" value={true} name="fleeCountry"/>Yes
            <input type="radio" value={false} name="fleeCountry"/>No
          </FormGroup>
          <FormGroup onChange={this.select}>
            <ControlLabel>Do you have a US Citizen of LPR spouse?</ControlLabel>
            <input type="radio" value={true} name="citizenSpouse"/>Yes
            <input type="radio" value={false} name="citizenSpouse"/>No
          </FormGroup>
          <FormGroup onChange={this.select}>
            <ControlLabel>Do you have a USC or LPR child over 21?</ControlLabel>
            <input type="radio" value={true} name="citizenChild"/>Yes
            <input type="radio" value={false} name="citizenChild"/>No
          </FormGroup>
          <this.FieldGroup
            id="formControlsText"
            type="text"
            label="Victim of crime or domestic violence? When, where, what? Police Report?"
            ref={input => this.victimCrime = input}
          />
          <FormGroup onChange={this.select}>
            <ControlLabel>If under 21, living with both parents?</ControlLabel>
            <input type="radio" value={true} name="livingWParents"/>Yes
            <input type="radio" value={false} name="livingWParents"/>No
          </FormGroup>
          <this.FieldGroup
            id="formControlsText"
            type="text"
            label="Result of initial intake"
            ref={input => this.initialIntake = input}
          />
          <Button type="submit">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}
