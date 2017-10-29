/**
 * @prop comments - comments associated with current client
 * @prop client - current client
 * @prop user - current user
 */

class ClientComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: []
    };
  }

  componentDidMount() {
		Requester.get(`/api/comments/client/${this.props.client.id}`).then((comments) => {
			this.setState({ comments });
		});
	}

  addComment(val) {
    const newComment = {content: val,
                        client_id: this.props.client.id,
                        thread_id: 1,
                        user_id: this.props.user.id
                        }
    this.state.comments.push(newComment);
    this.setState({ comments: this.state.comments });
    Requester.post(`/api/comments`, newComment)
  }

  render() {
    const clientComments = this.state.comments.map((comment, i) =>
      <Comment key={comment.id} comment={comment}/>
    );
    return (
      <div>
        <ul>{clientComments}</ul>
        <CommentForm
          addComment={this.addComment.bind(this)}
          />
      </div>
    );
  }
}
