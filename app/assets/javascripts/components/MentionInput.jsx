
class MentionInput extends React.Component {

    constructor(props) {
      super();
      this.state = {
        users: [],
        originalUsers: [],
        idToUsers: {},
        showUsers: false,
        mentionedUsers: [],
        value: ''
      }
    }

    componentDidMount() {
      Requester.get(this.props.personRoute).then((data) => {
        this.setState({ users: data });
        this.setState({ originalUsers: Array.from(data) })
        let userIdToName = {};
        data.forEach((user) => {
            userIdToName[user.id] = user.first_name + " " + user.last_name;
        });
        this.setState({ idToUsers: userIdToName });
        if (!this.props.mention) {
          this.setState({mentionedUsers: [this.props.searchProps], value: userIdToName[this.props.searchProps]});
        }
      });
    }

    clearComment = () => {
      this.textInput.value = ''
    }

    filterUsersByName = (currentTypedUser) => {
      if (!!currentTypedUser) {
        this.setState({
          users: this.state.originalUsers.filter(
            (user) => (user.first_name + " " + user.last_name)
              .toLowerCase()
              .indexOf(currentTypedUser.toLowerCase()) >= 0
          )
        });
      } else {
        this.setState({
          users: this.state.originalUsers
        });
      }
    }

    userClicked = (evt) => {
      const cursor = this.textInput.selectionStart;
      const curr = this.textInput.value;
      const closestAt = curr.lastIndexOf('@', cursor);
      const currentTypedUser = curr.substring(closestAt + 1, cursor + 1);
      const clickedUser= this.state.idToUsers[evt.target.id];
      let value = '';
      if (!!currentTypedUser) {
        value = curr.substring(0, closestAt + 1) + clickedUser;
      }
      else {
        value = this.state.value + clickedUser;
      }
      const newMentioned = this.state.mentionedUsers.concat(evt.target.id);
      this.setState({
        mentionedUsers: newMentioned,
        showUsers: false,
        value: value,
        users: Array.from(this.state.originalUsers)
      });
    }

    handleKeyDown = (event) => {
      cursor = this.textInput.selectionStart;
      const closestAt = this.textInput.value.lastIndexOf('@', cursor);
      if (this.state.showUsers && event.keyCode == 8) {
        if (closestAt == this.textInput.value.length - 1) {
          this.setState({
            showUsers: false
          });
        } else {
          const currentTypedUser = this.textInput.value.slice(0, -1).substring(closestAt + 1, cursor);
          this.filterUsersByName(currentTypedUser)
        }
      }
    }

    handleKeyPress = (event) => {
      const curr = this.textInput.value + event.key;
      if (this.props.mention) {
        // Comment with mention
        cursor = this.textInput.selectionStart;
        const closestAt = curr.lastIndexOf('@', cursor);

        // if user types in '@'
        if (event.charCode == 64) {
          this.setState({
            showUsers: true,
            users: Array.from(this.state.originalUsers)
          });
        }

        if (this.state.showUsers) {
          if (closestAt != -1) {
            const currentTypedUser = curr.substring(closestAt + 1, cursor + 1);
            this.filterUsersByName(currentTypedUser)
          }
        }
      } else {
        // Search for user, no "@" required
        this.filterUsersByName(curr);
        this.setState({
          showUsers: true,
        });
      }
    }

    handleChange = (event) => {
      if (this.props.mention) {
        this.setState({
          value: event.target.value
        });
      } else {
        if (this.state.mentionedUsers.length >= 1) {
          if (event.target.value.length < this.state.value.length) {
            this.setState({
              value: "",
              showUsers: false,
              mentionedUsers: []
            });
          }
        } else {
          if (event.target.value.length === 0) {
            this.setState({
              showUsers: false
            });
          }
          this.setState({
            value: event.target.value
          });
        }
      }
    }

    getCleanedMentionedUsers() {
      let cleanedMentionedUsers = [];
      for (let id of this.state.mentionedUsers) {
        userName = this.state.idToUsers[id];
        if (this.textInput.value.indexOf(userName) >= 0) {
          cleanedMentionedUsers.push(id);
        }
      }
      return cleanedMentionedUsers
    }

    render() {
        const { FormGroup, FormControl, MenuItem, DropdownButton } = ReactBootstrap;

        let usersList;

        if (this.state.showUsers) {
          usersList = this.state.users.map(
            (user) => {
              return (
                <li className="mention-item" key={user.id} id={user.id} onClick={this.userClicked}>
                  {user.first_name + " " + user.last_name}
                </li>
              );
            }
          );
        }

        return (
          <div>
            <div className="mention-list">
              <ul>
                {usersList}
              </ul>
            </div>
            <textarea
              rows={this.props.inputRows}
              className="input input--fullwidth comment-input"
              ref={(input) => { this.textInput = input; }}
              onChange={this.handleChange}
              onKeyPress={this.handleKeyPress}
              onKeyDown={this.handleKeyDown}
              value={this.state.value}
              />
          </div>
        );
    }
}
