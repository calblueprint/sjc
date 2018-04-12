/**
 * @prop
 */
class EventListItem extends React.Component {

  constructor(props) {
    super(props);
    this.state = {

    }
  }

  render() {
    const { event, isActive } = this.props;
    let eventActiveStatus = isActive ? "active" : "";

    return (
      <div className={`task-item ${eventActiveStatus}`}
        onClick={(e) => {this.props.selectEvent(event, e) }}>
        <p>{event.name}</p>
      </div>
    )
  }
}
