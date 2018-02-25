/**
 * @prop threads - comments associated with current client
 * @prop client - current client
 * @prop user - current user
 */

class ClientComments extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      threads: this.props.threads,
      hasError: false
    };
  };

  handleAlertDismiss = () => {
    this.setState({ hasError: false });
  };

  addComment = (val) => {
    // Prevent people from posting empty comments
    if (val.trim()) {
      const newComment = {
        content: val,
        client_id: this.props.client.id,
        user_name: this.props.user.first_name.concat(' ' + this.props.user.last_name),
        user_id: this.props.user.id
      }

      Requester.post(`/api/comments`, newComment).then((data) => {
        let commentsCopy = Array.from(this.state.threads);
        commentsCopy.push([data.comment]);
        this.setState({
          threads: commentsCopy,
        });
      }, (e) => {
        this.setState({ hasError: true });
      })
    }
  }

  render() {
    const { Alert, Col } = ReactBootstrap;
    let clientThreads;

    if (this.state.threads.length == 0) {
      clientThreads = <div>No comments yet.</div>
    } else {
      clientThreads = this.state.threads.map((thread, i) =>
        <CommentThread key={i} comments={thread} client={this.props.client} user={this.props.user} />
      );
    }
    let error = null;
    if (this.state.hasError) {
      error = (
        <Alert bsStyle="danger" onDismiss={this.handleAlertDismiss}>
          <h4>Error!</h4>
          <p>Unable to post comment.</p>
          <p>
            <Button onClick={this.handleAlertDismiss}>Dismiss</Button>
          </p>
        </Alert>
      )
    }
    return (
      <div className="clients-page-comments-container card-bg">
        <h2 className="title">Comments</h2>
        <div className="comment-container">
          <div className="comment-thread-container">
            {clientThreads}
          </div>
        </div>
        <CommentForm addComment={this.addComment} />
        {error}
      </div>
    );
  }
}
