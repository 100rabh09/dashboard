
import { ERROR_CONSTANTS } from '../constants/constant';

export const getApiError = (action, error) => {
    return {
        action: action || '',
        errorMessage: error || ''
    };
}

export const getDefaultError = (error) => {
    let customError = {};
    if (error.message === ERROR_CONSTANTS.NETWORK_ERROR) {
        return ERROR_CONSTANTS.NETWORK_ERROR;
    }
    if (error && error.data && error.data.error) {
        customError.error = error.data.error;
    }
    return customError;
}

export function getActionStates(actionName) {
    // console.log("type of actionName :: ", typeof actionName);
    // console.log("actionName :: ", actionName);
    if (typeof actionName !== 'string') {
        return;
        // throw new Error('actionName must be a string');
    }
    const actionNameUpper = actionName.toUpperCase();
    const inProgress = `FETCHING_${actionNameUpper}`;
    const success = `FETCH_${actionNameUpper}_SUCCESS`;
    const failure = `FETCH_${actionNameUpper}_ERRORED`;
    const clear = `CLEAR_${actionNameUpper}`;

    return {
        inProgress,
        success,
        failure,
        clear,
    };
}


export const getBasicOfError = (error) => {
    if (!error) {
        return {};
    }
    let errorEvent = {};
    const errorResponse = error && error.response;
    const errorResponseConfig = errorResponse && errorResponse.config;
    if (error.message) {
        if (error.message === 'Network Error') {
            error.message = ERROR_CONSTANTS.NETWORK_ERROR;
        }
        errorEvent.message = error.message;
    }
    if (errorResponse && errorResponse.status) {
        errorEvent.status = errorResponse.status;
    }
    if (errorResponseConfig && errorResponseConfig.url) {
        errorEvent.url = errorResponseConfig.url;
    }
    if (errorResponse && errorResponse.statusText) {
        errorEvent.statusText = error.statusText;
    }
    if (error.code) {
        errorEvent.code = error.code;
    }
    if (errorResponse && errorResponse.data) {
        errorEvent.data = errorResponse.status === 502 ? { error: ERROR_CONSTANTS.DEFAULT_API_ERROR } : errorResponse.data;
    }
    return errorEvent;
}

export function isEmpty(obj) {
    // console.log(typeof(obj));
    if (obj !== null && obj !== undefined) {
        // for general objects
        if (typeof obj === 'string') {
            if (obj.trim() === '' || obj == 'null') {
                // for string
                return true;
            }
            return false;
        } else if (obj.length <= 0) {
            // for array
            return true;
        } else if (typeof obj === 'object') {
            const keys = Object.keys(obj);
            const len = keys.length;
            if (len <= 0) {
                return true;
            }
            return false;
        }
        return false;
    }
    return true;
}

export function immutableToJS(obj) {
    if (typeof obj === 'object' && obj !== null) {
        return obj.toJS();
    }
    return obj;
}

export const isValidPhone = (text) => {
    const phoneno = /^[0-9]{10}$/;
    if (phoneno.test(text) === false) {
        return false;
    }
    return true;
};

export const isValidOtp = (text) => {
    const otptext = /^[0-9]{6}$/;
    if (otptext.test(text) === false) {
        return false;
    }
    return true;
};