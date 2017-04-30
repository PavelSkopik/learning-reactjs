import React from 'react';

class Input extends React.Component {

    constructor(props) {
        super(props);

        this.state = {value: ""};

        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleTextChange(e) {
        this.setState({
            value: e.target.value
        });

        this.props.onChange(e.target.value);
    }

    render() {
        return (
            <div className="form-group">
                <label htmlFor={this.props.id}>{this.props.label}</label>
                <input type={this.props.type}
                       className="form-control"
                       id={this.props.id}
                       placeholder={this.props.placeHolder}
                       onKeyUp={this.handleTextChange}></input>
            </div>
        );
    }
}

export default Input;