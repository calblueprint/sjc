
class EventCreationForm extends DefaultModal {

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

  handleChangeEventType = (evt) => {
    this.setState({ selectedEventType: evt.target.value });
  }

  submit = () => {
    let clientInput = parseInt(_client_input.getCleanedMentionedUsers()[0]);
    const {
      selectedEventType,
      eventName,
      eventLocation,
      startDateTime,
      endDateTime
    } = this.state;
    const payload = {
      event: {
        name: eventName,
        location: eventLocation,
        event_type_id: selectedEventType,
        start_time: startDateTime,
        end_time: endDateTime,
        user_id: this.props.userId
      },
      client_id: clientInput,
    }
    Requester.post('/api/events', payload).then((data) => {
      this.props.updateItems();
      this.closeModal();
    }).catch((data) => {
      console.error(data);
    });
  }

  render() {
    const defaultEventType = [<option value="" key={-1} disabled> Select an event type </option>]
    const eventTypeOptions = defaultEventType.concat(
      this.props.eventTypes.map((eventType, i) =>
        <option value={eventType.id} key={i}> {eventType.name} </option>
      )
    );
    return (
      <div className="new-event-component">
        <button onClick={this.openModal}
                className="button">
                <span className="fa fa-plus marginRight-xxs"></span>
                New Event
        </button>

        <Modal show={this.state.showModal}
               onHide={this.closeModal}
               className="event-creation-modal">
          <Modal.Header>
            <h2 className="modal-title">Add New Event</h2>
          </Modal.Header>
          <Modal.Body>
            <form>
              <div className="input-container">
                <label htmlFor="" className="label label--newline">Select event type</label>
                <select
                  value={this.state.selectedEventType}
                  onChange={this.handleChangeEventType}
                  className="input">
                  { eventTypeOptions }
                </select>
              </div>
              <Input
                type="text"
                update={this.update}
                name="eventName"
                title="Event Name"
                placeholder="Client Onboarding"
              />
              <Input
                type="text"
                update={this.update}
                name="eventLocation"
                title="Location"
                placeholder="123 Walnut St."
              />

              <div className="input-row">
                <Input
                  type="date"
                  update={this.update}
                  name="startDateTime"
                  title="Start Time"
                />
                <Input
                  type="date"
                  update={this.update}
                  name="endDateTime"
                  title="End Time"
                />
              </div>

              <div className="input-container">
                <label className="label">Client Name</label>
                <MentionInput
                  className="input input--fullwidth"
                  ref={(node) => {_client_input = node}}
                  user={this.props.user}
                  onChange={this.select}
                  personRoute='/api/clients/'
                  inputRows={1}
                  name="clientId"
                  mention={false}
                />
              </div>
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className="button button--text-alert"
                    onClick={this.closeModal}>Cancel</button>
            <button type="submit" name="submit" value="Create Location"
                    className="button marginLeft-xxs" onClick={this.submit}>Create</button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
