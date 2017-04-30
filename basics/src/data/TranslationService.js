import jsonp from "jsonp";
import TokenService from './AzureTokenService';

function TranslationService(configuration) {

    var DefaultConfiguration = {
        languagesResource: "https://api.microsofttranslator.com/V2/Ajax.svc/GetLanguagesForTranslate?appId=Bearer {{token}}",
        translateResource: "https://api.microsofttranslator.com/V2/Ajax.svc/Translate?appId=Bearer {{token}}&text={{text}}&from={{from}}&to={{to}}"
    };

    this.configuration = (configuration === null || configuration === undefined) ? DefaultConfiguration : configuration;
    this.tokenService = new TokenService();
}

/**
 * Sends a request to retrieve a list of supported language codes for translation. Returns a promise object that wraps
 * an HTTP request executed by the jsonp library.
 * @returns {Promise} Promise object.
 */
TranslationService.prototype.getSupportedLanguages = function () {
    var that = this;
    var getUrl = function (token) {
        return that.configuration.languagesResource.replace("{{token}}", encodeURIComponent(token));
    };

    return this.sendRequest(getUrl);
};

/**
 * Translates text from source language to target language.
 * @param text Text to translate.
 * @param from Source language code.
 * @param to Target language code.
 */
TranslationService.prototype.translate = function (text, from, to) {
    var that = this;
    var getUrl = function (token) {
        return that.configuration.translateResource.replace("{{token}}", token)
            .replace("{{text}}", encodeURIComponent(text))
            .replace("{{from}}", encodeURIComponent(from))
            .replace("{{to}}", encodeURIComponent(to));
    };

    return this.sendRequest(getUrl);
};

/**
 * Sends an HTTP request and executes a URL creation callback.
 * @param getUrlCallBack Callback function.
 * @returns {Promise} Promise object.
 */
TranslationService.prototype.sendRequest = function (getUrlCallBack) {
    var token = this.tokenService.getToken();

    if (token === "") {
        return this.tokenService.getTokenAsync().then(token => {
            return this.sendJsonpRequest(getUrlCallBack(token));
        });
    } else {
        return this.sendJsonpRequest(getUrlCallBack(token));
    }
};

/**
 * Executes JSONP request and wraps the execution in a Promise object.
 * @param url URL to call.
 * @returns {Promise} Promise object.
 */
TranslationService.prototype.sendJsonpRequest = function (url) {
    return new Promise(function (resolve, reject) {
        var processResponse = function (err, data) {
            if (err) {
                reject(Error(err.message));
            } else {
                resolve(data);
            }
        };

        jsonp(url, {
            param: "onComplete",
            name: "processResponse"
        }, processResponse);
    });
};

export default TranslationService;