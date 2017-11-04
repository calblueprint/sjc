class HomeLogin extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      isOpen: true,
    }
  };

  _getToken() {
    const token = document.getElementsByName("csrf-token")[0].getAttribute("content");
    return token;
  };

  _handleClick() {
    this.setState({isOpen: true})
  }

  _handleClose() {
    this.setState({isOpen: false})
  }

  _handleKeydown(k) {
    if (k.keyCode == 13) {
      this._handleLogin();
    }
  }

  _formFields() {
    return {
      email: this.emailInput.value,
      password: this.passwordInput.value
    };
  }

  _handleLogin() {
    const success = () => {window.location = "/dashboard"};
    const failure = () => {
      this.setState({hideErrors: false});
    }
    Requester.post('/users/sign_in', this._formFields());
  };

  _forgotPassword() {
  };

  render() {
    const { Modal } = ReactBootstrap;
    console.log(Modal);
    return (
      <div>
        <button onClick={() => this._handleClick()}>Log In</button>

        <Modal
          onHide={() => this._handleClose()}
          show={this.state.isOpen}
        >

          <Modal.Header>
            <Modal.Title>Log In</Modal.Title>
          </Modal.Header>

          <Modal.Body>
            <div>
              <label htmlFor="email_input">Email Address</label>
              <input 
                id="email_input" 
                name="email"
                type="email"
                placeholder="example@email.com"
                onChange={() => this._handleChange()}
                onKeyDown={(key) => this._handleKeydown(key)}
                ref={(input) => { this.emailInput = input; }}
              />
            </div>
            <div>
              <label htmlFor="pw_input">Password</label>
              <input
                id="pw_input"
                name="pw"
                type="password"
                placeholder="********"
                onChange={() => this._handleChange()}
                onKeyDown={(key) => this._handleKeydown(key)}
                ref={(input) => { this.passwordInput = input; }} />
              />
              <input
                type="hidden"
                name="authenticity_token"
                value={() => this._getToken()}
              />
            </div>
          </Modal.Body>
          
          <Modal.Footer>
            <button onClick={() => this._handleClose()}>Close</button>
            <button onClick={() => this._handleLogin()}>Log In</button>
            <button onClick={() => this._forgotPassword()}>Forgot Password?</button>
          </Modal.Footer>

        </Modal>
      </div>
      );
  }
}