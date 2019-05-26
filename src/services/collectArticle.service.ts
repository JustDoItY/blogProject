import axios from 'axios';

const url = '/api/collect';

export const CollectArticleApi = {
  addColletion(articleId, collector, authorID) { // 添加收藏的文章
    return axios.post(url, {articleId, collector, authorID});
  },

  getCollections(collector) { // 获取收藏的文章
    return axios.get(url, {params: {collector}});
  },

  deleteCollection(collectionId) {
    return axios.delete(url, {params: {collectionId}});
  },
};
