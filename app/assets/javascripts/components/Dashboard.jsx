class Dashboard extends React.Component {
  render() {
  	const { Tabs, Tab } = ReactBootstrap;
    return (
    	<Tabs defaultActiveKey={1} id="user-dashboard">
    		<Tab eventKey={1} title="Tasks"> Some tasks boi </Tab>
    		<Tab eventKey={2} title="Users"> Some users boi </Tab>
    	</Tabs>
  	);
  }
}