/**
* @prop client - client object associated with this row
*/

class ClientRow extends React.Component {

  linkToProfile = () => {
    const id = this.props.client.id;
    window.location = `/clients/${id}`;
  }

  render() {
    const { client } = this.props;
    const fullAddress = `${client.street}, ${client.city}, ${client.state}`;

    return (
      <tr onClick={this.linkToProfile} className="table-row">
        <td className="clients-table-name">{client.first_name} {client.last_name}</td>
        <td>{client.case_id} </td>
        <td>{client.phone_number} </td>
        <td>{client.country} </td>
        <td>{fullAddress} </td>
      </tr>
    );
  }
}
