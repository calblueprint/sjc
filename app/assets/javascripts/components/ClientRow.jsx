/**
* @prop client - client object associated with this row
*/

class ClientRow extends React.Component {
  render() {
    const { client } = this.props;
    const fullAddress = `${client.street}, ${client.city}, ${client.state}, ${client.postal_code}`;
    return (
      <div>
        <h2>{client.first_name} {client.last_name}</h2>
        <div> Case ID: {client.case_id} </div>
        <div> Phone Number: {client.phone_number} </div>
        <div> Country: {client.country} </div>
        <div> Address: {fullAddress} </div>
      </div>
    );
  }
}
