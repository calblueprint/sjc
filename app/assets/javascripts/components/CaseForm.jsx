/**
* @prop user - The currently logged in user.
*/

class CreateCase extends React.Component {
    constructor(props) {
        super();
        this._handleChange = this._handleChange.bind(this);
        this._handleSubmit = this._handleSubmit.bind(this);
        this.state = {
            case: {},
            showForm: true,
            message: '',
            error: ''
        };
    }

    caseEdited = (evt) => {
        this.setState();
    }

    createCase = () => {
        const payload = {
            case: {
                "user_id": this.props.user.id,
                "client_id": this.state.client_id,
                "type_of_case": this.state.type_of_case,
                "pro_bono_placement": this.state.pro_bono_placement,
                "grant": this.state.grant,
                "initial_invoice_date": this.state.initial_invoice_date,
                "last_invoice_date": this.state.last_invoice_date,
                "date_rec_initial_disbursement": this.state.date_rec_initial_disbursement,
                "date_rec_last_disbursement": this.state.date_rec_last_disbursement,
                "case_tracking": this.state.case_tracking,
                "program": this.state.program,
                "legal_case_name": this.state.legal_case_name,
                "judge_assigned": this.state.judge_assigned,
                "trial_attorney": this.state.trial_attorney,
                "case_progress": this.state.case_progress,
                "date_biometrics_done": this.state.date_biometrics_done,
                "lodge_or_rn_date": this.state.lodge_or_rn_date,
                "date_mta_filed": this.state.date_mta_filed,
                "asylum_officer": this.state.asylum_officer,
                "nexus_granted": this.state.nexus_granted,
                "nexus_argued": this.state.nexus_argued,
                "case_outcome": this.state.case_outcome,
                "case_outcome_achieved": this.state.case_outcome_achieved,
                "date_of_outcome": this.state.date_of_outcome
            }
        };

        Requester.post('/api/cases', payload).then((data) => {
            this.setState({
                "message": data.message,
                "error": data.error,
                "showForm": false
            });
        });

        return false;
    }

    render() {
        return (
            <div>
                <ReactBootstrap.Form onSubmit={this.createCase}>
                    Legal Case Name
                    <ReactBootstrap.FormControl type="text"
                            placeholder="Legal Case Name" />
                    <br />
                    Client Id
                    <ReactBootstrap.FormControl type="text"
                            placeholder="Legal Case Name"
                            name="client_id"
                            onChange={this._handleChange} />
                    <br />
                    Type of Case
                    <ReactBootstrap.FormControl type="text"
                            placeholder="Type of Case" />
                    <br />
                    Pro Bono Placement
                    <ReactBootstrap.FormControl type="text"
                            placeholder="Pro Bono Placement" />
                    <br />
                    Grant
                    <ReactBootstrap.FormControl type="text"
                            placeholder="Grant" />
                    <br />
                    Initial Invoice Date
                    <ReactBootstrap.FormControl type="date"
                            placeholder="Initial Invoice Date" />
                    <br />
                    Last Invoice Date
                    <ReactBootstrap.FormControl type="date"
                            placeholder="Last Invoice Date" />
                    <br />
                    Date Rec Initial Disbursement
                    <ReactBootstrap.FormControl type="date"
                            placeholder="Date Rec Initial Disbursement" />
                    <br />
                    Date Rec Last Disbursement
                    <ReactBootstrap.FormControl type="date"
                            placeholder="Date Rec Last Disbursement" />
                    <br />
                    Case Tracking
                    <ReactBootstrap.FormControl type="text"
                            placeholder="Case Tracking" />
                    <br />
                    Program
                    <ReactBootstrap.FormControl type="text"
                            placeholder="Program" />
                    <br />
                    Judge Assigned
                    <ReactBootstrap.FormControl type="text"
                            placeholder="Judge Assigned" />
                    <br />
                    Trial Attorney
                    <ReactBootstrap.FormControl type="text"
                            placeholder="Trial Attorney" />
                    <br />
                    Case Progress
                    <ReactBootstrap.FormControl type="text"
                            placeholder="Case Progress" />
                    <br />
                    Date Biometrics Done
                    <ReactBootstrap.FormControl type="text"
                            placeholder="Date Biometrics Done" />
                    <br />
                    Lodge or RN Date
                    <ReactBootstrap.FormControl type="date"
                            placeholder="Lodge or RN Date" />
                    <br />
                    Date MTA Filed
                    <ReactBootstrap.FormControl type="text"
                            placeholder="Date MTA Filed" />
                    <br />
                    Asylum Officer
                    <ReactBootstrap.FormControl type="text"
                            placeholder="Asylum Officer" />
                    <br />
                    Nexus Argued
                    <ReactBootstrap.FormControl type="text"
                            placeholder="Nexus Argued" />
                    <br />
                    Nexus Granted
                    <ReactBootstrap.FormControl type="text"
                            placeholder="Nexus Granted" />
                    <br />
                    Case Outcome
                    <ReactBootstrap.FormControl type="text"
                            placeholder="Case Outcome" />
                    <br />
                    Case Outcome Achieved
                    <ReactBootstrap.FormControl type="checkbox"
                            placeholder="Case Outcome Achieved" />
                    <br />
                    Date of Outcome
                    <ReactBootstrap.FormControl type="date"
                            placeholder="Date of Outcome" />
                    <br />
                    <ReactBootstrap.Button onClick={this.createCase}>Create</ReactBootstrap.Button>
                </ReactBootstrap.Form>
            </div>
        );
    }

}
