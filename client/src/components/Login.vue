<template>
  <div class="main">
    <div class="login-form">
      <h2 class="heading-secondary">Log into your account</h2>
      <form class="form form--login" @submit.prevent="login">
        <div class="form__group">
          <label class="form__label" for="email">Email address</label
          ><input
            class="form__input"
            id="email"
            type="email"
            placeholder="you@example.com"
            required
            name="email"
            v-model="email"
          />
        </div>
        <div class="form__group ma-bt-md">
          <label class="form__label" for="password">Password</label
          ><input
            class="form__input"
            id="password"
            type="password"
            placeholder="••••••••"
            required
            minlength="8"
            name="password"
            v-model="password"
          />
        </div>
        <Message severity="error" :closable="false" v-if="error">{{
          error.message
        }}</Message>
        <div class="form__group">
          <button class="btn btn--green" type="submit">Login</button>
        </div>
      </form>
    </div>
  </div>
</template>

<script>
import AuthService from '@/services/AuthService';
// import InlineMessage from 'primevue/inlinemessage';
import Message from 'primevue/message';

export default {
  data() {
    return {
      email: '',
      password: '',
      error: null,
    };
  },
  methods: {
    async login() {
      this.error = null;
      try {
        const response = await AuthService.login({
          email: this.email,
          password: this.password,
        });
        this.$store.dispatch('setToken', response.data.token);
        this.$store.dispatch('setUser', response.data.data.user);
        this.$router.push({
          name: 'Home',
        });
      } catch (error) {
        this.error = error.response.data;
      }
    },
  },
  components: {
    // InlineMessage,
    Message,
  },
};
</script>

<style>
</style>
