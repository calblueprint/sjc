class Dashboard extends React.Component {
  render() {
  	const user = this.props.user;
    return (
    	<div>
	    	<h1>{user.first_name} {user.last_name}</h1>
	    	<ReactTabs.Tabs>
	        <TabList>
	          <Tab>Tasks</Tab>
	          <Tab>Clients</Tab>
	        </TabList>
	        <TabPanel>
	        	sup sup sup
	        </TabPanel>
	        <TabPanel>
	        	hey hey hey
	        </TabPanel>
	      </ReactTabs.Tabs>
      </div>
    );
  }
}