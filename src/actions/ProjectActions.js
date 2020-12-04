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

  var bodyFormData = new FormData();
  bodyFormData.append("sql", `SELECT article_id,count(project_id) FROM jobs WHERE modified BETWEEN "2020-10-01 00:00:00" AND "2020-11-10 23:59:59" AND article_id IS NOT NULL GROUP BY article_id`);
  bodyFormData.append("dbsource", 'nglims');

  return (dispatch) => {
    fetchData.post(
      dispatch,
      PROJECT_DATA_API,
      bodyFormData,
      projectDataInProgress,
      projectDataSuccess,
      projectDataError,
      false,
      PROJECT_DATA,
      null,
    );
  };
};
