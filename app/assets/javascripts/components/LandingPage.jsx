class LandingPage extends React.Component {
  render() {
  	const { Grid } = ReactBootstrap;
  	const { Row } = ReactBootstrap;
  	const { Col } = ReactBootstrap;
    console.log(Grid);
    console.log(Row);
    console.log(Col);
    return (
	  	<Row bsClass="row custom-row">
	  		<Col sm={9} md={9} lg={9}>
	  			<img 
	    		src="http://socialjusticecollaborative.org/wp-content/uploads/2015/09/Social-Justice-Collaborative-San-Fransisco-Another-Look-05.13.16-2.jpg"
	    		className="landing_banner"
	    		height={775}
	    		width={1000}
	    		/>
	      </Col>
	      <Col sm={2} md={2} lg={2} className="home-logo">
	      	<img 
	    		src="http://socialjusticecollaborative.org/wp-content/uploads/2017/04/logo-large.png"
	    		height={100}
	    		width={300}
	    		/>
	        <HomeLogin />
	      </Col>
	  	</Row>
		);
  }
}