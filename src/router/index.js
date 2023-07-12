import { createRouter, createWebHistory } from 'vue-router'
import LoginView from '../views/Login.vue'
import  firebaseConfig from '@/firebase/firebaseInit';
import { getAuth, onAuthStateChanged } from "firebase/auth";
import { Promise } from 'core-js';
// import { projectAuth } from '@/firebase/config';
import HomeView from '../views/HomeView.vue'

const requireAuth = (async (to, from, next) => {
  const user = getAuth().getCurrentUser;
  const storedUser = localStorage.getItem("currentUser")
  
  if (await getCurrentUser() ) {
    localStorage.setItem("currentUser", user)

    

    getCurrentUser().then((data) => {
      //console.log(data.displayName); // Promise içindeki veriyi kullanabilirsiniz
      
      const dataSend = {
        'userInfo' : data,
      }
    to.meta.data = dataSend;

    }).catch((error) => {
      console.log(error); // Hata durumunda hata mesajını alabilirsiniz
    });


    next();
  } else {
    next({ name: 'login' });
  } 
});


const routes = [
  {
    path: '/',
    name: 'login',
    component: LoginView,
  },
  {
    path: '/home',
    name: 'home',
    component: HomeView
  },
  {
    path: '/about',
    name: 'about',
    // route level code-splitting
    // this generates a separate chunk (about.[hash].js) for this route
    // which is lazy-loaded when the route is visited.
    component: () => import(/* webpackChunkName: "about" */ '../views/AboutView.vue')
  },
  {
    path: '/gib',
    name: 'gib',
    component: () => import('../views/GibView.vue'),
    beforeEnter : requireAuth,
  },
  {
    path: '/profile',
    name: 'profile',
    component: () => import("../views/ProfileView.vue"),
    beforeEnter : requireAuth,
  },
  {
    path: '/:catchAll(.*)',
    name: 'notFound',
    component: () => import('../views/NotFound.vue')
  }
]

const router = createRouter({
  history: createWebHistory(),
  routes
})


const getCurrentUser = () => {
  return new Promise((resolve, reject) => {
    const removeListener = onAuthStateChanged(
      getAuth(),
      (user) => {
        removeListener();
        resolve(user);
      },
      reject

    );
  })
}

export default router
