class ShowUser extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      error: '',
      email: this.props.user.email,
      first_name: this.props.user.first_name,
      last_name: this.props.user.last_name,
      avatar: this.props.avatar,
      id: this.props.user.id,
    };
  }

  render() {
    const editURL = `/user/${this.state.id}/edit`;
    const { FormGroup, ControlLabel, FormControl, Button } = ReactBootstrap;

    if (this.props.avatar) {
      avatar_image = <img style={{width: 200}} src={this.props.avatar} />
    }

    return (
      <div className="card-bg edit-profile-container">
        <h1 className="page-bar-title marginBot-md">Your Profile</h1>
        <form>
          <div className="input-container marginBot-xs">
            <label htmlFor="email" className="label label--newline">Email</label>
            <div>{this.state.email}</div>
          </div>

          <div className="input-row marginBot-xs">
            <div className="input-container">
              <label htmlFor="fname" className="label label--newline">First Name</label>
              <div>{this.state.first_name}</div>
            </div>

            <div className="input-container">
              <label htmlFor="lname" className="label label--newline">Last Name</label>
              <div>{this.state.last_name}</div>
            </div>
          </div>

          <div className="input-container">
            <label htmlFor="" className="label label--newline">Avatar</label>
            {avatar_image}
          </div>

          <a type="button" href={editURL} className="button marginTop-md">
            <span className="fa fa-pencil marginRight-xxs"></span>
            Edit Profile
          </a>
        </form>
      </div>
    );
  }
}
