
class ViewCase extends React.Component {

  constructor(props) {
    super();
    this.state = {
      user: {
        id: "N/A"
      },
      client: {
        id: "N/A"
      },
      pdfs: []
    }
  }

  componentDidMount() {
    Requester.get('/api/users/' + this.props._case.user_id).then((data) => {
      this.setState({user: data});
    });

    Requester.get('/api/clients/' + this.props._case.client_id).then((data) => {
      this.setState({client: data});
    });

    this.updateDocuments()
  }

  updateDocuments = () => {
    Requester.get(`/api/cases/${this.props._case.id}/documents/`).then((data) => {
      this.setState({pdfs: data});
    });
  }

  removePDF = (pdf) => {
    var pdfs = this.state.pdfs;
    var index = pdfs.indexOf(pdf)
    pdfs.splice(index, 1);
    this.setState({pdfs: pdfs });
  }

  _handleDelete = (e, pdf) => {
    e.preventDefault();
    Requester.delete('/api/documents/' + pdf.document_id).then((data) => {
      this.removePDF(pdf)
    });
  }

  getCaseType = (type) => {
    const types = [
      'Immigration Case',
      'Criminal Case',
      'Civil Rights Case',
    ]

    return types[mapTypeOfCaseToInt(type)];
  }

  render() {
    const { _case, _pdf_url, comments, currentUser, client } = this.props;

    const caseType = this.getCaseType(_case.type_of_case);

    let pdf_view = <span>No PDF</span>;
    if (_pdf_url && _pdf_url != '/images/default_pdf.png') {
      pdf_view = <a href={_pdf_url} target="_blank">View PDF</a>
    }

    let pdfs = this.state.pdfs.map((pdf) =>
      <div className="delete--wrapper">
        <a href={pdf.link} target="_blank">{pdf.name}</a>
        <button
          className="button button--text-red button--sm button--delete"
          onClick={(e) => this._handleDelete(e, pdf)}>
          delete
        </button>
      </div>
    );

    return (
      <div className="clients-page">
        <ClientPageHeader client={client} page={"cases"} />

        <div className="container">
          <div className="clients-page-main-container client-case-page card-bg">
            <a href={`/clients/${client.id}`} className="link back-link">
              <span className="fa fa-angle-left marginRight-xxs"></span>
              back to All Cases
            </a>
            <a href={`/cases/${_case.id}/edit`} className="button pull-right">
              Edit Case
            </a>

            <h2 className="case-title">Case Name: {showValue(_case.legal_case_name)}</h2>
            <div> User: {showValue(`${this.state.user.first_name} ${this.state.user.last_name}`)}</div>
            <div> Client ID: {showValue(_case.client_id)} </div>
            <div> Client: {showValue(`${this.state.client.first_name} ${showValue(this.state.client.last_name)}`)}</div>
            <div> Type of Case: {showValue(caseType)} </div>
            <div> Pro Bono Placement: {showValue(_case.pro_bono_placement)} </div>
            <div> Grant: {showValue(_case.grant)} </div>
            <div> Initial Invoice Date: {showValue(_case.initial_invoice_date)} </div>
            <div> Last Invoice Date: {showValue(_case.last_invoice_date)} </div>
            <div> Date Rec Initial Disbursement: {showValue(_case.date_rec_initial_disbursement)} </div>
            <div> Date Rec Last Disbursement: {showValue(_case.date_rec_last_disbursement)} </div>
            <div> Case Tracking: {showValue(_case.case_tracking)} </div>
            <div> Program: {showValue(_case.program)} </div>
            <div> Legal Case Name: {showValue(_case.legal_case_name)} </div>
            <div> Judge Assigned: {showValue(_case.judge_assigned)} </div>
            <div> Trial Attorney: {showValue(_case.trial_attorney)} </div>
            <div> Case Progress: {showValue(_case.case_progress)} </div>
            <div> Date Biometrics Done: {showValue(_case.date_biometrics_done)} </div>
            <div> Lodge Or RN Date: {showValue(_case.lodge_or_rn_date)} </div>
            <div> Date MTA Filed: {showValue(_case.date_mta_filed)} </div>
            <div> Asylum Officer: {showValue(_case.asylum_officer)} </div>
            <div> Nexus Granted: {showValue(_case.nexus_granted)} </div>
            <div> Nexus Argued: {showValue(_case.nexus_argued)} </div>
            <div> Case Outcome: {showValue(_case.case_outcome)} </div>
            <div> Case Outcome Achieved: {showValue(_case.case_outcome_achieved)} </div>
            <div> Date of Outcome: {showValue(_case.date_of_outcome)} </div>
            {pdfs}
            <CreateDocument
              updateDocuments={this.updateDocuments}
              case_id={_case.id}
              client_id={client.id} />
          </div>
          <ClientComments threads={comments} client={client} user={currentUser} />
        </div>
      </div>
    );
  }
}
