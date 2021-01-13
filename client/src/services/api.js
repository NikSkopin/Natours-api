import axios from 'axios';

export default () => {
  const url = axios.create({
    baseURL: 'https://hidden-springs-81084.herokuapp.com/api/v1/',
    // withCredentials: true,
  });
  return url;
};
