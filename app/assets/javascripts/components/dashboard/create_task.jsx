/**
 * This is a test component to demonstrate modal configuration
 */

class TaskCreationForm extends DefaultModal {

  constructor(props) {
    super();
  }

  InputField({ id, label, help, ...props }) {
    const { Checkbox, Radio, FormGroup, ControlLabel, FormControl, Button, HelpBlock, TextArea } = ReactBootstrap;
    return (
      <FormGroup controlId={id} onChange={this.select}>
        <ControlLabel>{label}</ControlLabel>
        <br/>
        <FormControl {...props} />
        {help && <HelpBlock>{help}</HelpBlock>}
      </FormGroup>
    );
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
            <form>
              <this.InputField
                id="formControlsText"
                type="text"
                label="Task Name"
                name="name"
                placeholder="Finish Case Doc"
              />
              <this.InputField
                id="formControlsTextArea"
                componentClass="textarea"
                label="Description"
                name="description"
                placeholder="Suspendisse vitae leo ut odio tempus blandit. Quisque varius urna et tellus consequat. eget henderit dolor scelerisque."
              />
              <this.InputField
                id="formControlsDate"
                type="date"
                label="Due Date"
                name="dueDate"
              />
            </form>
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
