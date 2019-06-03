import { createSelector } from 'reselect';

export const getStudentCourses = state => state.studentCourses.items;

export const studentCoursesAsArray = createSelector(getStudentCourses, Object.values);
