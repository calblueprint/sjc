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
    const createCaseLink = `/cases/new?client_id=${client.id}`;

    if (this.state.caseList.length != 0) {
      caseList = this.state.caseList.map((c, index) => {
        return <CaseListItem case={c} key={index} />
      });
    } else {
      caseList = (
        <div className="case-list-empty card-bg">
          <span className="fa fa-exclamation-circle marginRight-xxs"></span>
          No cases for {clientName}. Click <a href={createCaseLink}
            className="link link--underline">here</a> to create a case.
        </div>
      )
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
          <h3 className='case-title'>{showValue(c.legal_case_name)}</h3>
          <p className='case-type'>{showValue(caseType)}</p>
          <p className='case-progress'>{showValue(c.case_progress)}</p>
        </div>
      </a>
    )
  }
}
