class CreateCase extends React.Component {
    constructor(props) {
        super();
        this.state = {};
    }

    caseEdited = (evt) => {
        this.setState();
    }

    createCase = () => {
        const payload = {
        };

        Requester.post('/api/cases', payload).then((data) => {
            // TODO: Refresh component.
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
