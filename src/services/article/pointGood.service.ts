import axios from 'axios';

const url = '/api/articlepointGood';
export const ArticlePointGoodApi = {

  pointGood(articleId, authorId) {
    return axios.post(url, {articleId, authorId});
  },
};
