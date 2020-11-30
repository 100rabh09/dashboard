import {getActionStates} from '../utils/utility';
import {fetchData} from '../utils/NetworkAdapter';
import {HOST_V2} from '../constants/constant';
import { PROJECT_DATA } from './types';

// API
const host = HOST_V2;
const PROJECT_DATA_API = `${host}/resources/projects`;

// send user data action
export const projectDataError = (error) => {
  return {
    type: getActionStates(PROJECT_DATA).failure,
    error,
  };
};

export const projectDataSuccess = (data) => {
  return {
    type: getActionStates(PROJECT_DATA).success,
    data,
  };
};

export const projectDataInProgress = () => {
  return {
    type: getActionStates(PROJECT_DATA).inProgress,
  };
};

export const projectData = () => {
  console.log('projectData action called ...');
  const params = {
    sql:`SELECT article_id,count(project_id) FROM jobs WHERE modified BETWEEN "2020-10-01 00:00:00" AND "2020-11-10 23:59:59" GROUP BY article_id`,
    dbsource:'nglims'
    // "user":"data"
  };
  
  return (dispatch) => {
    fetchData.post(
      dispatch,
      //'https://api.jsonapi.co/rest/v1/user/create',// 
      PROJECT_DATA_API,
      params,
      projectDataInProgress,
      projectDataSuccess,
      projectDataError,
      false,
      PROJECT_DATA,
      null,
    );
  };
};
