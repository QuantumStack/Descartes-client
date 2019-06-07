import { createSelector } from 'reselect';

export const getInstructorCourses = state => state.instructorCourses.items;

export const instructorCoursesAsArray = createSelector(getInstructorCourses, Object.values);
