<template>
  <div class="reviews__card">
    <div class="reviews__avatar">
      <img
        class="reviews__avatar-img"
        :src="'/img/users/' + review.user[0].photo"
        alt="Lourdes Browning"
      />
      <h6 class="reviews__user">{{ review.user[0].name }}</h6>
    </div>
    <p class="reviews__text">{{ review.review }}</p>
    <div class="reviews__rating">
      <svg
        v-for="(star, index) in 5"
        :key="star.id"
        :class="
          review.rating > index
            ? 'reviews__star reviews__star__active'
            : 'reviews__star reviews__star__inactive'
        "
      >
        <use xlink:href="/img/icons.svg#icon-star"></use>
      </svg>
    </div>
  </div>
</template>

<script>
export default {
  props: ['review'],
};
</script>

<style>
</style>
