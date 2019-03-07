import axios from 'axios';

const url = '/api/articles';
export const ArticleApi = {

  saveArticle(articleInfo) {
    return axios.post(`${url}`, articleInfo);
  },

  getArticlesByUserId(id) {
    return axios.get(url, {params: {id}});
  },

  deleteArticle(id) {
    return axios.delete(url, {params: {id}});
  },
};
