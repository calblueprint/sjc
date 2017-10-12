import React from 'react';
import ClientRow from 'components/ClientRow';

class ClientList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clients: [],
		};
	}

	componentDidMount() {
		// REPLACE WITH BETTER AJAX stuff
		const httpRequest = new XMLHttpRequest();
		httpRequest.onreadystatechange = () => {
		  if (httpRequest.readyState == XMLHttpRequest.DONE) {
		  	if (httpRequest.status == 200) {
		  		this.setState({
		  			clients: JSON.parse(httpRequest.responseText),
		  		});
		  	}
		  }
		};
		httpRequest.open('GET', '/api/clients', true);
		httpRequest.send();
	}

  render() {
  	const clientList = this.state.clients.map((client, index) => <ClientRow client={client} key={index}/>);
    return (
    	<div>
    		{ clientList }
    	</div>
    );
  }
}

export default ClientList;