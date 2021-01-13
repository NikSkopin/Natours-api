<template>
  <main class="main">
    <div class="login-form">
      <h2 class="heading-secondary ma-bt-lg">Create your account!</h2>
      <form class="form form--signup" @submit.prevent="signup">
        <div class="form__group">
          <label class="form__label" for="name">Your name</label
          ><input
            class="form__input"
            id="name"
            type="text"
            placeholder=""
            required
            v-model="name"
          />
        </div>
        <div class="form__group">
          <label class="form__label" for="email">Email address</label
          ><input
            class="form__input"
            id="email"
            type="email"
            placeholder="you@example.com"
            required
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
            v-model="password"
          />
        </div>
        <div class="form__group ma-bt-md">
          <label class="form__label" for="passwordConfirm"
            >Confirm password</label
          ><input
            class="form__input"
            id="passwordConfirm"
            type="password"
            placeholder="••••••••"
            required
            minlength="8"
            v-model="passwordConfirm"
          />
        </div>
        <Message severity="error" :closable="false" v-if="error">{{
          error.message
        }}</Message>
        <Message severity="success" :closable="false" v-if="success">
          You were registered successfully!
        </Message>
        <div class="form__group">
          <button class="btn btn--green" type="submit">Sign up</button>
        </div>
      </form>
    </div>
  </main>
</template>

<script>
import Message from 'primevue/message';
import AuthService from '@/services/AuthService';

export default {
  data() {
    return {
      name: '',
      email: '',
      password: '',
      passwordConfirm: '',
      error: null,
      success: false,
    };
  },
  methods: {
    async signup() {
      this.error = null;
      try {
        const response = await AuthService.signup({
          name: this.name,
          email: this.email,
          password: this.password,
          passwordConfirm: this.passwordConfirm,
        });
        if (response.status === 'success') {
          this.success = true;
        }
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
    Message,
  },
};
</script>

<style>
</style>
