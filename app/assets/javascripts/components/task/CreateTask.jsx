
class CreateTask extends React.Component {

    constructor(props) {
        super();
        this.state = {taskDescription:null};
    }

    taskEdited = (evt) => {
        this.setState({taskDescription:evt.target.value});
    }

    createTask = () => {
        const payload = {
            "client_id": this.props.clientId,
            "description": this.state.taskDescription
        };

        Requester.post('/api/tasks', payload).then((data) => {
            // TODO: Refresh component.
        });

        return false;
    }

    render() {
        return (
            <div>
                <ReactBootstrap.Form inline onSubmit={this.createTask}>
                    <ReactBootstrap.FormGroup>
                        <ReactBootstrap.FormControl type="text" onChange={this.taskEdited}
                            placeholder="Task Name" />
                        <ReactBootstrap.Button onClick={this.createTask}>Create</ReactBootstrap.Button>
                    </ReactBootstrap.FormGroup>
                </ReactBootstrap.Form>
            </div>
        );
    }

}
