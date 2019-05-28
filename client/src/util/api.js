import axios from 'axios';
import { getToken } from './auth';

export const 
  BASE_URL = 'https://private-3999af-descartesqs.apiary-mock.com/',
  LOG_IN_URL = 'auth/login',
  SIGN_UP_URL = 'auth/signup',
  RESEND_URL = 'auth/resend',
  VERIFY_URL = 'auth/verify',
  OVERVIEW_URL = 'overview',
  ACCOUNT_URL = 'account',
  ACCOUNT_CHANGE_URL = 'account',
  CREATE_URL = 'create',
  ENROLL_URL = 'enroll',
  INSTRUCTOR_URL = 'course/instructor',
  STUDENT_URL = 'course/student',
  authHeader = () => ({ Authorization: `bearer ${getToken()}` }),
  ax = axios.create({ baseURL: BASE_URL });
