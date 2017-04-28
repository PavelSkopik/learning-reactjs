import React from 'react';
import './../assets/css/TranslationForm.css';
import TokenService from './../data/AzureTokenService'


class TranslationForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    render() {
        return (
            <div className="row" id="translation-app">
                <div className="col-sm-5 col-md-5 col-lg-4 col-md-offset-3 col-lg-offset-2">
                    <form className="form">

                        <div className="form-group">
                            <label htmlFor="text-to-translate">Text to translate</label>
                            <input type="text" className="form-control" id="text-to-translate"
                                   placeholder="Enter text to translate"></input>
                        </div>

                        <div className="form-group">
                            <label htmlFor="source-language">From</label>
                            <select className="form-control" id="source-language">
                                <option></option>
                            </select>
                        </div>

                        <div className="form-group">
                            <label htmlFor="target-language">To</label>
                            <select className="form-control" id="target-language">
                                <option></option>
                            </select>
                        </div>

                        <button className="btn btn-default" id="translate-btn" disabled>Translate</button>
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