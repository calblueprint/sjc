/**
* @prop user - The currently logged in user.
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
                <ReactBootstrap.Form onSubmit={this._handleSubmit}>
                    <Input
                            type="text"
                            title="Legal Case Name"
                            placeholder="Legal Case Name"
                            name="legal_case_name"
                            initData={null}
                            update={this._update} />
                    <Input
                            type="text"
                            title="Client Id"
                            placeholder="Client Id"
                            name="client_id"
                            initData={null}
                            update={this._update} />
                    <Input
                            type="text"
                            title="Type of Case"
                            placeholder="Type of Case"
                            name="type_of_case"
                            initData={null}
                            update={this._update} />
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
                            type="text"
                            title="Initial Invoice Date"
                            placeholder="Initial Invoice Date"
                            name="initial_invoice_date"
                            initData={null}
                            update={this._update} />
                    <Input
                            type="text"
                            title="Last Invoice Date"
                            placeholder="Last Invoice Date"
                            name="last_invoice_date"
                            initData={null}
                            update={this._update} />
                    <Input
                            type="text"
                            title="Date Rec Initial Disbursement"
                            placeholder="Date Rec Initial Disbursement"
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
                            type="text"
                            title="Date Biometrics Done"
                            placeholder="Date Biometrics Done"
                            name="date_biometrics_done"
                            initData={null}
                            update={this._update} />
                    <Input
                            type="text"
                            title="Lodge or RN Date"
                            placeholder="Lodge or RN Date"
                            name="lodge_or_rn_date"
                            initData={null}
                            update={this._update} />
                    <Input
                            type="text"
                            title="Date MTA Filed"
                            placeholder="Date MTA Filed"
                            name="date_mta_filed"
                            initData={null}
                            update={this._update} />
                    <Input
                            type="text"
                            title="Date Biometrics Done"
                            placeholder="Date Biometrics Done"
                            name="date_biometrics_done"
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
                            type="text"
                            title="Date of Outcome"
                            placeholder="Date of Outcome"
                            name="date_of_outcome"
                            initData={null}
                            update={this._update} />
                    <ReactBootstrap.Button onClick={this._handleSubmit}>Create</ReactBootstrap.Button>
                </ReactBootstrap.Form>
            </div>
        );
    }

}
