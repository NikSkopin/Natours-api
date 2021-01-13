import Api from '@/services/api';

export default {
  index() {
    return Api().get('tours');
  },
  getTour(tourId) {
    return Api().get(`tours/${tourId}`);
  },
  getTourSlug(slug) {
    return Api().get(`tours/tour/${slug}`);
  },
  getMyTours(user) {
    return Api().get('tours/my-tours', user);
  },
};
