class Documents extends React.Component {
  // Page with document upload and document index

  constructor(props) {
    super(props);
    this.modalListener = this.modalListener.bind(this);
  }

  modalListener = (fileURL) => {
    window.location = `/documents/new`;
  }

  render() {
    return (
      <div className="container">
        <div className="card-bg" style={{margin: 100, padding: 50}}>
          <SelectFile listener={this.modalListener}/>
        </div>
      </div>
    );
  }
}
