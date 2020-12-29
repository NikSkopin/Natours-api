const express = require('express');

const router = express.Router();

const reviewRouter = require('./reviewRoutes');

const {
  getAllTours,
  createTour,
  getTour,
  updateTour,
  deleteTour,
  aliasTopTours,
  getTourStats,
  getMontlyPlan,
  getToursWithin,
  getDistances,
  getMyTours,
} = require('../controllers/tourController');

const { protect, restrictTo } = require('../controllers/authController');
const { createBookingCheckout } = require('../controllers/bookingController');

router.use('/:tourId/reviews', reviewRouter);

router.route('/top-5-cheap').get(aliasTopTours, getAllTours);

router.route('/tour-stats').get(getTourStats);
router
  .route('/monthly-plan/:year')
  .get(protect, restrictTo('admin', 'lead-guide', 'guide'), getMontlyPlan);

router
  .route('/tours-within/:distance/center/:latlng/unit/:unit')
  .get(getToursWithin);

router.route('/distances/:latlng/unit/:unit').get(getDistances);

router
  .route('/')
  .get(createBookingCheckout, getAllTours)
  .post(protect, restrictTo('admin', 'lead-guide'), createTour);

router.route('/my-tours/').get(protect, getMyTours);

router
  .route('/:id')
  .get(getTour)
  .patch(protect, restrictTo('admin', 'lead-guide'), updateTour)
  .delete(protect, restrictTo('admin', 'lead-guide'), deleteTour);

router.route('/tour/:slug').get(getTour);

module.exports = router;
