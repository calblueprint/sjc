
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
      Requester.get('/api/users/show').then((data) => {
        this.setState({ users: data });
        this.setState({ originalUsers: Array.from(data) })
        let userIdToName = {};
        data.forEach((user) => {
            userIdToName[user.id] = user.first_name + " " + user.last_name;
        });
        this.setState({ idToUsers: userIdToName });
      });
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

    handleKeyPress = (event) => {
      cursor = this.textInput.selectionStart;
        if (event.charCode == 64) {
          this.setState({
            showUsers: true,
            users: Array.from(this.state.originalUsers)
          });
        } 
        if (this.state.showUsers) {
          const curr = this.textInput.value + event.key;
        //  console.log(curr)
          const closestAt = curr.lastIndexOf('@', cursor);
         // console.log(closestAt)
          if (closestAt != 1) {
            const currentTypedUser = curr.substring(closestAt + 1, cursor + 1);
            console.log("t user"+ currentTypedUser)
            if (!!currentTypedUser) {    
              this.setState({
                users: this.state.originalUsers.filter( (user) => (user.first_name + " " + user.last_name).toLowerCase().indexOf(currentTypedUser.toLowerCase()) >= 0)
              });
            }
          }
        }
    }

    handleChange = (event) => {
      this.setState({
        value: event.target.value
      });
    }

    handleSubmit = () => {
      let cleanedMentionedUsers = [];
      for (let id of this.state.mentionedUsers) {
        userName = this.state.idToUsers[id];
        if (this.textInput.value.indexOf(userName) >= 0) {
          cleanedMentionedUsers.push(id);
        }
      }
      //send notifications to the user Ids in cleanedMentionedUsers
    }

    render() {
        const { FormGroup, FormControl, MenuItem, DropdownButton } = ReactBootstrap;

        let usersList = "";

        if (this.state.showUsers) {
          usersList = this.state.users.map(
            (user) => {
              return (
                <li key={user.id} id={user.id} onClick={this.userClicked}>
                  {user.first_name + " " + user.last_name}
                </li>
              );
            }
          );
        }

        return (
          <div>
            <input
              ref={(input) => { this.textInput = input; }}
              onChange={this.handleChange} 
              onKeyPress={this.handleKeyPress}
              type="text"
              value={this.state.value} 
              />

            <ul>
              {usersList}
            </ul>
          </div>
        );
    }

}
