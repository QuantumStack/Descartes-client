import axios from 'axios';
import { getToken } from './auth';

export const 
  BASE_URL = 'https://private-3999af-descartesqs.apiary-mock.com/',
  LOG_IN_URL = 'auth/login',
  SIGN_UP_URL = 'auth/signup',
  RESEND_URL = 'auth/resend',
  VERIFY_URL = 'auth/verify',
  USER_INFO_URL = '',
  CREATE_URL = '',
  ENROLL_URL = '',
  authHeader = () => ({ Authorization: `bearer ${getToken()}` }),
  ax = axios.create({ baseURL: BASE_URL });
