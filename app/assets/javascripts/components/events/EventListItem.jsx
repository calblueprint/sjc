class EventListItem extends React.Component {

  constructor(props) {
    super(props);
  }

  render() {
    const { event, isActive } = this.props;
    let eventActiveStatus = isActive ? "active" : "";
    const startTimeStr = moment(event.start_time).format("M/DD/YYYY");
    const startTimePast = moment(event.start_time).isBefore(moment(), "day");

    return (
      <div className={`task-item ${eventActiveStatus}`}
        onClick={(e) => {this.props.selectEvent(event, e) }}>
        <div>
          <p className="title">{showValue(event.name)}</p>
          <p className="client">Event Type: {showValue(this.props.eventType)}</p>
        </div>
        <div className={`due-date ${startTimePast ? "past" : ""}`}>{showValue(startTimeStr)}</div>
      </div>
    )
  }
}
