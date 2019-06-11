import axios from 'axios';
import { apiBaseUrl } from '../config';
import { getToken } from './auth';

export const BASE_URL = apiBaseUrl;
export const LOG_IN_URL = 'auth/login';
export const SIGN_UP_URL = 'auth/signup';
export const RESEND_URL = 'auth/resend';
export const VERIFY_URL = 'auth/verify';
export const OVERVIEW_URL = 'api/course/overview';
export const ACCOUNT_URL = 'api/account';
export const ACCOUNT_CHANGE_URL = 'api/account/modify';
export const CHECK_COUPON_URL = '/api/course/create/coupon';
export const CREATE_URL = 'api/course/create';
export const JOIN_URL = 'api/enroll';
export const INSTRUCTOR_URL = 'course/instructor';
export const STUDENT_URL = 'api/course/student';

export const authHeader = () => ({ Authorization: `bearer ${getToken()}` });
export const ax = axios.create({ baseURL: BASE_URL });
