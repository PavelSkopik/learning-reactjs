import React from 'react';

class Select extends React.Component {

    constructor(props) {
        super(props);

        this.handleSelectChange = this.handleSelectChange.bind(this);
    }

    handleSelectChange(e){

    }

    render() {
        const type = this.props.type;
        const label = this.props.label;

        return (
            <div className="form-group">
                <label htmlFor={type + "-language"}>{label}</label>
                <select className="form-control" id={type + "-language"}>
                    <option></option>
                </select>
            </div>
        );
    }

}

export default Select;