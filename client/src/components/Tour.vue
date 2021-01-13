<template>
  <Card class="card">
    <!-- <template #header>
      <img alt="user header" src="demo/images/usercard.png" />
    </template> -->
    <!-- <template #title> Advanced Card </template> -->
    <template #content>
      <div class="card__header">
        <div class="card__picture">
          <div class="card__picture-overlay">&nbsp;</div>
          <img
            :src="'img/tours/' + tour.imageCover"
            :alt="tour.name"
            class="card__picture-img"
          />
        </div>

        <h3 class="heading-tertirary">
          <span>{{ tour.name }}</span>
        </h3>
      </div>

      <div class="card__details">
        <h4 class="card__sub-heading">
          {{ tour.difficulty + ' ' + tour.duration + '-day tour' }}
        </h4>
        <p class="card__text">
          {{ tour.summary }}
        </p>
        <div class="card__data">
          <svg class="card__icon">
            <use xlink:href="img/icons.svg#icon-map-pin"></use>
          </svg>
          <span>{{ tour.startLocation.description }}</span>
        </div>
        <div class="card__data">
          <svg class="card__icon">
            <use xlink:href="img/icons.svg#icon-calendar"></use>
          </svg>
          <span>{{ dateString }}</span>
        </div>
        <div class="card__data">
          <svg class="card__icon">
            <use xlink:href="img/icons.svg#icon-flag"></use>
          </svg>
          <span v-if="tour.locations.length > 1">{{
            tour.locations.length + ' stops'
          }}</span>
          <span v-else-if="tour.locations.length == 1">{{
            tour.locations.length + ' stop'
          }}</span>
        </div>
        <div class="card__data">
          <svg class="card__icon">
            <use xlink:href="img/icons.svg#icon-user"></use>
          </svg>
          <span>{{ tour.maxGroupSize + ' people' }}</span>
        </div>
      </div>

      <div class="card__footer">
        <p>
          <span class="card__footer-value">{{ '$' + tour.price }}</span>
          <span class="card__footer-text"> per person</span>
        </p>
        <p class="card__ratings">
          <span class="card__footer-value">{{ tour.ratingsAverage }}</span>
          <span class="card__footer-text">
            {{ 'rating (' + tour.ratingsQuantity + ')' }}</span
          >
        </p>
        <router-link
          :to="{
            name: 'Details',
            params: {
              tourName: tourName,
              tourId: tour._id,
              dateString: dateString,
            },
          }"
          tag="button"
          class="btn btn__small"
          >Details
        </router-link>
      </div>
    </template>
  </Card>
</template>

<script>
import Card from 'primevue/card';
// import Button from 'primevue/button';

export default {
  data() {
    return {
      dateString: '',
    };
  },
  props: ['tour'],
  created() {
    this.getName();
  },
  computed: {
    tourName() {
      return this.tour.name.replaceAll(' ', '-').toLowerCase();
    },
  },
  methods: {
    getName() {
      const monthNames = [
        'January',
        'February',
        'March',
        'April',
        'May',
        'June',
        'July',
        'August',
        'September',
        'October',
        'November',
        'December',
      ];
      const today = new Date();
      const startDate = this.tour.startDates.reduce((a, b) => {
        const aDate = new Date(a);
        const bDate = new Date(b);
        const adiff = aDate - today;
        return adiff > 0 && adiff < bDate - today ? aDate : bDate;
      });
      const month = monthNames[startDate.getMonth()];
      const year = startDate.getFullYear();
      this.dateString = `${month} ${year}`;
    },
  },
  components: {
    Card,
    // Button,
  },
};
</script>

<style>
</style>
