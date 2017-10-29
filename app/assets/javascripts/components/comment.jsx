/**
 * @prop comment
 */

class Comment extends React.Component {
  constructor(props) {
    super(props);
  }

  render() {
    return (
      <p>{this.props.comment.content}</p>
    );
  }
}

Comment.propTypes = {
  comment: React.PropTypes.object.isRequired
}
