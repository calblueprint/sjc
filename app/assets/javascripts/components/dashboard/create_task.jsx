/**
 * This is a test component to demonstrate modal configuration
 */

class TaskCreationForm extends DefaultModal {

  constructor(props) {
    super();
    this.state = {
    };
    this.select = this.select.bind(this);
    this.InputField = this.InputField.bind(this);
  }

  InputField({ id, label, help, ...props }) {
    const { Checkbox, Radio, FormGroup, ControlLabel, FormControl, Button, HelpBlock, TextArea } = ReactBootstrap;
    return (
      <FormGroup controlId={id} onChange={this.select}>
        <ControlLabel>{label}</ControlLabel>
        <br/>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
  }

  select = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  submit = () => {
    let clientInput = parseInt(_client_input.getCleanedMentionedUsers()[0]);
    let userInput = parseInt(_user_input.getCleanedMentionedUsers()[0]);
    const payload = {
      client_id: clientInput,
      user_id: userInput,
      description: this.state.description,
      due_date: this.state.dueDate,
      title: this.state.name
    };
    Requester.post('/api/tasks', payload).then((data) => {
      this.closeModal();
    }).catch((data) => {
      // Error message
    });
  }

  render() {
    return (
      <div className="new-task-component">
        <button onClick={this.openModal}
                className="button">
                New Task
        </button>

        <Modal show={this.state.showModal}
               onHide={this.closeModal}
               className="task-creation-modal">
          <Modal.Header>
            <h2 className="modal-title">Add New Task</h2>
          </Modal.Header>
          <Modal.Body>
            <form>
              <this.InputField
                id="formControlsText"
                type="text"
                label="Task Name"
                name="name"
                placeholder="Finish Case Doc"
              />
              <this.InputField
                id="formControlsTextArea"
                componentClass="textarea"
                label="Description"
                name="description"
                placeholder="Suspendisse vitae leo ut odio tempus blandit. Quisque varius urna et tellus consequat. eget henderit dolor scelerisque."
              />
              <this.InputField
                id="formControlsDate"
                type="date"
                label="Due Date"
                name="dueDate"
              />
              <p>Client Name</p>
              <MentionInput
                className="input input--fullwidth"
                ref={(node) => {_client_input = node}}
                user={this.props.user}
                onChange={this.select}
                personType='/api/clients/'
                inputRows={1}
                name="client"
                mention={false}
              />
              <p>Assign To</p>
              <MentionInput
                className="input input--fullwidth"
                ref={(node) => {_user_input = node}}
                user={this.props.user}
                onChange={this.select}
                personType='/api/users/'
                inputRows={1}
                name="user"
                mention={false}
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className=""
                    onClick={this.closeModal}>Cancel</button>
            <button type="submit" name="submit" value="Create Location"
                    className="button" onClick={this.submit}>Create</button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
