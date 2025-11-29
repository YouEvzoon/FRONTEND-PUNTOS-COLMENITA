
<template>
  <div id="app">
    <div class="main-content">
      <router-view />
    </div>
    <HeaderView v-if="mostrarHeader" />
  </div>
</template>

<script>
import HeaderView from './components/Header.vue';
export default {
  name: 'App',
  components: { HeaderView },
  computed: {
    mostrarHeader() {
      const noHeaderRoutes = ['/', '/registro'];
      return !noHeaderRoutes.includes(this.$route.path);
    }
  }
}
</script>

<style>
html, body {
  margin: 0;
  padding: 0;
  height: 100%;
  box-sizing: border-box;
}

#app {
  font-family: Avenir, Helvetica, Arial, sans-serif;
  -webkit-font-smoothing: antialiased;
  -moz-osx-font-smoothing: grayscale;
  text-align: center;
  color: #2c3e50;
  margin-top: 0;
  height: 100%;
}

.main-content {
  min-height: calc(100vh - 60px); /* Altura del header fijo */
  padding-bottom: 60px; /* Espacio para el header inferior */
}
@media (max-width: 600px) {
  .main-content {
    min-height: calc(100vh - 54px);
    padding-bottom: 54px;
  }
}
</style>
