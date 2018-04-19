/**
* @prop user      - The currently logged in user
* @prop client_id - The ID of the client for this case
* @prop client    - The client object
*/

class EditCase extends React.Component {
  constructor(props) {
    super();
    this._update = this._update.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.state = {
      _case: {},
      type_of_case: 0,
      success: null,
    };
  }

  componentDidMount() {
    Requester.get('/api/cases/' + this.props._case.id).then((data) => {
      this.setState({_case: data});
    });
  }

  _update = (name, val) => {
    const _case = this.state._case;
    _case[name] = val;
    this.setState({
      _case: _case
    });
  }

  _handleChange = (e) => {
    const _case = this.state._case;
    _case[$(e.target).attr("name")] = $(e.target).val();
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    let _case = this.state._case;
    const payload = {
      case: {
        legal_case_name: safeTrim(_case.legal_case_name),
        case_outcome: safeTrim(_case.case_outcome),
        case_outcome_achieved: safeTrim(_case.case_outcome_achieved),
        case_progress: safeTrim(_case.case_progress),
        case_supervisor_id: safeTrim(_case.case_supervisor_id),
        case_tracking: safeTrim(_case.case_tracking),
        client_id: safeTrim(_case.client_id),
        date_biometrics_done: safeTrim(_case.date_biometrics_done),
        date_mta_filed: safeTrim(_case.date_mta_filed),
        date_of_outcome: safeTrim(_case.date_of_outcome),
        date_rec_initial_disbursement: safeTrim(_case.date_rec_initial_disbursement),
        date_rec_last_disbursement: safeTrim(_case.date_rec_last_disbursement),
        grant: safeTrim(_case.grant),
        id: safeTrim(_case.id),
        initial_invoice_date: safeTrim(_case.initial_invoice_date),
        judge_assigned: safeTrim(_case.judge_assigned),
        last_invoice_date: safeTrim(_case.last_invoice_date),
        lodge_or_rn_date: safeTrim(_case.lodge_or_rn_date),
        nexus_argued: safeTrim(_case.nexus_argued),
        nexus_granted: safeTrim(_case.nexus_granted),
        pro_bono_placement: safeTrim(_case.pro_bono_placement),
        program: safeTrim(_case.program),
        trial_attorney: safeTrim(_case.trial_attorney),
        type_of_case: parseInt(_case.type_of_case),
        user_id: safeTrim(_case.user_id)
      }
    };

    Requester.update('/api/cases/' + this.state._case.id, payload).then((data) => {
      this.setState({
        "message": data.message,
        "error": data.error,
      });
    });

    window.location = '/clients/' + this.state._case.client_id +  '/cases/' + this.state._case.id;

    return false;
  }

  render() {

    const { _case, client, comments, user } = this.props;

    let statusMessage = "";
    if (this.state.success != null) {
      if (this.state.success == 0) {
        statusMessage = (
          <h2>Failed to create case!</h2>
        );
      }
    }

    return (
      <div className="clients-page">
        <div className="container">
          <div className="clients-page-main-container client-profile card-bg">
            <div className="marginTop-md profile-edit-header">
              <h2 className="title">Editing Case</h2>
              <div className="button-container">
                <a className="button marginRight-xxs"
                  onClick={this._handleSubmit}>
                  Save Changes
                </a>
                <a href={`/clients/${this.state._case.client_id}/cases/${this.state._case.id}`} className="button button--text-alert">
                  Cancel
                </a>
              </div>
            </div>
            <Input
              type="text"
              title="Legal Case Name"
              placeholder="Legal Case Name"
              name="legal_case_name"
              initData={_case.legal_case_name}
              update={this._update} />
          <div className="input-container">
            <label htmlFor="type_of_case" className="label label--newline">
              Type of Case:
            </label>
            <select
              className="select"
              name="type_of_case"
              id="type_of_case"
              onChange={this._handleChange}
              defaultValue={mapTypeOfCaseToInt(_case.type_of_case)} >
              <option value={0}>Immigration Case</option>
              <option value={1}>Criminal Case</option>
              <option value={2}>Civil Rights</option>
          </select>
          </div>
          <Input
              type="text"
              title="Pro Bono Placement"
              placeholder="Pro Bono Placement"
              name="pro_bono_placement"
              initData={_case.pro_bono_placement}
              update={this._update} />
          <Input
              type="text"
              title="Grant"
              placeholder="Grant"
              name="grant"
              initData={_case.grant}
              update={this._update} />
          <Input
              type="date"
              title="Initial Invoice Date"
              name="initial_invoice_date"
              initData={_case.initial_invoice_date}
              update={this._update} />
          <Input
              type="date"
              title="Last Invoice Date"
              placeholder="Last Invoice Date"
              name="last_invoice_date"
              initData={_case.last_invoice_date}
              update={this._update} />
          <Input
            type="date"
            title="Date Rec Initial Disbursement"
            name="date_rec_initial_disbursement"
            initData={_case.date_rec_initial_disbursement}
            update={this._update} />
          <Input
              type="text"
              title="Case Tracking"
              placeholder="Case Tracking"
              name="case_tracking"
              initData={_case.case_tracking}
              update={this._update} />
          <Input
              type="text"
              title="Program"
              placeholder="Program"
              name="program"
              initData={_case.program}
              update={this._update} />
          <Input
              type="text"
              title="Judge Assigned"
              placeholder="Judge Assigned"
              name="judge_assigned"
              initData={_case.judge_assigned}
              update={this._update} />
          <Input
              type="text"
              title="Trial Attorney"
              placeholder="Trial Attorney"
              name="trial_attorney"
              initData={_case.trial_attorney}
              update={this._update} />
          <Input
              type="date"
              title="Date Biometrics Done"
              name="date_biometrics_done"
              initData={_case.date_biometrics_done}
              update={this._update} />
          <Input
              type="date"
              title="Lodge or RN Date"
              name="lodge_or_rn_date"
              initData={_case.lodge_or_rn_date}
              update={this._update} />
          <Input
              type="date"
              title="Date MTA Filed"
              name="date_mta_filed"
              initData={_case.date_mta_filed}
              update={this._update} />
          <Input
              type="text"
              title="Asylum Officer"
              placeholder="Asylum Officer"
              name="asylum_officer"
              initData={_case.asylum_officer}
              update={this._update} />
          <Input
              type="text"
              title="Nexus Argued"
              placeholder="Nexus Argued"
              name="nexus_argued"
              initData={_case.nexus_argued}
              update={this._update} />
          <Input
              type="text"
              title="Nexus Granted"
              placeholder="Nexus Granted"
              name="nexus_granted"
              initData={_case.nexus_granted}
              update={this._update} />
          <Input
              type="text"
              title="Case Outcome"
              placeholder="Case Outcome"
              name="case_outcome"
              initData={_case.case_outcome}
              update={this._update} />
          <Input
              type="text"
              title="Case Outcome Achieved"
              placeholder="Case Outcome Achieved"
              name="case_outcome_achieved"
              initData={_case.case_outcome_achieved}
              update={this._update} />
          <Input
              type="date"
              title="Date of Outcome"
              name="date_of_outcome"
              initData={_case.date_of_outcome}
              update={this._update} />
          </div>
          <ClientComments threads={comments} client={client} user={user} />
        </div>
      </div>
    );
  }

}
