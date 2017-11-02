class Dashboard extends React.Component {
  render() {
  	const { Tabs, Tab } = ReactBootstrap;
  	const { user } = this.props;
    return (
    	<div>
	    	<DashboardHeader name={user.first_name}/>
	    	<Tabs defaultActiveKey={1} id="user-dashboard">
	    		<Tab eventKey={1} title="Tasks">
	    			<TaskList userId={user.id} />
	    		</Tab>
	    		<Tab eventKey={2} title="Clients">
	    			<ClientList />
	    		</Tab>
	    	</Tabs>
	    </div>
  	);
  }
}