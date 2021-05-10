import { createApp } from "vue";
import App from "./App.vue";
import router from "./router";
import store from "./store";
import firebase from "firebase";

// No need to hide these
const firebaseConfig = {
  apiKey: "AIzaSyBUjKZAS6LB6sc1oAoH38L0zzL1Zz-cj2A",
  authDomain: "careventron.firebaseapp.com",
  databaseURL: "https://careventron.firebaseio.com",
  projectId: "careventron",
  storageBucket: "careventron.appspot.com",
  messagingSenderId: "759885170441",
  appId: "1:759885170441:web:df0266559292fad7f975d8",
  measurementId: "G-F0KPMQ9E5R",
};
// Initialize Firebase

firebase.initializeApp(firebaseConfig);

firebase.auth().onAuthStateChanged((user) => {
  console.log("auth changed", user);
  store.dispatch("setUser", user);
});

import PrimeVue from "primevue/config";
import Button from "primevue/button";
import Menubar from "primevue/menubar";
import Avatar from "primevue/avatar";
import OverlayPanel from "primevue/overlaypanel";
import Card from "primevue/card";
import InputText from "primevue/inputtext";
import Textarea from "primevue/textarea";

import "primevue/resources/themes/saga-blue/theme.css"; // theme
import "primevue/resources/primevue.min.css"; // core
import "primeicons/primeicons.css"; // icons
import "primeflex/primeflex.css";

const app = createApp(App);
app.use(store);
app.use(router);
app.use(PrimeVue);

app.component("Button", Button);
app.component("Menubar", Menubar);
app.component("Avatar", Avatar);
app.component("OverlayPanel", OverlayPanel);
app.component("Card", Card);
app.component("InputText", InputText);
app.component("TextArea", Textarea);

app.mount("#app");

// createApp(App).use(store).use(router).use(PrimeVue).mount("#app");
