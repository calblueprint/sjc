
class AssignUser extends React.Component {

    constructor(props) {
        super();
        this.state = {selectedUser:null};
    }

    userSelected = (userId) => {
        this.setState({selectedUser:userId});
    }


    assignTask = () => {
        const payload = {
            "user_id": this.state.selectedUser,
            "task_id": this.props.taskId
        };

        Requester.post('/api/tasks/assign', payload).then((data) => {
            // Success.
        });
    }

    render() {

        const userArray = this.props.users.map(
            (user) => {
                return (
                    <ReactBootstrap.MenuItem key={user.id} eventKey={user.id}>
                        {user.first_name} {user.last_name}
                    </ReactBootstrap.MenuItem>
                )
            }
        );

        let buttonTitle = "Select a user";
        if (this.state.selectedUser != null) {
            buttonTitle = this.props.usersMap[this.state.selectedUser];
        }

        return (
            <div>
                <ReactBootstrap.DropdownButton
                    title={buttonTitle}
                    id={"task" + this.taskId + "Dropdown"}
                    onSelect={this.userSelected}>
                    {userArray}
                </ReactBootstrap.DropdownButton>
                <ReactBootstrap.Button onClick={this.assignTask}>Assign</ReactBootstrap.Button>
            </div>
        );
    }

}
