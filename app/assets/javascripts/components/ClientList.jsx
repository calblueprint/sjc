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
  	const clientList = this.state.clients.map((client, index) => <ClientRow client={client} key={index}/>);
    return (
    	<div>
    		{ clientList }
    	</div>
    );
  }
}
