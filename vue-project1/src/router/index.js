import { createRouter, createWebHistory } from "vue-router";
import Home from "../views/Home.vue";
import firebase from "firebase";

const routes = [
  {
    path: "/",
    name: "Home",
    component: Home,
  },
  {
    path: "/item/:id?",
    name: "Item",
    component: () => import(/* webpackChunkName: "item" */ "../views/Item.vue"),
    meta: {
      authRequired: true,
    },
  },
];

const router = createRouter({
  history: createWebHistory(process.env.BASE_URL),
  routes,
});

router.beforeEach((to, from, next) => {
  if (to.matched.some((record) => record.meta.authRequired)) {
    if (firebase.auth().currentUser) {
      next();
    } else {
      console.log("not without logging in");
      next({ path: "/" });
    }
  } else {
    next();
  }
});

export default router;
