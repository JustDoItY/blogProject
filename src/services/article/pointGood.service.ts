import axios from 'axios';

const url = '/api/articlepointGood';
export const ArticlePointGoodApi = {

  pointGood(id, userId) {
    return axios.post(url, {id, userId});
  },
};
