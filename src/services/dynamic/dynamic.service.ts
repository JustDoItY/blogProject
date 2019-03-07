import axios from 'axios';

const url = '/api/dynamic';
export const DynamicApi = {

  saveDynamic(dynamic) {
    return axios.post(`${url}`, {dynamic});
  },

  getDynamics() {
    return axios.get(`${url}`);
  },
};
