import {getActionStates} from '../utils/utility';
import {fetchData} from '../utils/NetworkAdapter';
import {HOST_V2} from '../constants/constant';
import { COMPLETED_PROJECT_DATA } from './types';

// API
const host = HOST_V2;
const PROJECT_DATA_API = `${host}/resources/performance`;

// send user data action
export const completedProjectDataError = (error) => {
  return {
    type: getActionStates(COMPLETED_PROJECT_DATA).failure,
    error,
  };
};

export const completedProjectDataSuccess = (data) => {
  return {
    type: getActionStates(COMPLETED_PROJECT_DATA).success,
    data,
  };
};

export const completedProjectDataInProgress = () => {
  return {
    type: getActionStates(COMPLETED_PROJECT_DATA).inProgress,
  };
};

export const completedProjectData = () => {
  console.log('completedProjectData action called for performance evaluation...');

  var bodyFormData = new FormData();
  bodyFormData.append("sql", `SELECT count(DISTINCT(j.project_id)) FROM jobs j JOIN job_has_messages jhm ON jhm.job_id = j.id JOIN messages m on m.id = jhm.message_id WHERE m.text_tag = "delivered" AND j.article_id IN (3143,3261,3422,3428,3434,3437,3572,3600,3728)`);
  bodyFormData.append("dbsource", 'nglims');
  bodyFormData.append("period", '12');

  return (dispatch) => {
    fetchData.post(
      dispatch,
      PROJECT_DATA_API,
      bodyFormData,
      completedProjectDataInProgress,
      completedProjectDataSuccess,
      completedProjectDataError,
      false,
      COMPLETED_PROJECT_DATA,
      null,
    );
  };
};
