<template>
  <div class="main" v-if="dataFetched">
    <ul
      class="p-grid p-m-2 p-jc-center card-container"
      v-if="bookings.length != 0"
    >
      <li v-for="booking in bookings" :key="booking._id">
        <Tour :tour="booking" />
      </li>
    </ul>
    <h2 v-else>
      You don't have any bookings yet. Choose your first adventure
      <router-link to="Home"> here </router-link>
    </h2>
  </div>
</template>

<script>
import TourService from '@/services/TourService';
import Tour from '@/components/Tour.vue';

export default {
  data() {
    return {
      error: null,
      user: null,
      userID: '',
      bookings: [],
      dataFetched: false,
    };
  },
  async mounted() {
    try {
      this.user = this.$store.state.user;
      this.bookings = (await TourService.getMyTours(this.user)).data.data;
      this.dataFetched = true;
    } catch (error) {
      this.error = error.response.data;
    }
  },
  components: {
    Tour,
  },
};
</script>

<style>
</style>
