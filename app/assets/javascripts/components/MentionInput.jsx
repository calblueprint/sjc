
class MentionInput extends React.Component {

    constructor(props) {
        super();
        this.state = {
            users: [],
            usersMap: {},
            showUsers: false,
            mentionedUsers: [],
            value: ''
        }
    }

    componentDidMount() {
        Requester.get('/api/users/show').then((data) => {
            this.setState({users: data});
            let userIdToName = {};
            data.forEach((user) => {
                userIdToName[user.id] = user.first_name + " " + user.last_name;
            });
            this.setState({usersMap:userIdToName});
        });
    }
    
    userClicked(evt) {
        this.setState({
            mentionedUsers: this.state.mentionedUsers + [evt.target.id],
            showUsers: false,
            value: this.state.value + this.state.usersMap[evt.target.id]
        });
    }

    handleKeyPress(event) {
        if (event.charCode == 64) {
            this.setState({
                showUsers: true
            });
        } else {
            this.setState({
                showUsers: false
            });
        }
    }

    handleChange(event) {
        this.setState({
            value: event.target.value
        })
    }

    render() {
        const { FormGroup, FormControl, MenuItem, DropdownButton } = ReactBootstrap;

        let usersList = "";

        if (this.state.showUsers) {
            usersList = this.state.users.map(
                (user) => {
                    return (
                        <li key={user.id} id={user.id} onClick={this.userClicked.bind(this)}>
                            {user.first_name + " " + user.last_name}
                        </li>
                    );
                }
            );
        }

        return (
            <div>
                <FormGroup>
                    <FormControl 
                        onChange={this.handleChange.bind(this)} 
                        onKeyPress={this.handleKeyPress.bind(this)}
                        type="text"
                        value={this.state.value} />
                    <ul>
                        {usersList}
                    </ul>
                </FormGroup>
            </div>
        );
    }

}
