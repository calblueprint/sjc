/**
 * @prop comment
 */

class Comment extends React.Component {
render() {
  const { Panel, Button } = ReactBootstrap;
  return (
    <div>
   {this.props.comment.user_name} {this.props.comment.created_at}
    <Panel style={{marginBottom: "0px", marginTop: "0px"}}>
      {this.props.comment.content}
    </Panel>
    </div>
  )
  };
}
