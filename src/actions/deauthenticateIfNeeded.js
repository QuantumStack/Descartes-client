import { doLogOut } from './logOut';

export default (res, dispatch) => {
  if (res && res.status === 401) {
    dispatch(doLogOut(true));
    return true;
  }
  return false;
};
