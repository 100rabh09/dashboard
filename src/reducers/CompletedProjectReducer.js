import {COMPLETED_PROJECT_DATA} from '../actions/types';
import {getApiError, getActionStates, getDefaultError} from '../utils/utility';

const initialState = {
  completedProjectData: {},
  completedProjectLoading: false,
  completedProjectError: getApiError(),
};

export const completedProject = (state = initialState, action) => {

  switch (action.type) {
    case getActionStates(COMPLETED_PROJECT_DATA).inProgress:
      return {
        ...state,
        completedProjectLoading: true
      };


    case getActionStates(COMPLETED_PROJECT_DATA).success:
      console.log("completed project success ",action.data)
      return {
        ...state,
        completedProjectLoading: false,
        completedProjectData: action.data
      };


    case getActionStates(COMPLETED_PROJECT_DATA).failure:
      return {
        ...state,
        completedProjectLoading: false,
        completedProjectError: getApiError(
          COMPLETED_PROJECT_DATA,
          getDefaultError(action.error),
        )
      };


    default:
      return state;
  }
};
