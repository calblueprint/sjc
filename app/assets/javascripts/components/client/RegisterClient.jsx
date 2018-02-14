class RegisterClient extends React.Component {

  constructor(props) {
    super();
    this.state = {success: null};
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
    let upload = "";
    if (this.file && this.file.files.length > 0) {
      upload = this.file.files[0];
    }
    const payload = {
      name: this.name,
      password: this.password,
      first_name: this.first,
      last_name: this.last,
      avatar: upload
    };
    Requester.post('/api/users', payload).then((data) => {
      this.setState({success: 1});
    }).catch((data) => {
      this.setState({success: 0});
    });

    return false;
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
            id="formControlsText"
            type="text"
            label="Name"
            placeholder="John Doe"
            ref={input => this.name = input}
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
          <FormGroup>
            Did you flee your country?
            <Radio name="radioGroup" inline>
              Yes
            </Radio>{' '}
            <Radio name="radioGroup" defaultChecked inline>
              No
            </Radio>
          </FormGroup>
          <Button type="submit">
            Submit
          </Button>
        </form>
      </div>
    );
  }
}
