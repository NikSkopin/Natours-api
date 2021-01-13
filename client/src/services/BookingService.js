import Api from '@/services/api';

export default {
  booking(tourID) {
    return Api().get(`bookings/checkout-session/${tourID}`);
  },
};
