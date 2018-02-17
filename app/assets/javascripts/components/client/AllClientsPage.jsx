class AllClients extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      clients: [],
      filteredClients: [],
      searchInput: "",
    };
  }

  componentDidMount() {
    Requester.get('/api/clients').then((clients) => {
      this.setState({ clients });
      this.copyToFiltered(this.state.clients);
    });
  }

  onSearchChange = (event) => {
    var input = event.target.value;
    this.setState({ searchInput: input }, this.loadFilteredClients)
  }

  loadFilteredClients = () => {
    if (this.state.searchInput == "") {
      console.log(this.state.clients)
      this.copyToFiltered(this.state.clients);
      return;
    }

    filtered = [];
    for (var i = 0; i < this.state.clients.length; i++) {
      client = this.state.clients[i];
      var reg = new RegExp(this.state.searchInput, "i");
      if (reg.test(client.first_name) || reg.test(client.last_name) || reg.test(client.case_id)) {
        filtered.push(client);
      }
    }
    this.copyToFiltered(filtered);
  }

  copyToFiltered = (clients) => {
    filteredClients = [];
    for (var i = 0; i < clients.length; i++) {
      filteredClients.push(clients[i]);
    }
    this.setState({ filteredClients: filteredClients });
  }

  render() {
    let clientList;

    if (this.state.filteredClients.length != 0) {
      clientList = this.state.filteredClients.map((client, index) => {
        return <ClientRow client={client} key={index} />
      });
    } else {
      clientList = (
        <tr className="table-row">
          <td className="roster-loading" colSpan={6}>
            No Results
          </td>
        </tr>
     )
    }

    return (
      <div>
        <div className="page-bar">
          <div className="container">
            <div className="page-bar-title">All Clients</div>
            <div className="page-bar-left">
              <div className="button">
                <span className="fa fa-plus marginRight-xxs"></span>
                Create Client
              </div>
              <div className="input-container">
                <input type="text" className="input marginLeft-xxs"
                  onChange={this.onSearchChange}
                  placeholder="Search for a client" />
              </div>
            </div>
          </div>
        </div>

        <div className="container">
          <div className="all-clients-table-container">
            <table className="table">
              <thead className="table-header">
                <tr>
                  <th>Name</th>
                  <th>Case ID</th>
                  <th>Phone Number</th>
                  <th>Country</th>
                  <th>Address</th>
                </tr>
              </thead>
              <tbody>
                {clientList}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    );
  }
}
