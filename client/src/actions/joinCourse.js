import { createActions } from 'redux-actions';
import { push } from 'connected-react-router';
import { ax, JOIN_URL, authHeader } from '../util/api';
import deauthenticateIfNeeded from './deauthenticateIfNeeded';
import { studentCoursesDehydrate } from './studentCoursesDehydrate';

export const JOIN_REQUEST = 'JOIN_REQUEST';
export const JOIN_RESPONSE = 'JOIN_RESPONSE';

export const { joinRequest, joinResponse } = createActions(JOIN_REQUEST, JOIN_RESPONSE);

export const joinCourse = code => (dispatch) => {
  dispatch(joinRequest());
  ax.post(JOIN_URL, { data: { code }, headers: authHeader() })
    .then(({ data }) => {
      dispatch(joinResponse());
      dispatch(studentCoursesDehydrate());
      dispatch(push(`/dashboard/student/${data.id}`));
    })
    .catch((err) => {
      if (!deauthenticateIfNeeded(err.response, dispatch)) dispatch(joinResponse(err));
    });
};
