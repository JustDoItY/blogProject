import axios from 'axios';

const url = '/api/resetPaw';

export const ResetPawApi = {
  resetPaw(emailAddress, paw) {
    return axios.post(url, {emailAddress, paw});
  },
};
