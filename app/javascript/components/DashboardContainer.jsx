import React from 'react';
import 'react-tabs/style/react-tabs.css';
import ClientList from 'components/ClientList';
import TaskList from 'components/TaskList';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class DashboardContainer extends React.Component {
  render() {
  	const { userId } = this.props;
    return (
    	<Tabs>
		    <TabList>
		      <Tab>Tasks</Tab>
		      <Tab>Clients</Tab>
		    </TabList>

		    <TabPanel>
		      <TaskList userId={userId}/>
		    </TabPanel>
		    <TabPanel>
		      <ClientList />
		    </TabPanel>
		  </Tabs>
    )
  }
}

export default DashboardContainer;