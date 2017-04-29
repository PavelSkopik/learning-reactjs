import React, { Component } from 'react';
import logo from './assets/img/logo.svg';
import './assets/vendor/boostrap/css/bootstrap.css';
import './assets/css/App.css';
import TranslationForm from './components/TranslationForm';
import LoadingCanvas from './components/LoadingCanvas';
import TranslationService from './data/TranslationService';
import TokenService from './data/AzureTokenService';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true,
            languageCodes: [],
            settings: {
                text: "",
                from: "",
                to: ""
            },
            translatedText: ""
        };

        this.tokenService = new TokenService();
        this.translationService = new TranslationService();

        this.handleInputChange = this.handleInputChange.bind(this);
    }

    sendIt() {
        console.log("test");
    }

    componentDidMount() {
        this.translationService.getSupportedLanguages().then(response => {
            this.setState(prevState => ({
                languageCodes: response,
                isLoading: !prevState.isLoading
            }));
        });
    }

    handleInputChange(value) {
        this.setState({
            settings: {text: value}
        });
    }

    render() {
        return (
            <div className="App">
                <div className="App-header">
                    <img src={logo} className="App-logo" alt="logo"/>
                </div>

                <div className="container">
                    <div className="row">
                        <div className="col-sm-12 col-md-12 col-lg-12 col-md-offset-3 col-lg-offset-2">
                            <div className="banner">
                                <h1>Microsoft Translator Demo</h1>
                            </div>
                        </div>
                    </div>

                    <TranslationForm test={new Date()}
                                     isLoading={this.state.isLoading}
                                     sendIt={this.sendIt}
                                     settings={this.state.settings}
                                     languageCodes={this.state.languageCodes}
                                     onTextChange={this.handleInputChange}/>

                </div>

                <LoadingCanvas isLoading={this.state.isLoading}/>
            </div>
        );
    }
}

export default App;
