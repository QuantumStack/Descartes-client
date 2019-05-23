import axios from 'axios';
import { getToken } from './auth';

export const 
  BASE_URL = '',
  LOG_IN_URL = 'auth/login',
  SIGN_UP_URL = 'auth/signup',
  RESEND_URL = 'auth/resend',
  VERIFY_URL = 'auth/verify',
  authHeader = () => ({ Authorization: `bearer ${getToken()}` }),
  ax = axios.create({ baseURL: BASE_URL });
