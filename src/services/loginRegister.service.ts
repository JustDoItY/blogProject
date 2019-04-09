import axios from 'axios';

const url = '/api/loginRegister';

export const LoginRegisterApi = {
  loginRegister(userInfo, loginStatus, loginType) {
    return axios.post(`${url}`, { userInfo, loginStatus, loginType });
  },
  getSession() {
    return axios.get(`${url}`);
  },
  deleteSession() {
    return axios.delete(url);
  },
};
