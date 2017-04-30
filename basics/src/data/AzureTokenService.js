import axios from 'axios';

function AzureTokenService(configuration) {

    this.Token = {
        token: "",
        duration: 600000,
        timeStamp: 0,
        isValid: function () {
            return (new Date().getTime() - this.timeStamp) < this.duration;
        }
    };

    var DefaultConfiguration = {
        url: "https://api.cognitive.microsoft.com/sts/v1.0/issueToken",
        azureHeader: {
            "Ocp-Apim-Subscription-Key": "bdbfbe8503c54e87ab89b7962bc1d573"
        }
    };

    this.config = (configuration === null || configuration === undefined) ? DefaultConfiguration : configuration
}

/**
 * Retrieves an authentication token either from cache or from a web service.
 * @returns {string} Token.
 */
AzureTokenService.prototype.getToken = function () {
    return this.Token.token;
};

AzureTokenService.prototype.getTokenAsync = function () {
    var that = this;

    return axios({
        method: "post",
        url: this.config.url,
        headers: this.config.azureHeader
    }).then(response => {
        that.cacheToken(response.data);
        return response.data;
    }).catch(error => {
        console.error(error);
    });
};

/**
 * Determines whether a cached token is still valid.
 * @returns {*} Boolean value.
 */
AzureTokenService.prototype.hasValidToken = function () {
    return this.Token.isValid();
};

/**
 * Caches authentication token.
 * @param token Token to cache.
 */
AzureTokenService.prototype.cacheToken = function (token) {
    this.Token.token = token;
    this.Token.timeStamp = new Date().getTime();
};

export default AzureTokenService;
