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
        <td>{showValue(client.case_id)} </td>
        <td>{showValue(client.phone_number)} </td>
        <td>{showValue(client.country)} </td>
        <td>{showValue(fullAddress)} </td>
      </tr>
    );
  }
}
