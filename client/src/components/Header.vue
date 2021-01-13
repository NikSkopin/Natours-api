<template>
  <header class="header">
    <nav class="nav nav__tours">
      <router-link class="nav__el" to="/">all tours</router-link>
    </nav>
    <router-link to="/" class="header__logo">
      <img src="/img/logo-white.png" alt="Natours logo" />
    </router-link>
    <nav class="nav nav__user">
      <router-link to="/me" class="nav__el" v-if="$store.state.isUserLoggedIn">
        <img
          v-if="user.photo"
          v-bind:src="'/img/users/' + user.photo"
          alt="User photo"
          class="nav__user-img"
        />
        <img
          v-else
          v-bind:src="'img/users/default.jpg'"
          alt="User photo"
          class="nav__user-img"
        />
        <span>{{ user.name.split(' ')[0] }}</span>
      </router-link>
      <a
        href="#"
        class="nav__el"
        v-if="$store.state.isUserLoggedIn"
        @click="logout"
        >Logout</a
      >

      <button
        @click="$router.push({ path: '/login' })"
        class="nav__el"
        v-if="!$store.state.isUserLoggedIn"
      >
        Log in
      </button>
      <button
        @click="$router.push({ path: '/signup' })"
        class="nav__el nav__el--cta"
        v-if="!$store.state.isUserLoggedIn"
      >
        Sign up
      </button>
    </nav>
  </header>
</template>

<script>
import { mapState } from 'vuex';

import AuthService from '@/services/AuthService';

export default {
  data() {
    return {
      error: null,
    };
  },
  computed: {
    ...mapState(['user']),
  },
  methods: {
    async logout() {
      try {
        // This is only for authentication with cookie
        await AuthService.logout();

        // This is for authentication with token
        this.$store.dispatch('setToken', null);
        this.$store.dispatch('setUser', null);
        if (this.$route.name !== 'Home') {
          this.$router.push({
            name: 'Home',
          });
        }
      } catch (error) {
        this.error = error.response.data;
      }
    },
  },
};
</script>

<style>
</style>
