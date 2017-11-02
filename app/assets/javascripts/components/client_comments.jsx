/**
 * @prop comments - comments associated with current client
 * @prop client - current client
 * @prop user - current user
 */

class ClientComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comments: this.props.comments,
      hasError: false
    };
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
    const { Alert, Button } = ReactBootstrap;
    const clientComments = this.state.comments.map((comment) =>
      <Comment key={comment.id} comment={comment}/>
    );
    let error = null;
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
