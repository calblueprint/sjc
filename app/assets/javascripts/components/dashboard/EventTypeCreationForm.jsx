
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

  handleAddTemplate = (e) => {
    e.preventDefault();
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
      const taskNum = i + 1;
      return (
        <div key={i}>
          <hr/>
          <div className="input-container">
            <label className="label">Task {taskNum} Name</label>
            <input
              type="text"
              className="input"
              onChange={this.handleChangeTitle(i)}
              value={taskTemplate.title}
            />
          </div>
          <div className="input-container">
            <label className="label">Description</label>
            <input
              className="input"
              type="text"
              value={taskTemplate.description}
              onChange={this.handleChangeDescription(i)}
            />
          </div>
          <div className="input-container">
            <label className="label">Completion Time</label>
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
      <div className="event-type-component">
        <button onClick={this.openModal}
                className="button button--outline">
                New Event Type
        </button>

        <Modal show={this.state.showModal}
               onHide={this.resetModal}
               className="event-type-creation-modal">
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
              <button onClick={this.handleAddTemplate}
                className="button button--outline marginTop-sm">
                <span className="fa fa-plus marginRight-xxs"></span>
                Add Task
              </button>
            </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="button button--text-alert"
                    onClick={this.resetModal}>Cancel</button>
            <button type="submit" name="submit" value="Create Location"
                    className="button marginLeft-xxs" onClick={this.submit}>Create</button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
