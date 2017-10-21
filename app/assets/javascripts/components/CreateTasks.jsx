
class CreateTasks extends React.Component {

    constructor(props) {
        super();
        this.state = {
            users: [],
            tasks: []
        }
    }

    componentDidMount() {
        Requester.get('/api/tasks/show?client_id=' + this.props.clientId).then((data) => {
            this.setState({tasks: data});
        });

        Requester.get('/api/users/show').then((data) => {
            this.setState({users: data});
        });
    }

    assignTask(taskId, selectId) {
        select = document.getElementById(selectId);
        userId = select.value;

        payload = {
            "user_id": userId,
            "task_id": taskId,
            "token": this._getToken()
        };

        Requester.post('/api/tasks/assign', payload).then((data) => {
            // Success.
        });
    }

    createTask(textId) {
        textInput = document.getElementById(textId);
        desc = textInput.value;

        payload = {
            "client_id": this.props.clientId,
            "description": desc,
            "token": this._getToken()
        };

        Requester.post('/api/tasks', payload).then((data) => {
            // TODO: Refresh component.
        });
    }

    _getToken() {
        var token = document.getElementsByName("csrf-token")[0].getAttribute("content");
        return token;
    }

    render() {
        const userArray = this.state.users.map(
            (user) => {
                return (
                    <option key={user.id} value={user.id}>{user.first_name} {user.last_name}</option>
                )
            }
        );

        // TODO: Make the assign button add a user to a task.
        const taskArray = this.state.tasks.map(
            (task) => {
                return (<div key={task.id}>
                    <p>{task.description}</p>
                    <p>
                        <select id={"user" + task.id}>
                            {userArray}
                        </select>
                        <button onClick={() => this.assignTask(task.id, "user" + task.id)}>Assign</button>
                    </p>
                </div>);
            }
        );
        return (<div>
            {taskArray}
            <p>
                <input type="text" id="createTxt" placeholder="Task Name" /><button onClick={() => this.createTask("createTxt")}>Create</button>
            </p>
        </div>);
    }

}
