import axios from 'axios';

const url = '/api/search';

export const SearchApi = {
  getPage(pageIndex: number, field: string = '') {
    return axios.get(`${url}`, { params: {
      pageIndex,
      field,
    }});
  },

  getArticle(id: string) {
    return axios.post(`${url}`, {id});
  },
};
