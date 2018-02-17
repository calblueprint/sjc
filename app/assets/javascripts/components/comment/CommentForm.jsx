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
    })
  }

  render() {
    const { FormGroup, FormControl, Button } = ReactBootstrap;
    return (
      <div>
        <FormGroup>
          <FormControl 
            componentClass="textarea"
            value={this.state.input}
            onChange={this.handleChange}
          />
        <Button 
          bsClass="post-button btn" 
          onClick={() => {
          this.props.addComment(this.state.input);
          this.setState({input: ""});
        }}>
          Post
        </Button>
        </FormGroup>     
      </div>
    )
  }
}

