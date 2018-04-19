class ShowUser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      email: this.props.user.email,
      first_name: this.props.user.first_name,
      last_name: this.props.user.last_name,
      avatar: this.props.avatar,
      role: this.props.user.role,
      id: this.props.user.id,
    };
  }

  handleChange = (evt) => {
    this.setState({ [evt.target.name]: evt.target.value });
  }

  adminAccess = () => {
    window.location.href = '/admin';
  }
  editUser = () => {
    window.location.href = `/user/${this.state.id}/edit`;
  }

  setFile = (e) => {
    const files = e.target.files;
    if (!files || !files[0]) {
      return;
    }
    this.setState({ avatar: files[0] });
  }
  render() {

    const { FormGroup, ControlLabel, FormControl, Button } = ReactBootstrap;
    let adminDashboard;
    let errorBox;

    if (this.state.error) {
      errorBox = <p className="error-msg-container">{this.state.error}</p>
    }

    if (this.props.avatar) {
      avatar_image = <img src={this.props.avatar} />
    }

    if (this.state.role == "admin") {
      adminDashboard = <Button type="button" className="button button--outline marginLeft-md" onClick={this.adminAccess}> Admin Dashboard <span className="fa fa-arrow-right marginLeft-xxs"></span></Button>
    }
    return (
      <div>
        <form>
          <div className="input-container marginBot-xs">
            <label htmlFor="email" className="label label--newline">Email</label>
            <input name="email" id="email" className="input"
              type="text" value={this.state.email} placeholder="email@example.com"
              onChange={this.handleChange}
              readOnly />
          </div>

          <div className="input-row marginBot-xs">
            <div className="input-container">
              <label htmlFor="fname" className="label label--newline">First Name</label>
              <input name="first_name" id="fname" className="input"
                type="text" value={this.state.first_name} placeholder="Mary"
                onChange={this.handleChange}
                readOnly />
            </div>

            <div className="input-container">
              <label htmlFor="lname" className="label label--newline">Last Name</label>
              <input name="last_name" id="lname" className="input"
                type="text" value={this.state.last_name} placeholder="Chen"
                onChange={this.handleChange}
                readOnly />
            </div>
          </div>

          <div className="input-container">
            {avatar_image}
          </div>
          {errorBox}
          <Button type="button" className="button marginTop-md" onClick={this.editUser}>
            Edit User
            <span className="fa fa-arrow-right marginLeft-xxs"></span>
          </Button>
          {adminDashboard}
        </form>
      </div>
    );
  }
}
