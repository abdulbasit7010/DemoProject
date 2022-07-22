"use strict";
exports.__esModule = true;
exports.environment = void 0;
var APIM_URL_LOGIN = "https://10.155.48.145:8243";
var APIM_URL = "https://10.155.48.145:8243/service/1";
exports.environment = {
    production: true,
    TOKEN_KEY: "access_token",
    REFRESH_TOKEN_KEY: "refresh_token",
    SCOPE_KEY: "scope",
    TOKEN_TYPE_KEY: "Bearer",
    EXPIRE_IN_KEY: "expires_in",
    TOKEN_EXPIRY: 3600,
    CONSUMER_KEY_SECRET: "YkEycHdfQm9wZm1GZmQ0VUk5UEs4alpmX1NNYTpCR2cydVRTd0Jtc0dIdGdiRXVuRUp6Nk0yVEFh",
    EncDecKey: "Enc_Verif_Hack",
    notificationTimer: 4000,
    title: "Prod",
    characterLimit: 300,
    apiRoutes: {
        loginUser: APIM_URL_LOGIN + "/token",
        getServiceCodes: APIM_URL + "/getServiceCodes",
        addServiceCode: APIM_URL + "/addServiceCode",
        updateServiceCode: APIM_URL + "/updateServiceCode",
        deleteServiceCode: APIM_URL + "/deleteServiceCode",
        getSubServiceCodes: APIM_URL + "/getSubServiceCodes",
        addSubServiceCodes: APIM_URL + "/addSubServiceCodes",
        updateSubServiceCodes: APIM_URL + "/updateSubServiceCodes",
        deleteSubServiceCodes: APIM_URL + "/deleteSubServiceCodes",
        getEsmeConfigurations: APIM_URL + "/getEsmeConfigurations",
        addEsmeConfiguration: APIM_URL + "/addEsmeConfiguration",
        updateEsmeConfiguration: APIM_URL + "/updateEsmeConfiguration",
        deleteEsmeConfiguration: APIM_URL + "/deleteEsmeConfiguration",
        addMenu: APIM_URL + "/addMenu",
        updateMenu: APIM_URL + "/updateMenu",
        getMenus: APIM_URL + "/getMenus",
        getMenuById: APIM_URL + "/getMenuById",
        dateWiseServices: APIM_URL + "/dateWiseServices",
        serviceCounts: APIM_URL + "/serviceCounts",
        deleteMenu: APIM_URL + "/deleteMenu",
        getProfile: APIM_URL + "/getProfile",
        esmeDetails: APIM_URL + "/esmeDetails",
        treeDetails: APIM_URL + "/treeDetails",
        addStringsBasedCharging: APIM_URL + "/addStringsBasedCharging",
        getStringsBasedCharging: APIM_URL + "/getStringsBasedCharging",
        editStringsBasedCharging: APIM_URL + "/editStringsBasedCharging",
        getNormalFlowCodes: APIM_URL + "/getFlowCodes",
        getDtmfsById: APIM_URL + "/getDtmfsById",
        getHttpSmppConf: APIM_URL + "/getHttpSmppConf",
        getWhiteListGroups: APIM_URL + "/getWhiteListGroups"
    },
    errorCode: {
        HTTP_REQUEST: {
            code: 1000,
            msg: "An http request failure"
        }
    }
};
