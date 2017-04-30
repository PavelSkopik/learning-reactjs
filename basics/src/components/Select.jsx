import React from 'react';

class Select extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            value: ""
        };

        this.handleItemChange = this.handleItemChange.bind(this);
    }

    handleItemChange(e) {
        this.setState({
            value: e.target.value
        });

        this.props.onItemChange(this.props.type, e.target.value);
    }

    render() {
        const type = this.props.type;
        const label = this.props.label;
        const selectItems = this.props.items.map((item) => {
            return <option key={item} id={item} value={item}>{item}</option>
        });

        return (
            <div className="form-group">
                <label htmlFor={type + "-language"}>{label}</label>
                <select className="form-control" id={type + "-language"} value={this.state.value} onChange={this.handleItemChange}>
                    <option></option>
                    {selectItems}
                </select>
            </div>
        );
    }

}
export default Select;