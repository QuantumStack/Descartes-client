import { createSelector } from 'reselect';

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
  (courses, instructors, assignments, categories) => {
    const courseItem = courses[courseId];
    return courseItem && !courseItem.isLoading ? {
      ...courseItem,
      instructors: courseItem.instructors.map(email => instructors[email]),
      assignments: courseItem.assignments.map(id => assignments[id]),
      categories: courseItem.categories.reduce((obj, id) => ({ ...obj, [id]: categories[id] }), {}),
    } : {};
  },
);
