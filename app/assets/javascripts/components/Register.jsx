class Register extends React.Component {

  constructor(props) {
    super();
    this.state = {
      success: '',
      email: '',
      password: '',
      first_name: '',
      last_name: '',
      avatar: '',
    };
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  setFile = (e) => {
    const files = e.target.files;
    if (!files || !files[0]) {
      return
    }

    const reader = new FileReader();
    reader.onload = (file) => {
      this.setState({ avatar: file.target.result, });
    }

    reader.readAsDataURL(files[0]);
  }

  createUser = (evt) => {
    evt.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      avatar: this.state.avatar
    }
    const params = {
      user: user
    }
    Requester.post('/api/users', params).then((data) => {
      this.setState({success: 'Attorney created!'});
    }).catch((data) => {
      this.setState({success: 'Failed to create attorney.'});
    });

    return false;
  }

  render() {

    const { Checkbox, Radio, FormGroup, ControlLabel, FormControl, Button } = ReactBootstrap;


    return (
      <div>
        <h1>Register Attorney</h1>
        {this.state.success}
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
          <input name="avatar" type="file" onChange={this.setFile}/>
          <Button type="submit">
            Submit
          </Button>
        </form>
      </div>
    );
  }

}
