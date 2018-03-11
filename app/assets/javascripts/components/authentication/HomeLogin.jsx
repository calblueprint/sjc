class HomeLogin extends React.Component {

  constructor(props) {
    super(props);
    // this._success = this._success.bind(this);
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

  render() {
    const Form = ReactBootstrap.Form,
          FormGroup = ReactBootstrap.FormGroup,
          FormControl = ReactBootstrap.FormControl,
          Button = ReactBootstrap.Button;

    let errorBox;

    if (this.state.error) {
      errorBox = <p className="error-msg-container">{this.state.error}</p>
    }

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

          {errorBox}

          <div className="login-form-btn-container">
            <div>
              <p className="marginBot-xxs">
                <a className="link link--underline" href="/users/password/new">
                  Forgot password?
                </a></p>
              <p><a className="link link--underline" href="/users/register">
                  Sign Up
                </a></p>
            </div>

            <Button bsClass="button login-button"
              onClick={this._handleLogin}>
              Login
              <span className="fa fa-arrow-right marginLeft-xxs"></span>
            </Button>
          </div>

        </Form>
      </div>
      );
  }
}
