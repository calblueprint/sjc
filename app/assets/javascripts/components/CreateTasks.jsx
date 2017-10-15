// import React from 'react'
// import ReactDOM from 'react-dom'
// import PropTypes from 'prop-types'

class CreateTasks extends React.Component {

    constructor(props) {
        super();
        this.state = {tasks: []}
    }

    componentDidMount() {
        const httpRequest = new XMLHttpRequest();
        httpRequest.onreadystatechange = () => {
          if (httpRequest.readyState == XMLHttpRequest.DONE) {
            if (httpRequest.status == 200) {
                this.setState({tasks: JSON.parse(httpRequest.responseText)});
            }
          }
        };
        httpRequest.open('GET', '/api/tasks/show?client_id=' + this.props.clientId, true);
        httpRequest.send();
    }

    render() {
        const taskArray = this.state.tasks.map(
            (task) => {
                return (<div>
                    <p>{task.description}</p>
                </div>);
            }
        );
        return (<div>
            {taskArray}
        </div>);
    }

}

/*
propTypes = {
  clientId: PropTypes.integer
}
*/

// export default CreateTasks