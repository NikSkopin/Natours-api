<template>
  <div>
    <Loader v-show="!dataFetched" />
    <section v-if="dataFetched" class="section-header">
      <div class="header__hero">
        <div class="header__hero-overlay">&nbsp;</div>
        <img
          class="header__hero-img"
          :src="'/img/tours/' + tour.imageCover"
          :alt="tour.name"
        />
      </div>
      <div class="heading-box">
        <h1 class="heading-primary">
          <span>{{ tour.name }} tour</span>
        </h1>
        <div class="heading-box__group">
          <div class="heading-box__detail">
            <svg class="heading-box__icon">
              <use xlink:href="/img/icons.svg#icon-clock"></use></svg
            ><span class="heading-box__text">{{ tour.duration }} days</span>
          </div>
          <div class="heading-box__detail">
            <svg class="heading-box__icon">
              <use xlink:href="/img/icons.svg#icon-map-pin"></use></svg
            ><span class="heading-box__text">{{
              tour.startLocation.description
            }}</span>
          </div>
        </div>
      </div>
    </section>
    <section class="section-description p-d-flex p-flex-column p-flex-md-row">
      <div class="overview-box">
        <div>
          <div class="overview-box__group">
            <h2 class="heading-secondary ma-bt-lg">Quick facts</h2>
            <div class="overview-box__detail">
              <svg class="overview-box__icon">
                <use xlink:href="/img/icons.svg#icon-calendar"></use></svg
              ><span class="overview-box__label">Next date</span
              ><span class="overview-box__text">{{ dateString }}</span>
            </div>
            <div class="overview-box__detail">
              <svg class="overview-box__icon">
                <use xlink:href="/img/icons.svg#icon-trending-up"></use></svg
              ><span class="overview-box__label">Difficulty</span
              ><span class="overview-box__text">{{ tour.difficulty }}</span>
            </div>
            <div class="overview-box__detail">
              <svg class="overview-box__icon">
                <use xlink:href="/img/icons.svg#icon-user"></use></svg
              ><span class="overview-box__label">Participants</span
              ><span class="overview-box__text">{{
                tour.maxGroupSize + ' people'
              }}</span>
            </div>
            <div class="overview-box__detail">
              <svg class="overview-box__icon">
                <use xlink:href="/img/icons.svg#icon-star"></use></svg
              ><span class="overview-box__label">Rating</span
              ><span class="overview-box__text"
                >{{ tour.ratingsAverage }} / 5</span
              >
            </div>
          </div>
          <div class="overview-box__group">
            <h2 class="heading-secondary ma-bt-lg">Your tour guides</h2>

            <ul>
              <li
                v-for="guide in tour.guides"
                :key="guide._id"
                class="overview-box__detail"
              >
                <img
                  class="overview-box__img"
                  v-bind:src="'/img/users/' + guide.photo"
                  alt="Miyah Myles"
                /><span class="overview-box__label">{{
                  guide.role.split('-').join(' ')
                }}</span
                ><span class="overview-box__text">{{ guide.name }}</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
      <div class="description-box">
        <h2 class="heading-secondary p-mb-5 ma-bt-lg">
          About {{ tour.name }} tour
        </h2>
        <p class="description__text">
          {{ tour.description }}
        </p>
      </div>
    </section>
    <section class="section-pictures p-d-flex p-flex-md-row">
      <div
        class="picture-box"
        v-for="(pic, index) in tour.images"
        :key="pic.index"
        @click="displayGallery = true"
      >
        <img
          v-bind:class="'picture-box__img picture-box__img__' + (index + 1)"
          :src="'/img/tours/' + pic"
          :alt="tour.name + 'Tour' + (index + 1)"
        />
      </div>
    </section>
    <section class="section-map">
      <Map :tour="tour" />
    </section>
    <Carousel
      :value="tour.reviews"
      :numVisible="3"
      :numScroll="3"
      :circular="false"
      :responsiveOptions="responsiveOptions"
      class="section-reviews"
    >
      <template #item="slotProps">
        <Review :review="slotProps.data" />
      </template>
    </Carousel>

    <section class="section-cta">
      <div class="cta">
        <div class="cta__img-container">
          <div class="cta__img cta__img__logo">
            <img src="/img/logo-white.png" alt="Natours logo" />
          </div>
          <img
            class="cta__img cta__img__1"
            :src="'/img/tours/' + tour.imageCover.split('cover')[0] + '2.jpg'"
            alt="Tour picture"
          /><img
            class="cta__img cta__img__2"
            :src="'/img/tours/' + tour.imageCover.split('cover')[0] + '3.jpg'"
            alt="Tour picture"
          />
        </div>
        <div class="cta__content">
          <h2 class="heading-secondary">What are you waiting for?</h2>
          <p class="cta__text">
            {{ tour.duration }} days. 1 adventure. Infinite memories. Make it
            yours today!
          </p>
          <button
            class="btn btn__green"
            id="book-tour"
            v-if="$store.state.isUserLoggedIn"
            @click="checkout"
          >
            Book tour now!
          </button>
          <button
            class="btn btn__green"
            id="book-tour"
            v-else
            @click="$router.push({ name: 'Login' })"
          >
            Log in to book this tour
          </button>
        </div>
      </div>
    </section>
    <Galleria
      :value="images"
      :responsiveOptions="responsiveOptions"
      :numVisible="7"
      containerStyle="max-width: 850px"
      :circular="true"
      :fullScreen="true"
      :showItemNavigators="true"
      :showThumbnails="false"
      :visible.sync="displayGallery"
    >
      <template #item="slotProps">
        <img
          :src="slotProps.item"
          alt="Tour image"
          style="width: 100%; display: block"
        />
      </template>
      <template #thumbnail="slotProps">
        <img
          :src="slotProps.item.thumbnailImageSrc"
          :alt="slotProps.item.alt"
          style="display: block"
        />
      </template>
    </Galleria>
  </div>
