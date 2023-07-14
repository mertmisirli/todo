
<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">
    <div class="card relative z-2">
        <!--  -->
        <!--  -->
        <Menubar :model="items" style="background-color: rgb(255, 255, 255);">
            <template #start>
                <img alt="logo" src="../assets/yk_logo.png" height="40" class="mr-2" />
            </template>
            <template #end >
                <div class="header-element"> <!-- Start::header-link|dropdown-toggle -->
                    <a href="#" class="header-link dropdown-toggle text-decoration-none" id="mainHeaderProfile" data-bs-toggle="dropdown"
                        data-bs-auto-close="outside" aria-expanded="false">
                        <div class="d-flex align-items-center">
                            <div class="me-sm-2 me-0 mt-auto">
                                <img class="ProfilePhoto fluid rounded-2" :src="`${userInfo.photoURL}`" alt="Person"
                                    width="45" height="45">
                            </div>
                            <div class="d-sm-block d-none">
                                <!-- <p class="fw-semibold mb-0 lh-1">Json Taylor</p> -->
                                <p class="fw-semibold mb-0 lh-1 mt-1 mb-1" style="height: 15px;">{{ userInfo.displayName }}</p>
                                <span class="" style="height: 15px;">Hoşgeldiniz</span>
                            </div>
                        </div>
                    </a> <!-- End::header-link|dropdown-toggle -->
                    <ul class="main-header-dropdown dropdown-menu pt-0  overflow-hidden header-profile-dropdown dropdown-menu-end"
                        aria-labelledby="mainHeaderProfile" style="">
                        <li>
                            
                            <router-link :to="{ name: 'profile' }" class="" style="text-decoration: none;">
                                <a class="dropdown-item d-flex">
                                    <i class="pi pi-user fs-18 me-2 op-7"></i>Profil
                                </a>
                            </router-link>
                        </li>
                        <li>
                            <a class="dropdown-item d-flex" href="mail.html">
                                <i class="pi pi-envelope fs-18 me-2 op-7"></i>Mesaj
                                <span class="badge bg-success-transparent ms-auto">25</span>
                            </a>
                        </li>
                        
                        <li>
                            <router-link :to="{ name: 'login' }" class="" style="text-decoration: none;">
                                <a class="dropdown-item d-flex" @click="logout">
                                    <i class="pi pi-sign-out fs-18 me-2 op-7"></i>Çıkış Yap
                                </a>
                            </router-link>
                        </li>
                    </ul>
                </div>
            </template>
        </Menubar>
        <!--  -->
        <!--  -->


    </div>
</template>

<script>

export default {

    props: {
        userInfo: {

        }
    },

    data() {
        return {
            modalShow: false,
            profilePhoto: this.userInfo.photoUrl
        }
    },

    methods: {
        logout() {
            localStorage.removeItem('currentUser');
            //this.isAuthenticated = false;
            getAuth().signOut()
                .then(function () {
                    // Sign-out successful.
                    console.log("Çıkış yapıldı");
                    console.log("Props : " + this.userInfo);
                })
                .catch(function (error) {
                    // An error happened
                });
        },
    }
}

</script>

<script setup>
import { ref } from "vue";
import { getAuth, signInWithEmailAndPassword } from 'firebase/auth'
import firebaseConfig from '@/firebase/firebaseInit';
const visible = ref(false);


const items = ref([
    {
        label: 'Gib İşlemleri',
        icon: 'pi pi-file',
        to: 'gib',
        /*
        items: [
            {
                label: 'Getir',
                icon: 'pi pi-fw pi-file-import'
            },
            {
                label: 'Aktar',
                icon: 'pi pi-file-export'
            }
        ]
        */
    },
    {
        label: 'Bayi İşlemleri',
        icon: "bi bi-shop"
    }

])
</script>