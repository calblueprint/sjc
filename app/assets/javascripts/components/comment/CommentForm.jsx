/**
 * @prop addComment - function to add more comments
 */

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      input: ""
    };
  }

  handleChange = (e) => {
    this.setState({
      input: e.target.value
    });
  }

  onClick = () => {
    this.props.addComment(this.state.input);
    this.setState({
      input: ""
    });
  }

  render() {
    const { FormGroup, FormControl, Button } = ReactBootstrap;
    return (
      <div className="comment-form">
        <FormGroup>
          <FormControl
            className="input input--fullwidth"
            componentClass="textarea"
            value={this.state.input}
            onChange={this.handleChange}
          />
        <Button
          className="button button--sm marginTop-xxs"
          bsClass="post-button btn"
          onClick={this.onClick}>
          Post Comment
        </Button>
        </FormGroup>
      </div>
    )
  }
}
