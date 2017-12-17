class Header extends React.Component {
  render() {
    const { user, imagePath } = this.props;
    const { Image } = ReactBootstrap;
    return (
      <div className="sjc-header">
        <a href="/">
          <img className="header-logo" src={imagePath} />
        </a>
        <div className="header-profile">
          
          <Image src="https://cdn2.iconfinder.com/data/icons/user-interface-essentials/64/Artboard_12-512.png" circle bsClass="header-profile-img img" />
        </div>
      </div>
    );
  }
}
