import React, { Component } from 'react';
import Modal from './Modal';

/**
 * @prop btnClasses - classes to customize button
 */
class HomeLogin extends React.component {

  constructor(props) {
    super(props)
    this.state = {
      isOpen: false
    }
  }

  _getToken = () => {
    var token = document.getElementsByName("csrf-token")[0].getAttribute("content");
    return token;
  }

  _handleClick = () => this.setState({isOpen: true})
  _handleClose = () => this.setState({isOpen: false})
  _handleKeydown = (k) => {
    if (k.keyCode == 13) {
      this._handleLogin();
    }
  }

  _handleLogin = () => {
    const success = () => {window.location = "/dashboard";}
    // const failure = () => {}
    // Request.post(API)
  }

  _forgotPassword = () => {
    
  }

  render() {
    return (
      <div>
        <button onClick={this._handleClick}>Log In</button>

        <Modal
          onHide={this._handleClose}
          show=(this.state.isOpen)
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
                onChange={this._handleChange}
                onKeyDown={this._handleKeydown}
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
                onChange={this._handleChange}
                onKeyDown={this._handleKeydown}
              />
              <input
                type="hidden"
                name="authenticity_token"
                value={this._getToken()}
              />
            </div>
          </Modal.Body>
          
          <Modal.Footer>
            <button onClick={this._handleClose}>Close</button>
            <button onClick={this._handleLogin}>Log In</button>
            <button onClick={this._forgotPassword}>Forgot Password?</button>
          </Modal.Footer>

        </Modal>
      </div>
      )
  }
}



  // <div hidden={this.state.hideErrors}>
  // The email or password you entered doesn't match our records. Please double check and try again!
  // </div>


//   constructor(props) {
//     super(props);
//     this.state = {
//       showModal: false,
//       hideErrors: true
//     };
//   }

//   _openModal = () => {
//     this.setState({ showModal: true });
//   }

//   _closeModal = () => {
//     this.setState({
//       showModal: false,
//       hideErrors: true
//     });
//   }

//   _getToken = () => {
//     const token = document.getElementsByName("csrf-token")[0].getAttribute("content");
//     return token;
//   }

//   _handleKeydown = (e) => {
//     if (e.keyCode == 13) {
//       this._handleLogin();
//     }
//   }

//   _handleLogin = () => {
//     this.setState({ hideErrors: true, })

//     const success = () => {
//       window.location = "/dashboard";
//     }
//     const failure = () => {
//       this.setState({hideErrors: false});
//     }
//     Requester.post('/users/sign_in', this._formFields(), success, failure);
//   }

//   _forgotPassword = () => {
//     // CHANGE THIS
//     window.location = "/dashboard";
//   }

//   render() {
//     return (
//       <div>
//         <button
//           className={`button ${this.props.btnClasses} splash-login-button`}
//           onClick={this._openModal}
//         >Log In</button>
//         <Modal
//           bsSize="small"
//           className="login-modal"
//           show={this.state.showModal}
//           onHide={this._closeModal}
//           onEntered={() => {this.emailInput.focus()}}
//         >
//           <Modal.Header>
//             <Modal.Title>Log In</Modal.Title>
//           </Modal.Header>

//           <Modal.Body>
//             <div className="input-container marginBot-sm">
//               <label
//                 className="label label--newline"
//                 htmlFor="email-input"
//               >Email Address</label>
//               <input
//                 className="input input--fullwidth"
//                 id="email-input"
//                 name="email"
//                 type="email"
//                 placeholder="example@email.com"
//                 onChange={this._handleChange}
//                 onKeyDown={this._handleKeydown}
//                 ref={(input) => { this.emailInput = input; }}
//               />
//             </div>
//             <div className="input-container">
//               <label
//                 className="label label--newline"
//                 htmlFor="password-input"
//               >Password</label>
//               <input
//                 className="input input--fullwidth"
//                 id="password-input"
//                 name="password"
//                 type="password"
//                 onChange={this._handleChange}
//                 onKeyDown={this._handleKeydown}
//               />
//               <input
//                 type="hidden"
//                 name="authenticity_token"
//                 value={this._getToken()}
//               />
//             </div>
//             <div hidden={this.state.hideErrors} className="marginTop-xs login-error-text">
//               The email or password you entered doesn't match our records. Please double check and try again!
//             </div>
//           </Modal.Body>
//           <Modal.Footer>
//             <button
//               type="button"
//               className="button button--text-black marginRight-xs"
//               onClick={this._forgotPassword}
//             >Forgot Password?</button>
//             <button
//               type="button"
//               className="button button--text-black"
//               onClick={this._closeModal}
//             >Close</button>
//             <button
//               type="button"
//               className="button marginLeft-sm"
//               onClick={this._handleLogin}
//             >Log In</button>
//           </Modal.Footer>
//         </Modal>
//       </div>
//     );
//   }
// }

// HomeLogin.propTypes = { btnClasses: React.PropTypes.string };
// HomeLogin.defaultProps = { btnClasses: "button--white" };