import axios from 'axios';
import {store} from '../store';
import {getBasicOfError} from '../utils/utility';


export const fetchData = {
  getStoreData() {
    return store.getState();
  },
  async makeRequest(
    dispatch,
    reqObj,
    loadingAction,
    successAction,
    errorAction,
    actionName,
    extra_params = {},
  ) {
    // const user = this.getStoreData().user.toJS();
    // reqObj.headers['X-Auth-Token'] = user.userData && user.userData.session ? user.userData.session.token : '';
    if (dispatch) {
      // dispatch(loadingAction(extra_params));
    }
    let fetchError = null;
    console.log('Api request obj', reqObj);

    let response = await axios(reqObj).catch((error) => {
      fetchError = error;
      console.log('Api error response | fetchError :: ', error);
    });
    console.log('Api response', response);
    if (fetchError) {
      const errorData = getBasicOfError(fetchError);
      console.log('errorData ::', errorData);
      if (fetchError && fetchError.response && fetchError.response.status) {
        if (dispatch) {
          // if (errorData.status === 401) {
          //     dispatch(logout());
          // } else {
          console.log('errorAction1 inside ::', errorAction);
          dispatch(errorAction(errorData, extra_params));
          // }
        }
        return {result: false, networkError: false, error: errorData};
      } else {
        if (dispatch) {
          dispatch(errorAction(errorData, extra_params));
        }
        return {result: false, networkError: true, error: errorData};
      }
    } else if (
      response &&
      (response.status === 201 || response.status === 200)
    ) {
      console.log('Api success response', response);
      console.log('Api success extra_params', extra_params);
      if (dispatch) {
        dispatch(successAction(response.data, extra_params));
      }
      return {result: true, networkError: false, data: response.data};
    }
  },
  enumerateParam(param) {
    param.forEach((value, key) => {
      if (typeof value === 'undefined' || value === null) {
        delete param[key];
      } else if (typeof value === 'object') {
        value = fetchData.enumerateParam(value);
      }
    });
    return param;
  },
  prepareParams(params, checkParamsForError) {
    params = params || {};
    if (checkParamsForError) {
      params = fetchData.enumerateParam(params);
    }
    return params;
  },
  async post(
    dispatch,
    url,
    params,
    loadingAction,
    successAction,
    errorAction,
    checkParamsForError,
    actionName,
    extra_params = {},
  ) {
    return await fetchData.makeRequest(
      dispatch,
      {
        method: 'POST',
        url,
        data: fetchData.prepareParams(params, checkParamsForError),
        headers: {
          'Content-Type': 'application/json',
        },
      },
      loadingAction,
      successAction,
      errorAction,
      actionName,
      extra_params,
    );
  },
  async get(
    dispatch,
    url,
    params,
    loadingAction,
    successAction,
    errorAction,
    checkParamsForError,
    actionName,
    extra_params = {},
  ) {
    return await fetchData.makeRequest(
      dispatch,
      {
        method: 'GET',
        url,
        params: fetchData.prepareParams(params, checkParamsForError),
        headers: {
          'Content-Type': 'application/json',
        },
      },
      loadingAction,
      successAction,
      errorAction,
      actionName,
      extra_params,
    );
  },
  async patch(
    dispatch,
    url,
    params,
    loadingAction,
    successAction,
    errorAction,
    checkParamsForError,
    actionName,
    extra_params = {},
  ) {
    return await fetchData.makeRequest(
      dispatch,
      {
        method: 'PATCH',
        url,
        data: fetchData.prepareParams(params, checkParamsForError),
        headers: {
          'Content-Type': 'application/json',
        },
      },
      loadingAction,
      successAction,
      errorAction,
      actionName,
      extra_params,
    );
  },
};
