import axios from 'axios';

const url = '/api/dynamicpointGood';
export const DynamicPointGoodApi = {

  pointGood(id, userId) {
    return axios.post(url, {id, userId});
  },
};
