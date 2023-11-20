import '@fontsource/dm-sans/400.css';
import '@fontsource/dm-sans/700.css';
import '@fontsource/jetbrains-mono';
import './main.css';

import { createPinia } from 'pinia';
import { createApp } from 'vue';
import { version } from '../package.json';
import App from './App.vue';
import router from './router';
import { printVersion } from './utils';

printVersion(version);

const app = createApp(App);

app.use(createPinia());
app.use(router);

app.mount('#root');
