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
    this.setState({ avatar: files[0] });
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

    let formData = new FormData();
    formData.append('user[email]', this.state.email);
    formData.append('user[password]', this.state.password);
    formData.append('user[first_name]', this.state.first_name);
    formData.append('user[last_name]', this.state.last_name);

    let { avatar } = this.state;
    formData.append(
      'user[avatar]',
      avatar,
      avatar.name
    );

    fetch('/api/users', {
      method: 'POST',
      body: formData,
      credentials: 'same-origin',
      headers: {
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      }
    }).then((data) => {
      this.setState({
        "error": data.error,
      });
      this._handleLogin()
    }).catch((data) => {
      console.error(data)
      this.setState({ error: 'Failed to create attorney.' });
    });

    return false;
  }

  _handleLogin = () => {
    var formFields = {
      email: this.state.email,
      password: this.state.password
    }
    Requester.post(`/api/sessions`, formFields).then(() => {
      window.location.href = '/';
    }, (e) => {
      this.setState({
        hasError: true,
        error: 'Wrong email or password, please try again!'
      });
    })
  };

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

          <Button type="submit" className="button marginTop-md" onClick={this.submit}>
            Submit
            <span className="fa fa-arrow-right marginLeft-xxs"></span>
          </Button>
        </form>
      </div>
    );
  }
}
