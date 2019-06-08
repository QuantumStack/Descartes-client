import axios from 'axios';
import { apiBaseUrl } from '../config';
import { getToken } from './auth';

export const BASE_URL = apiBaseUrl;
export const LOG_IN_URL = 'auth/login';
export const SIGN_UP_URL = 'auth/signup';
export const RESEND_URL = 'auth/resend';
export const VERIFY_URL = 'auth/verify';
export const OVERVIEW_URL = 'overview';
export const ACCOUNT_URL = 'account';
export const ACCOUNT_CHANGE_URL = 'account';
export const CREATE_URL = 'create';
export const JOIN_URL = 'enroll';
export const INSTRUCTOR_URL = 'course/instructor';
export const STUDENT_URL = 'course/student';

export const authHeader = () => ({ Authorization: `bearer ${getToken()}` });
export const ax = axios.create({ baseURL: BASE_URL });
