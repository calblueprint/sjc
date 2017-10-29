/**
 * @prop comments - comments associated with current client
 * @prop client - current client
 * @prop user - current user
 */

class ClientComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.comments
    };
  }

  addComment(val) {
    const newComment = {content: val,
                        client_id: this.props.client.id,
                        user_id: this.props.user.id}
    this.state.comments.push(newComment);
    this.setState({ comments: this.state.comments });
    Requester.post('/comments/client/${this.props.}', newComment)
  }

  render() {
    return (
      const clientComments = this.state.comments.map((comment, i) => {
        return <Comment key={comment.id} comment={comment}>
      })
      <ul>{clientComments}</ul>
      <CommentForm
        addComment={this.addComment.bind(this)}
        />
    );
  }
}

ClientComments.propTypes = {
  comments: React.PropTypes.array.isRequired,
  client: React.PropTypes.object.isRequired
}
