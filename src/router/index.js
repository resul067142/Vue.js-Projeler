import Vue from 'vue'
import Router from 'vue-router'
import AnaSayfa from '../pages/AnaSayfa';
import Login from "../pages/Login";
import Logout from "../pages/Logout";
import SignUp from "../pages/Signup";
import Profile from "../pages/Profile/Index"
import ProfileUrl from "../pages/Profile/_Url.vue"

Vue.use(Router);

var router = new Router({
  routes: [
    {
      path: '/',
      name: 'AnaSayfa',
      component: AnaSayfa,
      meta: { girisGerekli: true }
    },
    {
      path: "/login",
      name: "Login",
      component: Login
    },
    {
      path: '/signup',
      name: "SignUp",
      component: SignUp
    },
    {
      path: '/logout',
      name: "Logout",
      component: Logout,
    },
    {
      path: '/profile',
      name: 'Profile',
      component: Profile,
      meta: { girisGerekli: true }
    },
    {
      path: '/profile/:guid',
      name: 'ProfileDetail',
      component: ProfileUrl,
      meta: { girisGerekli: true }
    }
  ]
});

router.beforeEach((to, from, next) => {
  if (to.matched.some(route => route.meta.girisGerekli)) {
    if (localStorage.getItem('login') == null) {
      next({ path: '/login' });
    } else {
      next();
    }
  } else {
    next();
  }



})


export default router;

