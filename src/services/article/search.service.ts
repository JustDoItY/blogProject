import axios from 'axios';

const url = '/api/search';

export const SearchApi = {
  getPage(page) {
    return axios.get(`${url}`, { params: {
      page,
    }});
  },

  getArticle(id: string) {
    return axios.get(`${url}/${id}`);
  },

  searchBy(field: string) {
    return axios.post(url, {field});
  },
};
