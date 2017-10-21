
class CreateTasks extends React.Component {

    constructor(props) {
        super();
        this.state = {
            users: [],
            tasks: []
        }
    }

    componentDidMount() {
        const tasksRequest = new XMLHttpRequest();
        tasksRequest.onreadystatechange = () => {
          if (tasksRequest.readyState == XMLHttpRequest.DONE) {
            if (tasksRequest.status == 200) {
                this.setState({tasks: JSON.parse(tasksRequest.responseText)});
            }
          }
        };
        tasksRequest.open('GET', '/api/tasks/show?client_id=' + this.props.clientId, true);
        tasksRequest.send();


        const usersRequest = new XMLHttpRequest();
        usersRequest.onreadystatechange = () => {
          if (usersRequest.readyState == XMLHttpRequest.DONE) {
            if (usersRequest.status == 200) {
                this.setState({users: JSON.parse(usersRequest.responseText)});
            }
          }
        };
        usersRequest.open('GET', '/api/users/show', true);
        usersRequest.send();
    }

    render() {
        const userArray = this.state.users.map(
            (user) => {
                return (
                    <option value='{user.id}'>{user.first_name} {user.last_name}</option>
                )
            }
        );

        // TODO: Make the assign button add a user to a task.
        const taskArray = this.state.tasks.map(
            (task) => {
                return (<div>
                    <p>{task.description}</p>
                    <p>
                        <select>
                            {userArray}
                        </select>
                        <button>Assign</button>
                        <ul>
                            <li>user 1</li>
                        </ul>
                    </p>
                </div>);
            }
        );
        return (<div>
            {taskArray}
        </div>);
    }

}
