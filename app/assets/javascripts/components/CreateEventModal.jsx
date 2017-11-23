class CreateEventModal extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showModal: false,
      selectedEventType: '',
      eventName: '',
      eventLocation: '',
      startDateTime: '',
      endDateTime: '',
      clientId: '',
    };
  }

  handleClose = () => {
    this.setState({ showModal: false });
  }

  handleOpen = () => {
    this.setState({ showModal: true });
  }

  handleChangeEventType = (evt) => {
    this.setState({ selectedEventType: evt.target.value });
  }

  handleChangeEventName = (evt) => {
    this.setState({ eventName: evt.target.value });
  }

  handleChangeEventLocation = (evt) => {
    this.setState({ eventLocation: evt.target.value });
  }

  handleChangeEventStart = (evt) => {
    this.setState({ startDateTime: evt.target.value });
  }

  handleChangeEventEnd = (evt) => {
    this.setState({ endDateTime: evt.target.value });
  }

  handleChangeClient = (evt) => {
    this.setState({ clientId: evt.target.value });
  }

  handleSubmit = () => {
    const {
      selectedEventType,
      eventName,
      location,
      startDateTime,
      endDateTime,
      clientId,
    } = this.state;

    const eventPayload = {
      name: eventName,
      eventLocation: location,
      event_type_id: selectedEventType,
      start_time: startDateTime,
      end_time: endDateTime,
      user_id: this.props.userId,
      client_id: clientId,
    };
    Requester.post('/api/events', eventPayload).then((events) => {
      this.props.handleCreateEvent(events);
    });
    this.setState({ showModal: false });
  }

  render = () => {
    const { Modal, Button } = ReactBootstrap;
    const defaultEventType = [<option value="" key={-1} disabled> Select an event type </option>]
    const eventTypeOptions = defaultEventType.concat(
      this.props.eventTypes.map((eventType, i) =>
        <option value={eventType.id} key={i}> {eventType.name} </option>
      )
    );

    const defaultClientSelect = [<option value="" key={-1} disabled> Select a client </option>]
    const clientOptions = defaultClientSelect.concat(
      this.props.clients.map((client, i) =>
        <option value={client.id} key={i}> {`${client.first_name} ${client.last_name}`} </option>
      )
    );

    return (
      <div>
        <Button
          onClick={this.handleOpen}
        >
          Schedule Event
        </Button>

        <Modal show={this.state.showModal} onHide={this.handleClose}>
          <Modal.Header closeButton>
            <Modal.Title>Schedule Event</Modal.Title>
          </Modal.Header>
          <Modal.Body>
            <div>
              Select event type: <br/>
              <select value={this.state.selectedEventType} onChange={this.handleChangeEventType}>
                { eventTypeOptions }
              </select>
              
            </div>
            <div>
              Event Name: <br/>
              <input type="text" value={this.state.eventName} onChange={this.handleChangeEventName} />
            </div>
            <div>
              Location: <br/>
              <input type="text" value={this.state.eventLocation} onChange={this.handleChangeEventLocation} />
            </div>
            <div>
              Start: <br/>
              <input type="datetime-local" value={this.state.startDateTime} onChange={this.handleChangeEventStart}/>
            </div>
            <div>
              End: <br/>
              <input type="datetime-local" value={this.state.endDateTime} onChange={this.handleChangeEventEnd}/>
            </div>
            <div>
              Client: <br/>
              <select value={this.state.clientId} onChange={this.handleChangeClient}>
                { clientOptions }
              </select>
            </div>
          </Modal.Body>
          <Modal.Footer>
            <Button onClick={this.handleClose}>Cancel</Button>
            <Button onClick={this.handleSubmit}> Create Event </Button>
          </Modal.Footer>
        </Modal>
      </div>
    );
  }
}