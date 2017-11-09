class DashboardHeader extends React.Component {
  render() {
    const { Row, Col } = ReactBootstrap;
    return (
    	<Row className="clearfix">
        <Col sm={2} bsClass="nav-header col">
          <div className="dashboard-profile">
            Welcome, {this.props.name}
          </div>
        </Col>
        <Col sm={8} bsClass="header-svg col">
          <HeaderSVG />
          <div className="dashboard-name">
            {this.props.name}
          </div>
        </Col>
	    </Row>
    );
  }
}
