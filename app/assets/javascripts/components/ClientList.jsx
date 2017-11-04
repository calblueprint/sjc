class ClientList extends React.Component {
	constructor(props) {
		super(props);
		this.state = {
			clients: [],
		};
	}

	componentDidMount() {
		Requester.get('/api/clients').then((clients) => {
			this.setState({ clients });
		});
	}

  render() {
  	const { PageHeader, ListGroup, ListGroupItem } = ReactBootstrap;
  	const clientList = this.state.clients.map((client, index) => 
  		<ListGroupItem
  			header={`${client.first_name} ${client.last_name}`} 
  			href={`/clients/${client.id}`}
        key={index}
  		>
  			Case ID: {client.case_id}
  		</ListGroupItem>
  	);
    return (
    	<div>
    		{ clientList }
    	</div>
    );
  }
}
