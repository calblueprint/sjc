class Register extends React.Component {

  constructor(props) {
    super();
    this.state = {"success": null};
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

  createUser = (evt) => {
    evt.preventDefault()
    const inputs = evt.target.getElementsByTagName("input");
    let upload = "";
    if (inputs[4].files.length > 0) {
      upload = inputs[4].files[0];
    }
    const payload = {
      "email": inputs[0].value,
      "password": inputs[1].value,
      "first_name": inputs[2].value,
      "last_name": inputs[3].value,
      "avatar": upload
    };
    Requester.post('/api/users', payload).then((data) => {
      // Handle success/failure.
      if (data["message"] == "Attorney successfully created!") {
        this.setState({"success": 1});
      } else {
        this.setState({"success": 0});
      }
    }).catch((data) => {
      this.setState({"success": 0});
    });

    return false;
  }

  render() {
    
    const { Checkbox, Radio, FormGroup, ControlLabel, FormControl, Button } = ReactBootstrap;
    
    let successMessage = "";

    if (this.state.success != null) {
      if (this.state.success == 1) {
        successMessage = (
          <h2>Attorney created!</h2>
        );
      } else {
        successMessage = (
          <h2>Failed to create attorney!</h2>
        );
      }
    }

    return (
      <div>
        <h1>Register Attorney</h1>
        {successMessage}
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