import { createActions } from 'redux-actions';
import { ax, CREATE_URL, authHeader } from '../util/api';
import findPlan from '../util/plan';
import deauthenticateIfNeeded from './deauthenticateIfNeeded';
import { paymentsDehydrate } from './paymentsDehydrate';
import { instructorCoursesDehydrate } from './instructorCoursesDehydrate';

export const CREATE_COURSE_REQUEST = 'CREATE_COURSE_REQUEST';
export const CREATE_COURSE_RESPONSE = 'CREATE_COURSE_RESPONSE';

export const {
  createCourseRequest, createCourseResponse,
} = createActions(CREATE_COURSE_REQUEST, CREATE_COURSE_RESPONSE);

export const createCourse = (name, description, plan, stripe) => (dispatch) => {
  dispatch(createCourseRequest());
  const { price } = findPlan(plan);
  ax.post(CREATE_URL, {
    data: {
      name,
      description,
      plan,
      price,
    },
    headers: authHeader(),
  })
    .then(() => {
      dispatch(paymentsDehydrate());
      dispatch(instructorCoursesDehydrate());
    })
    // TODO: don't prompt for sessionId (use server response);
    .then(({ data }) => stripe.redirectToCheckout({ sessionId: prompt() /* data.id */ }))
    .then(res => dispatch(createCourseResponse(res)))
    .catch((err) => {
      if (!deauthenticateIfNeeded(err.response, dispatch)) dispatch(createCourseResponse(err));
    });
};
