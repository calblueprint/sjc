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
      <Form>
      <FormGroup>
        <FormControl 
        bsClass="form-control email-field" 
        bsSize="lg"
        type="email"
        name="email"
        placeholder="Email"
        onChange={this.handleEmailChange}
        onKeyDown={this._handleKeydown}/>
      </FormGroup>
      <FormGroup>
        <FormControl 
        bsClass="form-control password-field" 
        bsSize="lg"
        type="password"
        name="password"
        placeholder="Password"
        onChange={this.handlePasswordChange}
        onKeyDown={this._handleKeydown}/>
      </FormGroup>
      <div className="reset-pw">
      <Button 
      bsStyle="link"
      href="/users/password/new">
      Forgot password?
      </Button>
      </div>
      <Button bsStyle="button login-button" 
      bsSize="large" 
      onClick={this._handleLogin}>
      <strong>Login</strong>
      </Button>
      {this.showError}
      <div className="sign-up">
      <Button 
      bsStyle="primary"
      href="/users/sign_up">
      Sign Up
      </Button>
      </div>

      </Form>
      </div>
      );
  }
}