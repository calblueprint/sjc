
class EventTypeCreationForm extends DefaultModal {

  constructor(props) {
    super();
    this.state = {
      showModal: false,
      selectedEventType: '',
      eventName: '',
      eventLocation: '',
      startDateTime: '',
      endDateTime: '',
      clientId: '',
      taskTemplates: [],
      eventTypeName: ''
    };

    this.select = this.select.bind(this);
    this.update = this.update.bind(this);
  }

  select = (event) => {
    this.setState({[event.target.name]: event.target.value});
  }

  update = (name, value) => {
    this.setState({[name]: value});
  }

  handleChangeTitle = (i) => {
    return (evt) => {
      const taskTemplates = this.state.taskTemplates.slice();
      taskTemplates[i] = {...taskTemplates[i], title: evt.target.value};
      this.setState({ taskTemplates });
    }
  }

  handleChangeDescription = (i) => {
    return (evt) => {
      const taskTemplates = this.state.taskTemplates.slice();
      taskTemplates[i] = {...taskTemplates[i], description: evt.target.value};
      this.setState({ taskTemplates });
    }
  }

  handleChangeTime = (i) => {
    return (evt) => {
      const taskTemplates = this.state.taskTemplates.slice();
      taskTemplates[i] = {...taskTemplates[i], days: evt.target.value};
      this.setState({ taskTemplates });
    }
  }

  handleAddTemplate = () => {
    const taskTemplates = this.state.taskTemplates.slice();
    taskTemplates.push({
      title: '',
      description: '',
      years: '',
      months: '',
      weeks: '',
      days: '',
      prior: false,
    });
    this.setState({ taskTemplates });
  }

  submit = () => {
    const {
      eventTypeName,
      taskTemplates,
    } = this.state;

    const eventTypePayload = {
      name: eventTypeName,
      task_templates: taskTemplates,
    };

    Requester.post('/api/event_types', eventTypePayload).then((eventTypes) => {
      this.props.handleCreateEventType(eventTypes);
    });
    this.resetModal();
  }

  resetModal = () => {
    this.closeModal();
    this.setState({ taskTemplates: [] })
  }

  render() {
    const taskTemplateForms = this.state.taskTemplates.map((taskTemplate, i) => {
      return (
        <div key={i}>
          <hr/>
          Task {i}:
          <input
            type="text"
            className="input"
            onChange={this.handleChangeTitle(i)}
            value={taskTemplate.title}
          />
          <div>
            Description: <br/>
            <input
              className="input"
              type="text"
              value={taskTemplate.description}
              onChange={this.handleChangeDescription(i)}
            />
          </div>
          <div>
            Completion Time: <br/>
            <input
              type="number"
              min="0"
              value={taskTemplate.days}
              className="input"
              onChange={this.handleChangeTime(i)}
            />
          </div>
        </div>
      );
    })
    return (
      <div className="new-task-component">
        <button onClick={this.openModal}
                className="button">
                New Event Type
        </button>

        <Modal show={this.state.showModal}
               onHide={this.resetModal}
               className="task-creation-modal">
          <Modal.Header>
            <h2 className="modal-title">Add New Event Type</h2>
          </Modal.Header>
          <Modal.Body>
            <form>
              <Input
                type="text"
                update={this.update}
                name="eventTypeName"
                title="Event Type Name"
                placeholder="Client Onboarding"
              />
              { taskTemplateForms }
              <div>
              <a
                onClick={this.handleAddTemplate}
                className="button"
              >
                +
              </a>
            </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className=""
                    onClick={this.resetModal}>Cancel</button>
            <button type="submit" name="submit" value="Create Location"
                    className="button" onClick={this.submit}>Create</button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
