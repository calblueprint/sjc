class Events extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      events: [],
      eventTypes: [],
    };
  }

  componentDidMount = () => {
    Requester.get('/api/events').then((events) => {
      this.setState({ events });
      Requester.get('/api/event_types').then((eventTypes) => {
        this.setState({ eventTypes });
      });
    });
  }

  handleCreateEvent = (events) => {
    this.setState({ events });
  }

  handleCreateEventType = (eventTypes) => {
    this.setState({ eventTypes });
  }

  render = () => {
    const { PageHeader, ListGroup, ListGroupItem } = ReactBootstrap;
    const eventList = this.state.events.map((event, index) => {
      const date = new Date(event.start_time);
      return (
        <ListGroupItem
          header={event.name} 
          key={index}
        >
          { date.toDateString() }
        </ListGroupItem>
      );
    });
    return (
      <div>
        <CreateEventModal
          eventTypes={this.state.eventTypes}
          handleCreateEvent={this.handleCreateEvent}
          userId={this.props.userId}
          clients={this.props.clients}
        />
        <CreateEventTypeModal
          eventTypes={this.state.eventTypes}
          handleCreateEventType={this.handleCreateEventType}
        />
        { eventList }
      </div>
    );
  }
}
