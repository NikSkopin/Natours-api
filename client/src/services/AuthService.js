import Api from '@/services/api';

export default {
  signup(credentials) {
    return Api().post('users/signup', credentials);
  },
  login(credentials) {
    return Api().post('users/login', credentials);
  },
  logout() {
    return Api().get('users/logout');
  },
  updateMyPassword(user) {
    return Api().patch('users/updateMyPassword', user);
  },
  updateMe(user) {
    return Api().patch('users/updateMe', user);
  },
};
