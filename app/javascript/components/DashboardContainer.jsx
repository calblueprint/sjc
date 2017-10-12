import React from 'react';
import 'react-tabs/style/react-tabs.css';
import { Tab, Tabs, TabList, TabPanel } from 'react-tabs';

class Application extends React.Component {
  render() {
    return (
    	<Tabs>
		    <TabList>
		      <Tab>Title 1</Tab>
		      <Tab>Title 2</Tab>
		    </TabList>

		    <TabPanel>
		      <h2>Any content 1</h2>
		    </TabPanel>
		    <TabPanel>
		      <h2>Any content 2</h2>
		    </TabPanel>
		  </Tabs>
    )
  }
}

export default Application;