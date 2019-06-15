import { createSelector } from 'reselect';

export const getInstructorCourses = state => state.instructorCourses.items;

export const instructorCoursesAsArray = createSelector(getInstructorCourses, Object.values);

export const instructorCourseCompact = courseId => createSelector(
  [
    getInstructorCourses,
  ],
  (courses) => {
    const courseItem = courses[courseId];
    if (courseItem && !courseItem.isLoading && courseItem.isHydrated) {
      return courseItem;
    }
    return {};
  },
);
