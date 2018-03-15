/**
* @prop user      - The currently logged in user
* @prop client_id - The ID of the client for this case
* @prop client    - The client object
*/

class CreateCase extends React.Component {
  constructor(props) {
    super();
    this._update = this._update.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.state = {
      case: {},
      showForm: true,
      message: '',
      error: ''
    };
  }

  _update = (name, val) => {
    this.setState({ [name] : val });
  }

  _handleChange = (e) => {
    this.setState({ [$(e.target).attr("name")] : $(e.target).val() });
  }

  _safeTrim = (val) => {
    if (val != undefined) {
      return val.trim()
    }
    return val
  }

  _fetchClient = () => {

  }

  _handleSubmit = (e) => {
    e.preventDefault();
    const payload = {
      case: {
        "user_id": this.props.user.id,
        "client_id": this.props.client_id,
        "type_of_case": this._safeTrim(this.state.type_of_case),
        "pro_bono_placement": this._safeTrim(this.state.pro_bono_placement),
        "grant": this._safeTrim(this.state.grant),
        "initial_invoice_date": this.state.initial_invoice_date,
        "last_invoice_date": this.state.last_invoice_date,
        "date_rec_initial_disbursement": this.state.date_rec_initial_disbursement,
        "date_rec_last_disbursement": this.state.date_rec_last_disbursement,
        "case_tracking": this._safeTrim(this.state.case_tracking),
        "program": this._safeTrim(this.state.program),
        "legal_case_name": this._safeTrim(this.state.legal_case_name),
        "judge_assigned": this._safeTrim(this.state.judge_assigned),
        "trial_attorney": this._safeTrim(this.state.trial_attorney),
        "case_progress": this._safeTrim(this.state.case_progress),
        "date_biometrics_done": this.state.date_biometrics_done,
        "lodge_or_rn_date": this.state.lodge_or_rn_date,
        "date_mta_filed": this.state.date_mta_filed,
        "asylum_officer": this._safeTrim(this.state.asylum_officer),
        "nexus_granted": this._safeTrim(this.state.nexus_granted),
        "nexus_argued": this._safeTrim(this.state.nexus_argued),
        "case_outcome": this._safeTrim(this.state.case_outcome),
        "case_outcome_achieved": this._safeTrim(this.state.case_outcome_achieved),
        "date_of_outcome": this.state.date_of_outcome
      }
    };

    Requester.post('/api/cases', payload).then((data) => {
      this.setState({
        "message": data.message,
        "error": data.error,
        "showForm": false
      });
      window.location.href = '/clients/' + this.props.client_id;
    });
    return false;
  }

  render() {
    if (!this.state.showForm) {
      if (!this.state.error) {
        return (
          <p>{this.state.message}</p>
        )
      } else {
        return (
          <p>{this.state.error}</p>
        )
      }
    }

    const { client } = this.props;
    clientURL = `/clients/${this.props.client_id}`;

    return (
      <div className="create-case-form card-bg">
        <h1 className="title">Create a Case</h1>
        <p className="client-name">For client: <a href={clientURL} className="link">
            {client.first_name} {client.last_name}</a>
        </p>
        <ReactBootstrap.Form onSubmit={this._handleSubmit}>
          <Input
              type="text"
              title="Legal Case Name"
              placeholder="Legal Case Name"
              name="legal_case_name"
              initData={null}
              update={this._update} />
          <div className="input-container">
            <label htmlFor="type_of_case" className="label label--newline">
              Type of Case:
            </label>
            <select
              className="select"
              name="type_of_case"
              id="type_of_case"
              onClick={this._handleChange} >
              <option value="0">Immigration Case</option>
              <option value="1">Criminal Case</option>
              <option value="2">Civil Rights</option>
          </select>
          </div>
          <Input
              type="text"
              title="Pro Bono Placement"
              placeholder="Pro Bono Placement"
              name="pro_bono_placement"
              initData={null}
              update={this._update} />
          <Input
              type="text"
              title="Grant"
              placeholder="Grant"
              name="grant"
              initData={null}
              update={this._update} />
          <Input
              type="date"
              title="Initial Invoice Date"
              name="initial_invoice_date"
              initData={null}
              update={this._update} />
          <Input
              type="date"
              title="Last Invoice Date"
              placeholder="Last Invoice Date"
              name="last_invoice_date"
              initData={null}
              update={this._update} />
          <Input
            type="date"
            title="Date Rec Initial Disbursement"
            name="date_rec_initial_disbursement"
            initData={null}
            update={this._update} />
          <Input
              type="text"
              title="Case Tracking"
              placeholder="Case Tracking"
              name="case_tracking"
              initData={null}
              update={this._update} />
          <Input
              type="text"
              title="Program"
              placeholder="Program"
              name="program"
              initData={null}
              update={this._update} />
          <Input
              type="text"
              title="Judge Assigned"
              placeholder="Judge Assigned"
              name="judge_assigned"
              initData={null}
              update={this._update} />
          <Input
              type="text"
              title="Trial Attorney"
              placeholder="Trial Attorney"
              name="trial_attorney"
              initData={null}
              update={this._update} />
          <Input
              type="text"
              title="Case Progress"
              placeholder="Case Progress"
              name="case_progress"
              initData={null}
              update={this._update} />
          <Input
              type="date"
              title="Date Biometrics Done"
              name="date_biometrics_done"
              initData={null}
              update={this._update} />
          <Input
              type="date"
              title="Lodge or RN Date"
              name="lodge_or_rn_date"
              initData={null}
              update={this._update} />
          <Input
              type="date"
              title="Date MTA Filed"
              name="date_mta_filed"
              initData={null}
              update={this._update} />
          <Input
              type="text"
              title="Asylum Officer"
              placeholder="Asylum Officer"
              name="asylum_officer"
              initData={null}
              update={this._update} />
          <Input
              type="text"
              title="Nexus Argued"
              placeholder="Nexus Argued"
              name="nexus_argued"
              initData={null}
              update={this._update} />
          <Input
              type="text"
              title="Nexus Granted"
              placeholder="Nexus Granted"
              name="nexus_granted"
              initData={null}
              update={this._update} />
          <Input
              type="text"
              title="Case Outcome"
              placeholder="Case Outcome"
              name="case_outcome"
              initData={null}
              update={this._update} />
          <Input
              type="text"
              title="Case Outcome Achieved"
              placeholder="Case Outcome Achieved"
              name="case_outcome_achieved"
              initData={null}
              update={this._update} />
          <Input
              type="date"
              title="Date of Outcome"
              name="date_of_outcome"
              initData={null}
              update={this._update} />
          <ReactBootstrap.Button
            className="button"
            onClick={this._handleSubmit}>
            Create Case
          </ReactBootstrap.Button>
        </ReactBootstrap.Form>
      </div>
    );
  }

}
