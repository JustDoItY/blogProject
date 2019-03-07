import axios from 'axios';

const url = '/api/loginRegister';

export const LoginRegisterApi = {
  loginRegister(userInfo, loginStatus) {
    return axios.post(`${url}`, { userInfo, loginStatus });
  },
  getSession() {
    return axios.get(`${url}`);
  },
  deleteSession() {
    return axios.delete(url);
  },
};
