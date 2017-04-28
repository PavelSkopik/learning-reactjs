import React from 'react';
import './../assets/css/TranslationForm.css';
import Select from './../components/Select'


class TranslationForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
    }

    handleSubmit(e) {
        e.preventDefault();
        this.props.sendIt();
    }

    handleTextChange(e) {
        this.props.onTextChange(e.target.value);
    }

    render() {
        return (
            <div className="row" id="translation-app">
                <div className="col-sm-5 col-md-5 col-lg-4 col-md-offset-3 col-lg-offset-2">
                    <form className="form">

                        <div className="form-group">
                            <label htmlFor="text-to-translate">Text to translate</label>
                            <input type="text" className="form-control" id="text-to-translate"
                                   placeholder="Enter text to translate" value={this.props.settings.text}
                                   onChange={this.handleTextChange}></input>
                        </div>

                        <Select label="From" type="source"/>

                        <Select label="To" type="target"/>

                        <button className="btn btn-default" id="translate-btn" onClick={this.handleSubmit}>Translate
                        </button>
                    </form>
                </div>

                <div className="col-sm-4 col-md-4 col-lg-3">
                    <form className="form">
                        <div className="form-group">
                            <label htmlFor="source-language">Translated text</label>
                            <textarea className="form-control" id="translated-text"></textarea>
                        </div>
                    </form>

                    <div>

                    </div>
                </div>

                <div className="col-sm-5 col-md-5 col-lg-4 col-md-offset-3 col-lg-offset-2">

                </div>
            </div>
        );
    }

}

export default TranslationForm;