
class CreateTasks extends React.Component {

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

    createTask(textId) {
        const textInput = document.getElementById(textId);
        const desc = textInput.value;

        const payload = {
            "client_id": this.props.clientId,
            "description": desc
        };

        Requester.post('/api/tasks', payload).then((data) => {
            // TODO: Refresh component.
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
            <p>
                <input type="text" id="createTxt" placeholder="Task Name" /><button onClick={() => this.createTask("createTxt")}>Create</button>
            </p>
        </div>);
    }

}
