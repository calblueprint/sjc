/**
 * This is a test component to demonstrate modal configuration
 */

class TaskCreationForm extends DefaultModal {

	constructor(props) {
		super();
		this.state = {
			// showModal: false,
		}
	}

  print = () => {
  	console.log("The modal is closing")
  	this.closeModal();
  }

  render() {
	  return (
			<div className="new-task-component">
	      <button onClick={this.openModal}
	      				className="button">
	      				New Task
				</button>

	      <Modal show={this.state.showModal}
	      			 onHide={this.closeModal}
	      			 className="task-creation-modal">
          <Modal.Header>
            <h2 className="modal-title">Add New Task</h2>
          </Modal.Header>
          <Modal.Body>
           	<div>Modal Body</div>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className=""
                    onClick={this.closeModal}>Cancel</button>
            <button type="submit" name="submit" value="Create Location"
                    className="button" onClick={this.print}>Create</button>
          </Modal.Footer>
        </Modal>
			</div>
		)
  }
}