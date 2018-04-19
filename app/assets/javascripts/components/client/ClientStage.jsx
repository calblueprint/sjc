/**
 * @prop client - current client
 * @prop stage - current stage (represented by numerical value out of 6)
 */

class ClientStage extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      stage: this.props.stage
    };
  }

  handleForward = () => {
    const newStage = { stage: this.state.stage + 1 }
    Requester.update(`/api/clients/${this.props.client.id}`, newStage).then((data) => {
      this.setState({ stage: data.client.stage });
    })
  }

  handleBackward = () => {
    const newStage = { stage: this.state.stage - 1 }
    Requester.update(`/api/clients/${this.props.client.id}`, newStage).then((data) => {
      this.setState({ stage: data.client.stage});
    })
  }

  render () {
    const { Button } = ReactBootstrap;
    const { client } = this.props;
    const currStage = this.state.stage;
    const stages = ['Case Opening', 'Case Starting', 'Middle Phase',
                    'Litigation', 'Post-Litigation', 'Case Closing']

    const pipelines = stages.map((stage, i) => {
      return <Pipeline key={i} stage={stage} active={i === currStage - 1}/>
    });

    let forward = (<Button onClick={this.handleForward}>Next Stage</Button>)
    let backward = (<Button onClick={this.handleBackward}>Previous Stage</Button>)

    if (currStage == 6) {
      forward = (<Button disabled>Next Stage</Button>)
    }
    if (currStage == 1) {
      backward = (<Button disabled>Previous Stage</Button>)
    }

    return (
      <div>
        <h3>
          {showValue(client.first_name)} {showValue(client.last_name)} is currently at the {showValue(stages[currStage - 1])} stage
        </h3>
        <div className="pipeline">
          {showValue(pipelines)}
        </div>
        <div>
          {showValue(backward)}
          {showValue(forward)}
        </div>
      </div>
    )
  }

}
