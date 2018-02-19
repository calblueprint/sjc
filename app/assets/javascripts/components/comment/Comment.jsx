/**
 * @prop comment
 */

class Comment extends React.Component {
render() {
  const { Panel, Button } = ReactBootstrap;
  return (
    <div>
      <Panel footer={this.props.comment.details} >
        {this.props.comment.content}
      </Panel>
    </div>
  )
  };
}
