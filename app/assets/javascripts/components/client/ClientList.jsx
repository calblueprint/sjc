class ClientList extends React.Component {
  render() {
  	const { PageHeader, ListGroup, ListGroupItem } = ReactBootstrap;
  	const clientList = this.props.clients.map((client, index) => 
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
