import React from 'react';

class TextArea extends React.Component {

    constructor(props) {
        super(props);
        this.state = {value: ""}
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.id}>Translated text</label>
                <textarea className="form-control"
                          id={this.props.id}
                          value={this.props.value}
                          readOnly={this.props.readOnly}></textarea>
            </div>
        );
    }

}

export default TextArea;