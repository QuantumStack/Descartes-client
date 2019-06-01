import { createActions } from 'redux-actions';
import { ax, CREATE_URL, authHeader } from '../util/api';
import findPlan from '../util/plan';

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
    .then(({ data }) => stripe.redirectToCheckout({ sessionId: data.id }))
    .then(res => dispatch(createCourseResponse(res)))
    .catch(err => dispatch(createCourseResponse(err)));
};
