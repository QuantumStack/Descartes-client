import { createActions } from 'redux-actions';
import { ax, OVERVIEW_URL, authHeader } from '../util/api';
import deauthenticateIfNeeded from './deauthenticateIfNeeded';
import { userResponse } from './userFetch';
import { instructorCoursesReceive, studentCoursesReceive } from './identities';

export const DASHBOARD_REQUEST = 'DASHBOARD_REQUEST';
export const DASHBOARD_RESPONSE = 'DASHBOARD_RESPONSE';

export const {
  dashboardRequest, dashboardResponse,
} = createActions(DASHBOARD_REQUEST, DASHBOARD_RESPONSE);

export const fetchDashboard = () => (dispatch) => {
  dispatch(dashboardRequest());
  ax.get(OVERVIEW_URL, { headers: authHeader() })
    .then(({ data }) => {
      dispatch(userResponse(data.user));
      dispatch(dashboardResponse());
      dispatch(studentCoursesReceive(data.studentCourses));
      dispatch(instructorCoursesReceive(data.instructorCourses));
    })
    .catch((err) => {
      if (!deauthenticateIfNeeded(err.response, dispatch)) dispatch(dashboardResponse(err));
    });
};

export const fetchDashboardIfNeeded = () => (dispatch, getState) => {
  const { instructorCourses, studentCourses } = getState();
  if (!instructorCourses.isHydrated || !studentCourses.isHydrated) dispatch(fetchDashboard());
};
