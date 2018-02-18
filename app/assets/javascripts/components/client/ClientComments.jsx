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
    const newComment = {
      content: val,
      client_id: this.props.client.id,
      user_id: this.props.user.id,
      user_name: this.props.user.first_name.concat(' ' + this.props.user.last_name)
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

  render() {
    const { Alert, Col } = ReactBootstrap;
    const clientThreads = this.state.threads.map((thread, i) =>
      <CommentThread key={i} comments={thread} client={this.props.client} user={this.props.user} />
    );
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
      <div>
        <Col sm={7}>
        {clientThreads}
        <CommentForm
          addComment={this.addComment}
          />
        {error}
        </Col>
      </div>
    );
  }
}
