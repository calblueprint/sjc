/**
* @prop userId - id of currently logged in user
*/

class CaseList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            cases: [],
        };
    }

    componentDidMount() {
        Requester.get(`/api/users/${this.props.userId}/cases`).then((cases) => {
            this.setState({ cases });
        });
    }

  render() {
    const { ListGroup, ListGroupItem, Glyphicon } = ReactBootstrap;
    const caseList = this.state.cases.map((_case, index) => {
        return (
            <ListGroupItem key={index} bsClass={`list-group-item case-row`}>
                {_case.legal_case_name}
            </ListGroupItem>
        );
    });
    return (
        <div>
            <a href="/cases/new">
            <button className="button">New Case</button>
            </a>
            <ListGroup>
                { caseList }
            </ListGroup>
        </div>
    );
  }
}
