/**
 * @prop comments - comments associated with current thread
 * @prop client - current client
 * @prop user - current user
 */

class CommentThread extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      showReply: false,
      hasError: false,
      comments: this.props.comments,
    };
  };

  handleAlertDismiss = () => {
    this.setState({ hasError: false });
  };

  handleClick = () => {
    this.setState({ showReply: !this.state.showReply });
  }

  addComment = (val) => {
    const parent_id = this.props.comments[0].thread_id;
    const newComment = {
      content: val,
      client_id: this.props.client.id,
      thread_id: parent_id,
      user_id: this.props.user.id,
      user_name: this.props.user.first_name.concat(' ' + this.props.user.last_name),
    }


    Requester.post(`/api/comments`, newComment).then((data) => {
      let commentsCopy = Array.from(this.state.comments);
      commentsCopy.push(data.comment);
      this.setState({
        comments: commentsCopy,
      });
    }, (e) => {
      this.setState({ hasError: true });
    })

  }

  render() {
    const { Alert } = ReactBootstrap;
    const comments = this.state.comments;
    const firstComment = comments[0];
    var clientComments = null;
    if (comments.length > 1) {
      let replies = comments.slice(1, comments.length);
      clientComments = replies.map((comment) =>
        <div className="comment-reply"><Comment key={comment.id} comment={comment} /></div>
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

    const { showReply } = this.state;
    let replyBtnText = showReply ? "Cancel Reply" : "Reply";
    let replyBtnStyle = showReply ? "button--text-alert" : "button--text-green";

    return (
      <div>
        {firstComment && <Comment key={firstComment.id} comment={firstComment} />}
        {clientComments && clientComments}
        <button onClick={this.handleClick} className={`${replyBtnStyle} button--sm`}>
          { replyBtnText }
        </button>
        {this.state.showReply && <div className="reply-textbox"><CommentForm addComment={this.addComment} /></div>}
        {error}
      </div>
    );
  }
}
