/**
 * @prop comments - comments associated with current client
 * @prop client - current client
 * @prop user - current user
 */

var Alert = ReactBootstrap.Alert;
var Button = ReactBootstrap.Button;

class ClientComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: [],
      hasError: false
    };
  }

  componentDidMount() {
		Requester.get(`/api/comments/client/${this.props.client.id}`).then((comments) => {
			this.setState({ comments });
		});
	}

  handleAlertDismiss() {
    this.setState({ hasError: false });
  };

  addComment(val) {
    const newComment = {content: val,
                        client_id: this.props.client.id,
                        thread_id: 1,
                        user_id: this.props.user.id
                        }

    Requester.post(`/api/comments`, newComment).then((data) => {
      this.setState({ comments: data.comments });
    }, (e) => {
      this.setState({ hasError: true });
    })
  }

  render() {
    const clientComments = this.state.comments.map((comment) =>
      <Comment key={comment.id} comment={comment}/>
    );
    var error = null;
    if (this.state.hasError) {
      error = (
        <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
          <h4>Error!</h4>
          <p>Unable to post comment.</p>
          <p>
            <Button onClick={this.handleAlertDismiss.bind(this)}>Dismiss</Button>
          </p>
        </Alert>
      )
    }
    return (
      <div>
        <ul>{clientComments}</ul>
        <CommentForm
          addComment={this.addComment.bind(this)}
          />
        {error}
      </div>
    );
  }
}
