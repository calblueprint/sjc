class Register extends React.Component {

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

  createUser(evt) {
    evt.preventDefault()
    const inputs = evt.target.getElementsByTagName("input");
    const payload = {
      "email": inputs[0].value,
      "password": inputs[1].value,
      "first_name": inputs[2].value,
      "last_name": inputs[3].value
    };
    console.log(payload);
    Requester.post('/api/users', payload).then((data) => {
      // Handle success/failure.
      console.log(data);
    });

    return false;
  }

  render() {
    
    const { Checkbox, Radio, FormGroup, ControlLabel, FormControl, Button } = ReactBootstrap;
    
    return (
      <div>
        <h1>Register Attorney</h1>
        <form onSubmit={this.createUser}>
          <this.FieldGroup
            id="formControlsEmail"
            type="email"
            label="Email address"
            placeholder="Enter email"
          />
          <this.FieldGroup
            id="formControlsPassword"
            label="Password"
            type="password"
          />
          <this.FieldGroup
            id="formControlsText"
            type="text"
            label="First name"
            placeholder="John"
          />
          <this.FieldGroup
            id="formControlsText"
            type="text"
            label="Last name"
            placeholder="Doe"
          />
          <this.FieldGroup
            id="formControlsFile"
            type="file"
            label="Profile picture"
            help="Upload a .jpg, please."
          />
          <Button type="submit">
            Submit
          </Button>
        </form>
      </div>
    );
  }

}