import Api from '@/services/api';

export default {
  getUser(userId) {
    return Api().get(`users/${userId}`);
  },
  getMe(user) {
    return Api().get('users/me', user);
  },
};
