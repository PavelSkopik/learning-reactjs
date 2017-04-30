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

TranslationService.prototype.translate = function (text, from, to) {
    var that = this;

    return new Promise(function (resolve, reject) {
        var processResponse = function (err, data) {
            if (err) {
                reject(Error(err.message));
            } else {
                resolve(data);
            }
        };

        var getUrl = function (token) {
            return that.configuration.translateResource.replace("{{token}}", token)
                .replace("{{text}}", encodeURIComponent(text))
                .replace("{{from}}", encodeURIComponent(from))
                .replace("{{to}}", encodeURIComponent(to));
        };

        var token = that.tokenService.getToken();

        jsonp(getUrl(token), {
            param: "onComplete",
            name: "processResponse"
        }, processResponse);
    });
};

/**
 * Sends a request to retrieve a list of supported language codes for translation. Returns a promise object that wraps
 * an HTTP request executed by the jsonp library.
 * @returns {Promise} Promise object.
 */
TranslationService.prototype.getSupportedLanguages = function () {
    var that = this;

    return new Promise(function (resolve, reject) {
        var processResponse = function (err, data) {
            if (err) {
                reject(Error(err.message));
            } else {
                resolve(data);
            }
        };

        var getUrl = function (token) {
            return that.configuration.languagesResource.replace("{{token}}", encodeURIComponent(token));
        };

        that.tokenService.getToken().then(token=> {
            jsonp(getUrl(token), {
                param: "onComplete",
                name: "processResponse"
            }, processResponse);
        });
    });
};

export default TranslationService;