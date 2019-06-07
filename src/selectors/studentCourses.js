import { createSelector } from 'reselect';
import moment from 'moment';
import scoreAssignmentsCategories from './scoreAssignmentsCategories';
import { dateFormat } from '../config';

export const getStudentCourses = state => state.studentCourses.items;

export const getStudentCoursesInstructors = state => state.studentCourses.instructors;

export const getStudentCoursesAssignments = state => state.studentCourses.assignments;

export const getStudentCoursesCategories = state => state.studentCourses.categories;

export const studentCoursesAsArray = createSelector(getStudentCourses, Object.values);

export const studentCourseCompact = courseId => createSelector(
  [
    getStudentCourses,
    getStudentCoursesInstructors,
    getStudentCoursesAssignments,
    getStudentCoursesCategories,
  ],
  (courses, allInstructors, allAssignments, allCategories) => {
    const courseItem = courses[courseId];
    if (courseItem && !courseItem.isLoading && courseItem.isHydrated) {
      const assignments = courseItem.assignments.map((id) => {
        const assign = allAssignments[id];
        const momentDate = moment(assign.date);
        return {
          ...assign,
          exactDate: momentDate.format(dateFormat),
          relativeDate: momentDate.fromNow(),
        };
      });
      const categories = courseItem.categories.map(id => allCategories[id]);
      const scoredObj = scoreAssignmentsCategories(assignments, categories);
      return {
        ...courseItem,
        instructors: courseItem.instructors.map(email => allInstructors[email]),
        ...scoredObj,

      };
    }
    return {};
  },
);
