import { createActions } from 'redux-actions';
import { ax, OVERVIEW_URL, authHeader } from '../util/api';
import deauthenticateIfNeeded from './deauthenticateIfNeeded';
import { userResponse } from './userFetch';

export const LOAD_DASHBOARD_REQUEST = 'LOAD_DASHBOARD_REQUEST';
export const LOAD_DASHBOARD_RESPONSE = 'LOAD_DASHBOARD_RESPONSE';

export const {
  loadDashboardRequest, loadDashboardResponse,
} = createActions(LOAD_DASHBOARD_REQUEST, LOAD_DASHBOARD_RESPONSE);

export const loadDashboard = () => (dispatch) => {
  dispatch(loadDashboardRequest());
  ax.post(OVERVIEW_URL, { headers: authHeader() })
    .then(({ data }) => {
      dispatch(userResponse(data.user));
      dispatch(loadDashboardResponse());
      // TODO: dispatch actions for instructor and student course data received
    })
    .catch((err) => {
      if (!deauthenticateIfNeeded(err.response, dispatch)) dispatch(loadDashboardResponse(err));
    });
};

export const loadDashboardIfNeeded = () => (dispatch, getState) => {
  const { instructorCourses, studentCourses } = getState();
  if (!instructorCourses.isHydrated || !studentCourses.isHydrated) dispatch(loadDashboard());
};
