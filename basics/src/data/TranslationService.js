import axios from "axios";

function TranslationService(){

}

TranslationService.prototype.translate = function (settings) {
    return axios({
        method: "get",
        url: settings.url
    }).catch(error => {
        console.error(error);
    });
};