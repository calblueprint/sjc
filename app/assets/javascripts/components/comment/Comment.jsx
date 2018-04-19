/**
 * @prop comment
 */

class Comment extends React.Component {
  constructor(props) {
    super();
    this.state = {
      user: null,
      avatar_url: null,
      showComment: false
    }
  }

  componentDidMount() {
    Requester.get('/api/users/' + this.props.comment.user_id).then((data) => {
    this.setState({
      user: data.user,
      avatar_url: data.avatar_url,
      showComment: true
    });
    });
  }

  _handleDelete = (e) => {
    e.preventDefault();
    Requester.delete('/api/comments/' + this.props.comment.id).then((data) => {
      this.setState({
        message: data.message,
        error: data.error,
        showComment: false
      });
    });
  }

  render() {
    const { Panel, Button } = ReactBootstrap;
    if (this.state.showComment) {
      let deleteButton = <span></span>;
      let avatarStyle = {
        backgroundImage: 'url(' + this.state.avatar_url + ')'
      }
      if (this.state.user.id == this.props.user.id) {
        deleteButton = (
          <button
            className="button button--text-red button--sm button--delete"
            onClick={this._handleDelete}>
            delete
          </button>
        );
      }
      return (
        <div className="comment delete--wrapper">
          <div>
            <a className="comment-header">
              <div
                className="comment-user-profile-image"
                style={avatarStyle}
              ></div>
              <h4 className="comment-user-title">
                {showValue(`${this.state.user.first_name} ${this.state.user.last_name}`)}
              </h4>
              {deleteButton}
            </a>
          </div>
          <Panel footer={this.props.comment.details}>
            {showValue(this.props.comment.content)}
          </Panel>
        </div>
      );
    }
    return <div></div>
  }
}
