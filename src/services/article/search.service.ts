import axios from 'axios';

const url = '/api/search';

export const SearchApi = {
  getPage(pageIndex: number, field: string = '', subject: string = 'all') {
    return axios.get(`${url}`, { params: {
      pageIndex,
      field,
      subject,
    }});
  },

  getArticle(id: string) {
    return axios.post(`${url}`, {id});
  },
};
