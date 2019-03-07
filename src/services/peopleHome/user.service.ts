import axios from 'axios';

const url = '/api/user';
export const UserApi = {

  getUserInfo(id) {
    return axios.get(`${url}`, {params: { id }});
  },

  setUserInfo(userInfo) {
    return axios.post(`${url}`, userInfo);
  },
};
