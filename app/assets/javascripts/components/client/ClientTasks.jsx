
class ClientTasks extends React.Component {

    constructor(props) {
        super();
        this.state = {
            users: [],
            tasks: [],
            usersMap: {}
        }
    }

    componentDidMount() {
        Requester.get('/api/tasks/show?client_id=' + this.props.client.id).then((data) => {
            this.setState({tasks: data});
        });

        Requester.get('/api/users/show').then((data) => {
            this.setState({users: data});
            let userIdToName = {};
            data.forEach((user) => {
                userIdToName[user.id] = user.first_name + " " + user.last_name;
            });
            this.setState({usersMap:userIdToName});
        });
    }
    
    render() {
        const { PageHeader, ListGroup, ListGroupItem } = ReactBootstrap;
        const { client } = this.props;
        const fullAddress = `${client.street}, ${client.city}, ${client.state}, ${client.postal_code}`;
        const taskArray = this.state.tasks.map(
            (task) => {
                return (
                    <ListGroupItem key={task.id}>
                        <p>{task.description}</p>
                        <AssignUser taskId={task.id} users={this.state.users} usersMap={this.state.usersMap} />
                    </ListGroupItem>
                );
            }
        );

        return (
            <div>
                <PageHeader>
                    <div>{client.first_name} {client.last_name}</div>
                    <small>
                        <div> Case ID: {client.case_id} </div>
                        <div> Phone Number: {client.phone_number} </div>
                        <div> Country: {client.country} </div>
                        <div> Address: {fullAddress} </div>
                    </small>
                </PageHeader>
                <ListGroup>
                    {taskArray}
                </ListGroup>
                <CreateTask clientId={this.props.client.id} />
            </div>
        );
    }

}
