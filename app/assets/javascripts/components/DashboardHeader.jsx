/**
* @prop name - name of currently logged in user
*/

class DashboardHeader extends React.Component {
	render() {
		const { Image, Row, Col } = ReactBootstrap;
		return (
			<Row className="clearfix">
				<Col sm={2} bsClass="nav-header col">
					<div className="dashboard-profile">
						<div className="profile-text"> Welcome, {this.props.firstName} </div>
						<Image src="https://cdn2.iconfinder.com/data/icons/user-interface-essentials/64/Artboard_12-512.png" circle bsClass="dashboard-profile-img img" />
					</div>
				</Col>
				<Col sm={8} bsClass="header-svg col">
					<HeaderSVG />
				</Col>
			</Row>
		);
	}
}
