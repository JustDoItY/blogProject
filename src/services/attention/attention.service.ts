import axios from 'axios';

const url = '/api/attention';
export const AttentionApi = {

  saveAttention(attentionInfo) {
    return axios.post(`${url}`, attentionInfo);
  },

  getAttention(follower) {
    return axios.get(`${url}`, {params: {follower}});
  },
};
