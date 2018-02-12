class HomeLogin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      email: '',
      password: '',
      error: '',
      hasError: false
    }
  };

  _handleKeydown = (k) => {
    if (k.keyCode == 13) {
      this._handleLogin();
    }
  }

  handleEmailChange = (e) => {
    this.setState({
      email: e.target.value
    })
  }

  handlePasswordChange = (e) => {
    this.setState({
      password: e.target.value
    })
  }

  _handleLogin = () => {
    var formFields = {
      email: this.state.email,
      password: this.state.password
    }
    Requester.post(`/api/sessions`, formFields).then(() => {
      location.reload();
    }, (e) => {
      this.setState({
        hasError: true,
        error: 'Wrong email or password, please try again!'
      });
    })
  };

  showError = () => {
    const Alert = ReactBootstrap.Alert
    const { error } = this.state;
    if (error != '') {
      return (
        <div className="wrong-login">
        <Alert bsStyle="danger">
          {error}
        </Alert>
        </div>
      )
    };
  };

  render() {
    const Form = ReactBootstrap.Form,
          FormGroup = ReactBootstrap.FormGroup,
          FormControl = ReactBootstrap.FormControl,
          Button = ReactBootstrap.Button;
    return (
      <div>
        <Form className="login-form-container">
          <FormGroup className="input-container marginBot-sm">
            <div className="label">Email</div>
            <FormControl
              bsClass="input"
              type="email"
              name="email"
              placeholder="example@email.com"
              onChange={this.handleEmailChange}
              onKeyDown={this._handleKeydown}
            />
          </FormGroup>

          <FormGroup className="input-container marginBot-sm">
            <div className="label">Password</div>
            <FormControl
              bsClass="input"
              type="password"
              name="password"
              onChange={this.handlePasswordChange}
              onKeyDown={this._handleKeydown}
            />
          </FormGroup>

          <div className="login-form-btn-container">
            <div className="reset-pw">
              <a className="link link--underline" href="/users/password/new">
                Forgot password?
              </a>
            </div>

            <Button bsClass="button login-button"
              onClick={this._handleLogin}>
              <strong>Login</strong>
            </Button>
          </div>

          {this.showError}

          <div className="sign-up">
            <a className="link link--underline" href="/users/register">
              Sign Up
            </a>
          </div>

        </Form>
      </div>
      );
  }
}
