class DocumentCreationForm extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      fields: [],
      componentDidMount: false,
      clientColumns: [],
    }
  }

  componentDidMount() {
    Requester.get('/documents/fields').then((fields_json) => {
      let fields_unwrapped = fields_json.map((field) => {
        return (
          field.attributes
        );
      });
      this.setState({fields: fields_unwrapped, componentDidMount: true});
    });
    Requester.get('/clients/attributes').then((fields) => {
      this.setState({clientColumns: fields});
    });
  }

  renderOptions() {
    return this.state.clientColumns.map((name, id) => {
      return(
        <option value={id}>{name}</option>
      );
    })
  }

  renderFields() {
    return this.state.fields.map((field) => {
      console.log(field);
      if (field.FieldName != null) {
        return (
          <tr>
            <td style={{padding: 10}}>
              <h1>{field.FieldName}</h1>
              <h1>{field.FieldType}</h1>
              { field.FieldType === "Button"
                  ? <h1>{field.FieldStateOption}</h1>
                  : <div></div>
              }
            </td>
            <td style={{padding: 10}}>
              <select>
                {this.renderOptions()}
              </select>
            </td>
          </tr>
        );
      }
    })
  }

  render() {
    if (this.state.componentDidMount) {
      return (
        <div className="container">
          <div className="card-bg" style={{margin: 100, padding: 50}}>
            <table>
              {this.renderFields()}
            </table>
          </div>
        </div>
      );
    } else {
      return (
        <div />
      )
    }
  }
}
