class EditUser extends React.Component {

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

  setFile = (e) => {
    const files = e.target.files;
    if (!files || !files[0]) {
      return;
    }
    this.setState({ avatar: files[0] });
  }

  submit = (evt) => {
    evt.preventDefault();
    this.updateUser(evt);
  }

  updateUser = (evt) => {
    evt.preventDefault();

    const payload = {
      email: this.state.email,
      first_name: this.state.first_name,
      last_name: this.state.last_name,
      avatar: this.state.avatar,
    }

    Requester.update(`/api/users/${this.state.id}`, payload).then((data) => {
      this.setState({success: 1});
      window.location.href = `/user/${this.state.id}`;
    }).catch((data) => {
      this.setState({error: 'Failed to update user.'});
    });

    return false;
  }

  render() {

    const { FormGroup, ControlLabel, FormControl, Button } = ReactBootstrap;
    let errorBox, avatar_image;

    if (this.state.error) {
      errorBox = <p className="error-msg-container">{this.state.error}</p>
    }

    if (this.props.avatar && this.props.avatar != '/images/missing.png') {
      avatar_image = <img src={this.props.avatar} />
    }

    return (
      <div className="card-bg edit-profile-container">
        <h1 className="page-bar-title marginBot-md">Edit Profile</h1>
        <form>
          <div className="input-container marginBot-xs">
            <label htmlFor="email" className="label label--newline">Email</label>
            <input name="email" id="email" className="input"
              type="text" value={this.state.email} placeholder="email@example.com"
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
            {avatar_image}
            <label htmlFor="avatar" className="label label--newline">Upload a profile picture</label>
            <input name="avatar" id="avatar" type="file" onChange={this.setFile}/>
          </div>

          {errorBox}

          <Button type="submit" className="button marginTop-md" onClick={this.submit}>
            Save
            <span className="fa fa-arrow-right marginLeft-xxs"></span>
          </Button>
        </form>
      </div>
    );
  }
}
