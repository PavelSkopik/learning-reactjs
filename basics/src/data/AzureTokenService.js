import axios from 'axios';

function AzureTokenService(configuration) {

    this.Token = {
        token: "",
        duration: 600000,
        timeStamp: 0
    };

    var DefaultConfiguration = {
        url: "https://api.cognitive.microsoft.com/sts/v1.0/issueToken",
        azureHeader: {
            "Ocp-Apim-Subscription-Key": "bdbfbe8503c54e87ab89b7962bc1d573"
        }
    };

    this.config = (configuration === null || configuration === undefined) ? DefaultConfiguration : configuration
}

AzureTokenService.prototype.getToken = function () {
    if (this.isTokenValid()) {
        return this.Token.token;
    }

    return this.getTokenAsync();
};

AzureTokenService.prototype.getTokenAsync = function () {
    var that = this;

    return axios({
        method: "post",
        url: this.config.url,
        headers: this.config.azureHeader
    }).then(response => {
        that.setToken(response);
    }).catch(error => {
        console.error(error);
    });
};

AzureTokenService.prototype.isTokenValid = function () {
    return (new Date().getTime() - this.Token.timeStamp) < this.Token.duration;
};

AzureTokenService.prototype.setToken = function (data) {
    this.Token.token = data;
    this.Token.timeStamp = new Date().getTime();
};

export default AzureTokenService;
