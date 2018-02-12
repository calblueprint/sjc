class Register extends React.Component {

  constructor(props) {
    super();
    this.state = {
      error: '',
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
      return;
    }

    const reader = new FileReader();
    reader.onload = (file) => {
      this.setState({ avatar: file.target.result, });
    }

    reader.readAsDataURL(files[0]);
  }

  submit = (evt) => {
    evt.preventDefault();
    if (!this.state.email || !this.state.password) {
      this.setState({
        error: 'Username or password can\'t be blank.',
      });
    } else {
      this.createUser(evt);
    }
  }

  createUser = (evt) => {
    evt.preventDefault();
    const user = {
      email: this.state.email,
      password: this.state.password,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      avatar: this.state.avatar,
    }
    const params = {
      user: user,
    }

    Requester.post('/api/users', params).then((data) => {
      window.location.href = '/';
    }).catch((data) => {
      this.setState({ error: 'Failed to create attorney.' });
    });

    return false;
  }

  render() {

    const { FormGroup, ControlLabel, FormControl, Button } = ReactBootstrap;

    let errorBox;

    if (this.state.error) {
      errorBox = <p className="error-msg-container">{this.state.error}</p>
    }

    return (
      <div>
        <form>
          <div className="input-container marginBot-xs">
            <label htmlFor="email" className="label label--newline">Email</label>
            <input name="email" id="email" className="input"
              type="text" value={this.state.email} placeholder="email@example.com"
              onChange={this.handleChange}/>
          </div>

          <div className="input-container marginBot-lg">
            <label htmlFor="password" className="label label--newline">Password</label>
            <input name="password" id="password" className="input"
              type="password" value={this.state.password}
              onChange={this.handleChange}/>
          </div>

          <div className="input-row marginBot-xs">
            <div className="input-container">
              <label htmlFor="fname" className="label label--newline">First Name</label>
              <input name="first_name" id="fname" className="input"
                type="text" value={this.state.first_name} placeholder="Mary"
                onChange={this.handleChange}/>
            </div>

            <div className="input-container">
              <label htmlFor="lname" className="label label--newline">Last Name</label>
              <input name="last_name" id="lname" className="input"
                type="text" value={this.state.last_name} placeholder="Chen"
                onChange={this.handleChange}/>
            </div>
          </div>

          <div className="input-container">
            <label htmlFor="avatar" className="label label--newline">Upload a profile picture</label>
            <input name="avatar" id="avatar" type="file" onChange={this.setFile}/>
          </div>

          {errorBox}

          <Button type="submit" className="button marginTop-sm" onClick={this.submit}>
            Submit
          </Button>
        </form>
      </div>
    );
  }
}
