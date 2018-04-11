class TaskEditForm extends DefaultModal {

  constructor(props) {
    super();

    this.select = this.select.bind(this);
    this.update = this.update.bind(this);

    this.state = {
      description: "",
      title: "",
      dueDate: "",
      initialClientID: null,
      initialAttorneyID: null
    }
  }

  componentDidMount() {
    Requester.get(`/api/tasks/${this.props.id}/get`).then((info) => {
      this.setState({
        description: info.task.description,
        title: info.task.title,
        dueDate: info.task.due_date.substring(0, 10),
        initialClientID: info.task.client_id,
        initialAttorneyID: info.user
      });
    });
  }

  componentWillReceiveProps(nextProps) {
    if (this.props != nextProps) {
      Requester.get(`/api/tasks/${nextProps.id}/get`).then((info) => {
        this.setState({
          description: info.task.description,
          title: info.task.title,
          dueDate: info.task.due_date.substring(0, 10),
          initialClientID: info.task.client_id,
          initialAttorneyID: info.user
        });
      });
    }
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
    const payload = {
      client_id: clientInput,
      description: this.state.description,
      due_date: this.state.dueDate,
      title: this.state.title,
      user_id: userInput,
      task_id: this.props.id,
      current_user_id: this.props.currentUser
    }

    Requester.update(this.props.updateRoute, payload).then((data) => {
      this.props.listener(data);
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
                Edit Task
        </button>

        <Modal show={this.state.showModal}
               onHide={this.closeModal}
               className="task-creation-modal">
          <Modal.Header>
            <h2 className="modal-title">Edit Task</h2>
          </Modal.Header>
          <Modal.Body>
            <form>
              <Input
                type="text"
                update={this.update}
                name="title"
                title="Task Name"
                initData={this.state.title}
              />
              <fieldset className="input-container name-container">
                <label>Description</label>
                <textarea
                  className='input'
                  value={this.state.description}
                  name="description"
                  onChange={this.select} />
              </fieldset>
              <Input
                type="date"
                update={this.update}
                name="dueDate"
                title="Due Date"
                initData={this.state.dueDate}
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
                searchProps={this.state.initialClientID}
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
                searchProps={this.state.initialAttorneyID}
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className=""
                    onClick={this.closeModal}>Cancel</button>
            <button type="submit" name="submit" value="Create Location"
                    className="button" onClick={this.submit}>Save</button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
