class Register extends React.Component {

  constructor(props) {
    super();
    this.state = {
      success: null,
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      avatar: ''
    };
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

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  createUser = (evt) => {
    evt.preventDefault()
    let upload = "";
    if (this.file && this.file.files.length > 0) {
      upload = this.file.files[0];
    }
    this.setState({avatar: upload})

    Requester.post('/api/users', this.state).then((data) => {
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
          <label>
          Email:
          <input name="email" type="text" value={this.state.email} onChange={this.handleChange}/>
          </label>
          Password:
          <input name="password" value={this.state.password} onChange={this.handleChange}/>
          First Name:
          <input name="first_name" value={this.state.first_name} onChange={this.handleChange}/>
          Last Name:
          <input name="last_name" value={this.state.last_name} onChange={this.handleChange}/>
          Upload a profile picture:
          <input name="avatar" type="file" value={this.state.avatar} onChange={this.handleChange}/>
          <Button type="submit">
            Submit
          </Button>
        </form>
      </div>
    );
  }

}
