import { createApp } from '@vue/runtime-dom';
import App, { test } from './index_vue';

const app = createApp(App)
app.mount(document.body);
console.log(app, test);
