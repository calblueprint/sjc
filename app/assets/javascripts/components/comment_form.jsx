/**
 * @prop addComment - function to add more comments
 */

class CommentForm extends React.Component {
  constructor(props) {
    super(props);
    this.addComment = this.props.addComment
  }

  render() {
    let input;
    return (
      <div>
        <input ref={node => {
            input = node;
          }} />
        <button onClick={() => {
          addComment(input.value);
          input.value = '';
        }}>
          Post
        </button>
      </div>
    )
  }
}
