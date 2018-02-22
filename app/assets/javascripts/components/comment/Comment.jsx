/**
 * @prop comment
 */

class Comment extends React.Component {
    constructor(props) {
        super();
        this.state = {
          user: null,
          showComment: false
        }
    }

    componentDidMount() {
      Requester.get('/api/users/' + this.props.comment.user_id).then((data) => {
        this.setState({
            user: data,
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
            let deleteButton = (<span></span>);
            if (this.state.user.id == this.props.user.id) {
                deleteButton = (
                    <button 
                        className="button button--text-red button--sm button--delete float-right"
                        onClick={this._handleDelete}>
                        delete
                    </button>
                );
            }
            return (
                <div className="comment">
                    <div>
                        <a href={`/users/${this.state.user.id}`}>
                            <div className="comment-user-profile-image"></div>
                            <div className="comment-user-title">
                                <h4><strong>{this.state.user.first_name} {this.state.user.last_name}</strong></h4>
                            </div>
                        </a>
                        {deleteButton}
                    </div>
                    <Panel footer={this.props.comment.details}>
                        {this.props.comment.content}
                    </Panel>
                </div>
            );
        }
        return (<div></div>)
    }
}
