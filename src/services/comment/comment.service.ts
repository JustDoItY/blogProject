import axios from 'axios';

const url = '/api/comment';
export const CommentApi = {

  saveComment(info) {
    return axios.post(`${url}`, info);
  },

  getComment(articleID) {
    return axios.get(`${url}`, {params: {articleID}});
  },
};
