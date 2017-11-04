/**
 * @prop comment
 */

class Comment extends React.Component {
render() {
    return (
      <p>{this.props.comment.content}</p>
    );
  }
}
