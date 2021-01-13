<template>
  <main class="main">
    <div
      @click="menuOpened = !menuOpened"
      v-bind:class="[
        'menu_button',
        menuOpened ? 'menu_button__close' : 'menu_button__open',
      ]"
    >
      <div
        :class="
          menuOpened ? 'menu_button__arrow-left' : 'menu_button__arrow-right'
        "
      ></div>
    </div>
    <div class="user-view">
      <nav
        :class="[
          'user-view__menu',
          menuOpened ? 'user-view__menu-opened' : 'user-view__menu-closed',
        ]"
      >
        <ul class="side-nav">
          <li class="side-nav__active">
            <a href="#"
              ><svg><use xlink:href="img/icons.svg#icon-settings"></use></svg
              >Settings</a
            >
          </li>
          <li>
            <a href="/my-tours"
              ><svg><use xlink:href="img/icons.svg#icon-briefcase"></use></svg
              >My bookings</a
            >
          </li>
          <li>
            <a href="#"
              ><svg><use xlink:href="img/icons.svg#icon-star"></use></svg>My
              reviews</a
            >
          </li>
          <li>
            <a href="#"
              ><svg>
                <use xlink:href="img/icons.svg#icon-credit-card"></use></svg
              >Billing</a
            >
          </li>
        </ul>
      </nav>
      <div
        :class="[
          'user-view__content',
          menuOpened ? 'user-view__content-closed' : '',
        ]"
      >
        <div class="user-view__form-container">
          <h2 class="heading-secondary ma-bt-md">Your account settings</h2>
          <form class="form form-user-data" @submit.prevent="changeName">
            <div class="form__group">
              <label class="form__label" for="name">Name</label
              ><input
                class="form__input"
                id="name"
                type="text"
                :placeholder="user.name"
                name="name"
                v-model="newName"
              />
            </div>
            <div class="form__group ma-bt-md">
              <label class="form__label" for="email">Email address</label
              ><input
                class="form__input"
                id="email"
                type="email"
                :placeholder="user.email"
                name="email"
                v-model="newEmail"
              />
            </div>
            <div class="form__group form__photo-upload">
              <img
                class="form__user-photo"
                :src="'/img/users/' + user.photo"
                alt="User photo"
              /><input
                class="form__upload"
                type="file"
                accept="image/*"
                id="photo"
                name="photo"
                ref="photo"
                @change="addFile"
              /><label for="photo">Choose new photo</label>
            </div>
            <div class="form__group right">
              <button class="btn btn__small btn__green" type="submit">
                Save settings
              </button>
            </div>
          </form>
        </div>
        <div class="line">&nbsp;</div>
        <div class="user-view__form-container">
          <h2 class="heading-secondary ma-bt-md">Password change</h2>
          <form
            class="form form-user-password"
            @submit.prevent="changePassword"
          >
            <div class="form__group">
              <label class="form__label" for="password-current"
                >Current password</label
              ><input
                class="form__input"
                id="password-current"
                type="password"
                placeholder="••••••••"
                required
                minlength="8"
                v-model="passwordCurrent"
              />
            </div>
            <div class="form__group">
              <label class="form__label" for="password">New password</label
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
            <div class="form__group ma-bt-lg">
              <label class="form__label" for="password-confirm"
                >Confirm password</label
              ><input
                class="form__input"
                id="password-confirm"
                type="password"
                placeholder="••••••••"
                required
                minlength="8"
                v-model="passwordConfirm"
              />
            </div>
            <div class="form__group right">
              <button
                type="submit"
                class="btn btn__small btn__green btn__save-password"
                v-show="!loading"
              >
                Save password
              </button>
              <progressSpinner v-show="loading" strokeWidth="4" />
            </div>
          </form>
        </div>
      </div>
    </div>
  </main>
</template>

<script>
import { mapState } from 'vuex';
import AuthService from '@/services/AuthService';
import ProgressSpinner from 'primevue/progressspinner';

export default {
  data() {
    return {
      error: null,
      newName: null,
      newEmail: null,
      passwordCurrent: null,
      password: null,
      passwordConfirm: null,
      loading: false,
      file: [],
      menuOpened: false,
    };
  },

  computed: mapState({
    user: (state) => state.user,
  }),
  methods: {
    addFile() {
      [this.file] = this.$refs.photo.files;
    },
    async changeName() {
      try {
        if (!this.newName) this.newName = this.user.name;
        if (!this.newEmail) this.newEmail = this.user.email;

        const form = new FormData();
        form.append('name', this.newName);
        form.append('email', this.newEmail);
        form.append('photo', this.file);

        const response = await AuthService.updateMe(form);
        // TODO add message 'Data updated successfully' if res.status == success
        // and error if something went wrong
        this.$store.dispatch('setUser', response.data.data.user);
        this.newName = null;
        this.newEmail = null;
      } catch (error) {
        this.error = error.response.data;
      }
    },
    async changePassword() {
      try {
        this.loading = true;
        await AuthService.updateMyPassword({
          passwordCurrent: this.passwordCurrent,
          password: this.password,
          passwordConfirm: this.passwordConfirm,
        });
        this.loading = false;

        this.passwordCurrent = null;
        this.password = null;
        this.passwordConfirm = null;
      } catch (error) {
        this.error = error.response.data;
      }
    },
  },

  components: { ProgressSpinner },
};
</script>

<style>
</style>
