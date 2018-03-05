/**
 * This is a test component to demonstrate modal configuration
 */

class TaskCreationForm extends DefaultModal {

  constructor(props) {
    super();

    this.select = this.select.bind(this);
    this.update = this.update.bind(this);
  }


  select = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  update = (name, value) => {
    this.setState({[name]: value});
  }

  submit = () => {
    let clientInput = parseInt(_client_input.getCleanedMentionedUsers()[0]);
    let userInput = parseInt(_user_input.getCleanedMentionedUsers()[0]);
    const task_params = {
      client_id: clientInput,
      description: this.state.description,
      due_date: this.state.dueDate,
      title: this.state.name
    };
    const user_params = {
      user_id: userInput
    }
    const payload = {
      task: task_params,
      user: user_params
    }
    console.log(payload);
    Requester.post('/api/tasks', payload).then((data) => {
      this.closeModal();
    }).catch((data) => {
      console.error(data);
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
              <Input
                type="text"
                update={this.update}
                name="name"
                title="Task Name"
                placeholder="Client Onboarding"
              />
              <fieldset className="input-container name-container">
                <label>Description</label>
                <textarea
                  className='input'
                  placeholder="Fill out onboarding form and schedule court appearance."
                  name="description"
                  onChange={this.select} />
              </fieldset>
              <Input
                type="date"
                update={this.update}
                name="dueDate"
                title="Due Date"
              />
              <p>Client Name</p>
              <MentionInput
                className="input input--fullwidth"
                ref={(node) => {_client_input = node}}
                user={this.props.user}
                onChange={this.select}
                personRoute='/api/clients/'
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
                personRoute='/api/users/'
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
