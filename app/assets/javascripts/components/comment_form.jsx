/**
 * @prop addComment - function to add more comments
 */

class CommentForm extends React.Component {
  render() {
    let input;
    return (
      <div>
        <MentionInput />
        <input ref={node => {
            input = node;
          }} />
        <button onClick={() => {
          this.props.addComment(input.value);
          input.value = '';
        }}>
          Post
        </button>
      </div>
    )
  }
}
