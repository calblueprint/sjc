/**
 * @prop client -
 */
class ClientPageHeader extends React.Component {

  constructor() {
    super();
  }

  render() {
    const { client, page } = this.props;
    const casesURL = `/clients/${client.id}/`;
    const profileURL = `/clients/${client.id}/profile`;
    const editURL = `/clients/${client.id}/edit`;

    return (
      <div className="page-bar">
        <div className="container">
          <div className="page-bar-title">
            <a href="/clients" className="link back-to-all-clients">
              <span className="fa fa-angle-left marginRight-xxs"></span>
              back to all clients
            </a>
            <div>
              <span className="client-name">{client.first_name} {client.last_name}</span>
              <span className="client-id">#{client.case_id}</span>
            </div>
          </div>
          <div className="page-bar-right">
            <a href={casesURL} className={`subpage-link ${page == "cases" ? "active" : ""}`}>Cases</a>
            <a href={profileURL} className={`subpage-link ${page == "profile" ? "active" : ""}`}>Profile</a>
            <a href={editURL} className={`subpage-link ${page == "edit" ? "active" : ""}`}>Edit Profile</a>
          </div>
        </div>
      </div>
    )
  }
}