</template>

<script>
import Map from '@/components/Map.vue';
import Review from '@/components/Review.vue';
import TourService from '@/services/TourService';
import BookingService from '@/services/BookingService';
import Loader from '@/components/Loader.vue';

import Carousel from 'primevue/carousel';
import Galleria from 'primevue/galleria';

export default {
  data() {
    return {
      dataFetched: false,
      error: null,
      tour: null,
      publishableKey:
        'pk_test_51I3IN8AghwMwoaPNgxGa52hIxFUgLxx5AdXUck5LY1EZT6gJVrnxtf1GDuIMQCkNZ26zZxrR7fkQJhyZq6jkSdYO002LqDuKkt',
      sessionId: null,
      stripe: null,
      displayGallery: false,
      responsiveOptions: [
        {
          breakpoint: '640px',
          numVisible: 1,
          numScroll: 1,
        },
        {
          breakpoint: '960px',
          numVisible: 2,
          numScroll: 2,
        },
        {
          breakpoint: '1080px',
          numVisible: 3,
          numScroll: 3,
        },
      ],
    };
  },
  props: ['tourName', 'tourId', 'dateString'],

  mounted() {
    this.configureStripe();

    this.getTour();
  },
  methods: {
    async getTour() {
      this.dataFetched = false;

      this.error = null;
      this.slug = window.location.href.split('/').pop();

      try {
        [this.tour] = (await TourService.getTourSlug(this.slug)).data.data.data;
        this.images = this.tour.images.map((img) => `/img/tours/${img}`);
        this.dataFetched = true;
      } catch (error) {
        this.error = error.response.data.error;
      }
    },
    configureStripe() {
      this.stripe = window.Stripe(this.publishableKey);
    },
    async checkout() {
      try {
        const session = await BookingService.booking(this.tour.id);
        this.sessionId = session.data.session.id;

        await this.stripe.redirectToCheckout({
          sessionId: this.sessionId,
        });
      } catch (error) {
        this.error = error;
      }
    },
  },
  components: {
    Map,
    Review,
    Carousel,
    Loader,
    Galleria,
  },
};
</script>

<style>
</style>
