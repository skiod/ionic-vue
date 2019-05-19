import Vue from 'vue'
import Router from 'vue-router'
import Home from './components/Home.vue'
import Login from './components/Login.vue';
import SignUp from './components/SignUp.vue';
import firebase from 'firebase';

Vue.use(Router)

 const router =  new Router({
    mode: 'history',
    base: process.env.BASE_URL,
    routes: [
        {
            path: '*',
            redirect: '/login'
        },
        {
            path: '/',
            redirect: '/login'
        },
        {
            path: '/login',
            name: 'login',
            component: Login
        },
        {
            path: '/signup',
            name: 'signup',
            component: SignUp
        },
        {
            path: '/home',
            name: 'home',
            component: Home,
            meta: {
                requiresAuth:true
            }
        }
    ]
})

router.beforeEach((to,from,next) => {
    const currentUser = firebase.auth().currentUser;
    const requiresAuth = to.matched.some(record => record.meta.requiresAuth);
    if(requiresAuth && !currentUser ) next('login')
    else if (!requiresAuth && currentUser ) next('home')
    else next() 
})

export default router;