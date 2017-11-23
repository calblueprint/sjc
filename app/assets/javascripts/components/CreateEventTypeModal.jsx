class CreateEventTypeModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      taskTemplates: [],
      eventTypeName: '',
    };
  }

  handleClose = () => {
    this.setState({ showModal: false });
  }

  handleOpen = () => {
    this.setState({ showModal: true });
  }

  handleChangeName = (evt) => {
    this.setState({ eventTypeName: evt.target.value });
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
      description: '',
      years: '',
      months: '',
      weeks: '',
      days: '',
      prior: false,
    });
    this.setState({ taskTemplates });
  }


  handleSubmit = () => {
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
    this.setState({ showModal: false });
  }

  render = () => {
    const { Modal, Button, Popover } = ReactBootstrap;
    const taskTemplateForms = this.state.taskTemplates.map((taskTemplate, i) => {
      return (
        <div key={i}>
          <hr/>
          Task {i}:
          <div>
            Description: <br/>
            <input
              type="text"
              value={taskTemplate.description}
              onChange={this.handleChangeDescription(i)}
            />
          </div>
          <div>
            Completion Time: <br/>
            <input
              type="text"
              value={taskTemplate.days}
              onChange={this.handleChangeTime(i)}
            />
          </div>
        </div>
      );
    })
    return (
      <div>
        <Button
          onClick={this.handleOpen}
        >
          Create Event Type
        </Button>

        <Modal bsSize="small"show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Create Event Type</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            Event Type Name: <br/>
            <input
              type="text"
              value={this.state.eventTypeName}
              onChange={this.handleChangeName}
            />
            { taskTemplateForms }
            <div>
              <Button
                onClick={this.handleAddTemplate}
              >
                +
              </Button>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Cancel</Button>
            <Button onClick={this.handleSubmit}> Create Event Type </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}