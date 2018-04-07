class SelectFile extends DefaultModal {

  constructor(props) {
    super();
    this.update = this.update.bind(this);
  }

  update = (name, value) => {
    this.setState({[name]: value});
  }

  submit = () => {
    if (this.state.url) {
      this.props.listener(this.state.url);
      this.closeModal();
    }
  }

  render() {
    return (
      <div className="new-task-component">
        <button onClick={this.openModal}
                className="button">
                New Document
        </button>

        <Modal show={this.state.showModal}
               onHide={this.closeModal}
               className="task-creation-modal">
          <Modal.Header>
            <h2 className="modal-title">Add New Document</h2>
          </Modal.Header>
          <Modal.Body>
            <form>
              <Input
                type="text"
                update={this.update}
                name="url"
                title="File Upload"
                placeholder="i-485-1-3.pdf"
              />
            </form>
          </Modal.Body>
          <Modal.Footer>
            <button type="button" className=""
                    onClick={this.closeModal}>Cancel</button>
            <button type="submit" name="submit" value="Create Location"
                    className="button" onClick={this.submit}>Create</button>
          </Modal.Footer>
        </Modal>
      </div>
    )
  }
}
