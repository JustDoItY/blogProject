import axios from 'axios';

const url = '/api/dynamicpointGood';
export const DynamicPointGoodApi = {

  pointGood(dynamicId, authorId) {
    return axios.post(url, {dynamicId, authorId});
  },
};
