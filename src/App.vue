<template>
  <div>
    <router-view/>
  </div>
</template>

<script>
  export default {
    methods: {
      anasayfa(){
        this.$router.push({name:'home'})
      },
      geri(){
        this.$router.go(-1)
      },
      ileri(){
        this.$router.go(1)
      }
    },
  }
</script>

<script setup>
import { onMounted, ref } from "vue";
import { getAuth, onAuthStateChanged,signOut } from "firebase/auth";
import  router  from "./router/index";

const isLoggedIn = ref(false);

let auth;
onMounted(() => {
  auth = getAuth();
  onAuthStateChanged(auth, (user) => {
    if (user) {
      isLoggedIn.value = true;
    }else{
      isLoggedIn.value = false;
    }
  })
});
const handleSignOut = () => {
  signOut(auth).then(() => {
    router.push("/")
  });
};

</script>

<style>
  #app {
    font-family: Avenir, Helvetica, Arial, sans-serif;
    -webkit-font-smoothing: antialiased;
    -moz-osx-font-smoothing: grayscale;
    text-align: center;
    color: #2c3e50;
  }

  nav {
    padding: 30px;
  }

  nav a {
    font-weight: bold;
    color: #2c3e50;
  }

  nav a.router-link-exact-active {
    color: #42b983;
  }

  span{
    padding: 20px 10px;
    cursor: pointer;
  }
</style>
