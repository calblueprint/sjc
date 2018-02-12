class Register extends React.Component {

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

  createUser = (evt) => {
    evt.preventDefault()
    let upload = "";
    if (this.file && this.file.files.length > 0) {
      upload = this.file.files[0];
    }
    const payload = {
      email: this.email,
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
            ref={input => this.email = input}
          />
          <this.FieldGroup
            id="formControlsPassword"
            label="Password"
            type="password"
            ref={input => this.password = input}
          />
          <this.FieldGroup
            id="formControlsText"
            type="text"
            label="First name"
            placeholder="John"
            ref={input => this.first = input}
          />
          <this.FieldGroup
            id="formControlsText"
            type="text"
            label="Last name"
            placeholder="Doe"
            ref={input => this.last = input}
          />
          <this.FieldGroup
            id="formControlsFile"
            type="file"
            label="Profile picture"
            help="Upload a .jpg, please."
            ref={input => this.file = input}
          />
          <Button type="submit">
            Submit
          </Button>
        </form>
      </div>
    );
  }

}