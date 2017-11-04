
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
        Requester.get('/api/tasks/show?client_id=' + this.props.clientId).then((data) => {
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
        const taskArray = this.state.tasks.map(
            (task) => {
                return (<div key={task.id}>
                    <p>{task.description}</p>
                    <AssignUser taskId={task.id} users={this.state.users} usersMap={this.state.usersMap} />
                </div>);
            }
        );

        // TODO: Make create task into separate component.
        return (<div>
            {taskArray}
            <CreateTask clientId={this.props.clientId} />
        </div>);
    }

}
