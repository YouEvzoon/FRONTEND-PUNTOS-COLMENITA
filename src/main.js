
import { createApp } from 'vue';
import App from './App.vue';
import router from './router'; // Importar el enrutador

const app = createApp(App);
app.use(router); // Usar el enrutador en la instancia de Vue
app.mount('#app');
