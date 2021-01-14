import axios from 'axios';

export default () => {
  const url = axios.create({
    // baseURL: 'https://natours-app-vuejs.herokuapp.com/api/v1/',
    baseURL: 'https://natours-app-vuejs.herokuapp.com/api/v1/',
    // withCredentials: true,
  });
  return url;
};
