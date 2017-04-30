import React, { Component } from 'react';
import logo from './assets/img/logo.svg';
import './assets/vendor/boostrap/css/bootstrap.css';
import './assets/css/App.css';
import TranslationForm from './components/TranslationForm';
import LoadingCanvas from './components/LoadingCanvas';
import TranslationService from './data/TranslationService';

class App extends Component {

    constructor(props) {
        super(props);

        this.state = {
            isLoading: true
        };

        this.translationService = new TranslationService();

        this.handleLoadingChange = this.handleLoadingChange.bind(this);
    }

    handleLoadingChange(value) {
        this.setState({
            isLoading: value
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

                    <TranslationForm onLoadingChange={this.handleLoadingChange}/>

                </div>

                <LoadingCanvas isLoading={this.state.isLoading}/>
            </div>
        );
    }
}

export default App;
