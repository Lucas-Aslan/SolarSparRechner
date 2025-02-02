import { createApp } from 'vue';
import App from './App.vue';
import store from './store'; // Importiere den Store
import vuetify from './plugins/vuetify'; // Dein Vuetify-Plugin
import router from "./store";

createApp(App)
  .use(store)
  .use(router)
  .use(vuetify)
  .mount('#app');

// Vue App erstellen
const app = createApp(App);
app.use(store); // Store hinzufügen
app.use(vuetify); // Vuetify hinzufügen
app.mount('#app');
