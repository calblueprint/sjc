
class ViewCase extends React.Component {

    constructor(props) {
        super();
        this.state = {
            user: {
                id: "N/A"
            },
            client: {
                id: "N/A"
            }
        }
    }

    componentDidMount() {
        Requester.get('/api/users/' + this.props._case.user_id).then((data) => {
            this.setState({user: data});
        });

        Requester.get('/api/clients/' + this.props._case.client_id).then((data) => {
            this.setState({client: data});
        });
    }
    
    render() {
        const { PageHeader, ListGroup, ListGroupItem } = ReactBootstrap;
        const { _case } = this.props;

        return (
            <div>
                <PageHeader>
                    <div>Case Name: {_case.legal_case_name}</div>
                    <small>
                        <div> Case ID: {_case.id} </div>
                        <div> User ID: {_case.user_id} </div>
                        <div> User: {this.state.user.first_name} {this.state.user.last_name}</div>
                        <div> Client ID: {_case.client_id} </div>
                        <div> Client: {this.state.client.first_name} {this.state.client.last_name}</div>
                    </small>
                </PageHeader>
                <div> Type of Case: {_case.type_of_case} </div>
                <div> Pro Bono Placement: {_case.pro_bono_placement} </div>
                <div> Grant: {_case.grant} </div>
                <div> Initial Invoice Date: {_case.initial_invoice_date} </div>
                <div> Last Invoice Date: {_case.last_invoice_date} </div>
                <div> Date Rec Initial Disbursement: {_case.date_rec_initial_disbursement} </div>
                <div> Date Rec Last Disbursement: {_case.date_rec_last_disbursement} </div>
                <div> Case Tracking: {_case.case_tracking} </div>
                <div> Program: {_case.program} </div>
                <div> Legal Case Name: {_case.legal_case_name} </div>
                <div> Judge Assigned: {_case.judge_assigned} </div>
                <div> Trial Attorney: {_case.trial_attorney} </div>
                <div> Case Progress: {_case.case_progress} </div>
                <div> Date Biometrics Done: {_case.date_biometrics_done} </div>
                <div> Lodge Or RN Date: {_case.lodge_or_rn_date} </div>
                <div> Date MTA Filed: {_case.date_mta_filed} </div>
                <div> Asylum Officer: {_case.asylum_officer} </div>
                <div> Nexus Granted: {_case.nexus_granted} </div>
                <div> Nexus Argued: {_case.nexus_argued} </div>
                <div> Case Outcome: {_case.case_outcome} </div>
                <div> Case Outcome Achieved: {_case.case_outcome_achieved} </div>
                <div> Date of Outcome: {_case.date_of_outcome} </div>
            </div>
        );
    }
}