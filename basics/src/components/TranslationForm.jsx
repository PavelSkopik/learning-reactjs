import React from 'react';
import './../assets/css/TranslationForm.css';
import Select from './../components/Select'
import Input from './../components/Input'
import TranslationService from './../data/TranslationService';
import TextArea from './../components/TextArea';


class TranslationForm extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            languageCodes: [],
            text: "",
            from: "",
            to: "",
            translatedText: ""
        };

        this.translationService = new TranslationService();

        this.handleSubmit = this.handleSubmit.bind(this);
        this.handleTextChange = this.handleTextChange.bind(this);
        this.handleItemChange = this.handleItemChange.bind(this);
    }

    componentDidMount() {
        this.translationService.getSupportedLanguages().then(response => {
            this.setState(prevState => ({
                languageCodes: response
            }));

            this.props.onLoadingChange(false);
        });
    }

    handleSubmit(e) {
        e.preventDefault();
        this.translationService.translate(this.state.text, this.state.from, this.state.to).then(response => {
            this.setState({
                translatedText: response
            });
        });
    }

    handleTextChange(value) {
        this.setState({
            text: value
        })
    }

    handleItemChange(type, value) {
        if (type === "source") {
            this.setState({
                from: value
            });
        }

        if (type === "target") {
            this.setState({
                to: value
            });
        }
    }

    render() {
        return (
            <div className="row" id="translation-app">
                <div className="col-sm-5 col-md-5 col-lg-4 col-md-offset-3 col-lg-offset-2">
                    <form className="form" onSubmit={this.handleSubmit}>

                        <Input label="Text to translate"
                               type="text"
                               id="text-to-translate"
                               placeHolder="Enter text to translate"
                               onChange={this.handleTextChange}/>

                        <Select label="From"
                                type="source"
                                items={this.state.languageCodes}
                                onItemChange={this.handleItemChange}/>

                        <Select label="To"
                                type="target"
                                items={this.state.languageCodes}
                                onItemChange={this.handleItemChange}/>

                        <button className="btn btn-default" id="translate-btn" type="submit">Translate
                        </button>
                    </form>
                </div>

                <div className="col-sm-4 col-md-4 col-lg-3">
                    <form className="form">
                        <TextArea label="Translated text"
                                  id="translated-text"
                                  value={this.state.translatedText}
                                  readOnly={true}/>

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