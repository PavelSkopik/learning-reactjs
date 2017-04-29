import axios from "axios";
import jsonp from "jsonp";
import TokenService from './AzureTokenService';

function TranslationService(configuration) {

    var DefaultConfiguration = {
        languagesResource: "https://api.microsofttranslator.com/V2/Ajax.svc/GetLanguagesForTranslate?appId=Bearer {{token}}"
    };

    this.configuration = (configuration === null || configuration === undefined) ? DefaultConfiguration : configuration;
    this.tokenService = new TokenService();
}

TranslationService.prototype.translate = function (settings) {
    return axios({
        method: "get",
        url: settings.url
    }).catch(error => {
        console.error(error);
    });
};

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
            jsonp(getUrl(token.data), {
                param: "onComplete",
                name: "processResponse"
            }, processResponse);
        });
    });
};

export default TranslationService;