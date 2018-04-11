/**
* @prop user      - The currently logged in user
* @prop client_id - The ID of the client for this case
* @prop client    - The client object
*/

class CreateDocument extends React.Component {
  constructor(props) {
    super();
    this._update = this._update.bind(this);
    this._handleSubmit = this._handleSubmit.bind(this);
    this.state = {
      message: '',
      error: '',
      success: null,
      pdf: null,
      document: null
    };
  }

  _update = (name, val) => {
    this.setState({ [name] : val });
  }

  _handleChange = (e) => {
    this.setState({ [$(e.target).attr("name")] : $(e.target).val() });
  }

  _safeTrim = (val) => {
    if (val != undefined) {
      return val.trim()
    }
    return val
  }

  _fetchClient = () => {

  }

  _handlePDFChange = (e) => {
    let pdf = this._pdf.files[0];
    this.setState({
      pdf: pdf
    })
  }

  _handleSubmit = (e) => {
    e.preventDefault();
    let formData = new FormData();
    formData.append('document[case_id]', this.props.case_id);

    let { pdf } = this.state;
    if (pdf != undefined) {
      formData.append(
        'document[pdf]',
        pdf,
        pdf.name
      );
    }

    fetch('/api/documents', {
      method: 'POST',
      body: formData,
      credentials: 'same-origin',
      headers: {
        "X_CSRF-Token": document.getElementsByName("csrf-token")[0].content
      }
    }).then((data) => {
      this.setState({
        "message": data.message,
        "error": data.error,
        "success": 1,
        "document": data
      });

      this.props.updateDocuments();
      // window.location.href = '/clients/' + this.props.client_id;
    }).catch((data) => {
      this.setState({success: 0});
    });
    return false;
  }

  render() {
    let statusMessage = "";
    if (this.state.success != null) {
      if (this.state.success == 0) {
        statusMessage = (
          <h2>Failed to create document!</h2>
        );
      }
    }

    const { client } = this.props;
    clientURL = `/clients/${this.props.client_id}`;

    return (
      <ReactBootstrap.Form
        onSubmit={this._handleSubmit}
        encType="multipart/form-data">
          <input
            type="file"
            ref={_pdf => (this._pdf = _pdf)}
            title="PDF"
            accept="application/pdf"
            name="pdf"
            onChange={this._handlePDFChange} />
          {statusMessage}
        <ReactBootstrap.Button
          className="button"
          onClick={this._handleSubmit}>
          Add Document
        </ReactBootstrap.Button>
      </ReactBootstrap.Form>
    );
  }

}
