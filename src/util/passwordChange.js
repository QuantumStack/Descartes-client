import zxcvbn from 'zxcvbn';

export default (name, value, password, password2) => {
  const currPassword = name === 'password' ? value : password;
  const currPassword2 = name === 'password2' ? value : password2;
  return {
    strength: zxcvbn(currPassword).score,
    mismatch: currPassword2 !== '' && currPassword !== currPassword2,
  };
};
