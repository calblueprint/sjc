class ClientCaseList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      caseList: [],
    }
  }

  componentDidMount = () => {
    this.fetchCases();
  }

  fetchCases = () => {
    const clientId = this.props.client.id;

    Requester.get(`/api/clients/${clientId}/cases`).then((data) => {
      this.setState({
        caseList: data,
      });
    });
  }

  render() {
    let caseList;
    const { client } = this.props;
    const clientName = `${client.first_name} ${client.last_name}`;

    if (this.state.caseList) {
      caseList = this.state.caseList.map((c, index) => {
        return <CaseListItem case={c} key={index} />
      });
    } else {
      caseList = <div>No cases for {clientName}. </div>
    }

    return <div>{caseList}</div>
  }
}



class CaseListItem extends React.Component {

  constructor(props) {
    super(props)
  }

  getCaseType = (type_index) => {
    const types = [
      'Immigration Case',
      'Criminal Case',
      'Civil Rights Case',
    ]

    return types[type_index];
  }

  render() {
    const c = this.props.case;
    const caseType = this.getCaseType(c.type_of_case);
    const caseUrl = `/clients/${c.client_id}/cases/${c.id}`

    return (
      <a href={caseUrl} className="case-container-link">
        <div className='card-bg case-container'>
          <h3 className='case-title'>{c.legal_case_name}</h3>
          <p className='case-type'>{caseType}</p>
          <p className='case-progress'>{c.case_progress}</p>
          hello
        </div>
      </a>
    )
  }
}