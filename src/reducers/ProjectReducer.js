import {PROJECT_DATA} from '../actions/types';
import {getApiError, getActionStates, getDefaultError} from '../utils/utility';

const initialState = {
  projectData: {},
  projectLoading: false,
  projectError: getApiError(),
};

export const projectReducer = (state = initialState, action) => {

  switch (action.type) {
    case getActionStates(PROJECT_DATA).inProgress:
      return {
        ...state,
        projectLoading: true
      };


    case getActionStates(PROJECT_DATA).success:

      return {
        ...state,
        projectLoading: false,
        projectData: action.data
      };


    case getActionStates(PROJECT_DATA).failure:
      return {
        ...state,
        projectLoading: false,
        projectError: getApiError(
          PROJECT_DATA,
          getDefaultError(action.error),
        )
      };


    default:
      return state;
  }
};
