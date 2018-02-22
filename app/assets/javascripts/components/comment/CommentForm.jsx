/**
 * @prop addComment - function to add more comments
 */

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      comment: ''
    };
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    });
  }

  render() {
    const { FormGroup, FormControl, Button } = ReactBootstrap;
    return (
      <div className="comment-form">
        <FormGroup>
          <MentionInput
            className="input input--fullwidth"
            ref={(node) => {_mention_input = node}}
            user={this.props.user}
            onChange={this.handleChange}
          />
        <Button
          className="button button--sm marginTop-xxs"
          bsClass="post-button btn"
          onClick={() => {
            this.props.addComment(_mention_input.state.value);
            _mention_input.state.value = ''
            _mention_input.textInput.value = ''
          }}>
          Post Comment
        </Button>
        </FormGroup>
      </div>
    )
  }
}
