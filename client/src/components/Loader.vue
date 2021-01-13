<template>
  <div id="loader-bg">
    <progressSpinner id="loader" strokeWidth="4" />
  </div>
</template>

<script>
import ProgressSpinner from 'primevue/progressspinner';

export default {
  components: { ProgressSpinner },
};
</script>

<style>
#loader-bg {
  bottom: 0;
  left: 0;
  position: fixed;
  right: 0;
  top: 0;
  background: #fff;
  opacity: 0.5;
  display: flex;
  justify-content: center;
  align-items: center;
  overflow: hidden;
  z-index: 9999;
}
#loader {
  opacity: 1;
}
</style>
