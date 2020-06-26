import Vue from "vue";
import VueRouter from "vue-router";
import store from "../store";

import AuthHandler from "../views/AuthHandler.vue";
import ImageList from "../views/ImageList.vue";
import UploadForm from "../views/UploadForm.vue";
Vue.use(VueRouter);

const routes = [
  {
    path: "/oauth2/callback",
    name: "AuthHandler",
    component: AuthHandler,
  },
  {
    path: "/",
    name: "ImageList",
    component: ImageList,
  },
  {
    path: "/upload",
    name: "UploadForm",
    component: UploadForm,
  },
];

const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

router.beforeEach((to, from, next) => {
  // 로그인 안하면 접근 불가 페이지로 가려 하면, name이 추가 될때마다 집어 넣으면 됨
  const authRequiredPages = ["UploadForm"];
  const authRequired = authRequiredPages.includes(to.name); //True, False 로 나타내기 위해서 사용하는 것

  const isLoggedIn = store.getters.isLoggedIn;
  // const {isLoggedIn} = store.getters 위와 같은 코드임
  // const {isLoggedIn, allImages} = store.getters

  if (authRequired && !isLoggedIn) {
    // 인증해야하는데, 로그인 안했을 때
    next("/");
  } else {
    // 인증해야하는데, 로그인 했을 때
    next();
  }
  console.log(to);
  console.log(from);
});

export default router;
