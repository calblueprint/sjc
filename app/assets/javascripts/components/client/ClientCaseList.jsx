class ClientCaseList extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      caseList: [],
      loading: true,
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
        loading: false,
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
    } else if (this.state.loading) {
      caseList = (
        <div className="case-list-empty card-bg">
          Loading...
        </div>
      )
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
    super(props);
  }

  formatEnum = (str) => {
    return str.replace("_", " ").replace(/\b\w/g, l => l.toUpperCase());
  }

  getProgressInt = (str) => {
    progresses = ["opening", "starting", "middle", "litigation", "post_litigation", "closing"];
    return progresses.indexOf(str) + 1;
  }

  render() {
    const c = this.props.case;
    const caseUrl = `/clients/${c.client_id}/cases/${c.id}`;
    const progress = this.getProgressInt(c.case_progress);
    const progressBarWidth = 100 / 6 * (progress - 1) + '%';

    return (
      <a href={caseUrl} className="case-container-link">
        <div className='card-bg case-container'>
          <div className="case-container-content">
            <div>
              <h3 className='case-title'>{c.legal_case_name}</h3>
              <p className='case-type'>{`${this.formatEnum(c.type_of_case)} Case`}</p>
            </div>
            <p className='case-progress'>
              <span>{progress} - </span>
              {`${this.formatEnum(c.case_progress)} Phase`}
            </p>
          </div>
          <div className="case-container-progress-bar">
            <div className="bar" style={{width: progressBarWidth}}></div>
          </div>
        </div>
      </a>
    )
  }
}
