<template>
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css">
    <link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/bootstrap-icons@1.10.5/font/bootstrap-icons.css">

    <Navbar :userInfo="userName" />
    <div class="content container">
        <div class="card">
            <div class="card-body">
                <div class="profile-set">
                    <div class="profile-head">
                        <h4 class="pt-3" style="color:rgb(240, 241, 241);">Kullanıcı Bilgileri</h4>
                    </div>
                    <div class="profile-top">
                        <div class="profile-content">
                            <div class="profile-contentimg">
                                <img :src="`${userName.photoURL}`" alt="img" id="blah" width="100" height="100">

                                <div class="profileupload">
                                    <input type="file" id="imgInp">
                                    <a href="javascript:void(0);"><i class="pi pi-user-edit"></i></a>
                                </div>
                            </div>
                            <div class="profile-contentname">
                                <h2>{{ userName.displayName }} </h2>
                            </div>
                        </div>
                    </div>
                </div>

                <div class="row rounded-2  p-2">
                    <div class="col-12 col-md-6 mt-2">
                        <div class="form-group">
                            <label class="col-3">Ad</label>
                            <input class="col-9 rounded-2 p-2" type="text" placeholder="William"
                                :value="`${userName.displayName}`">
                        </div>
                    </div>
                    <div class="col-12 col-md-6 mt-2">
                        <div class="form-group">
                            <label class="col-3">Kullanıcı Id</label>
                            <input class="col-9 rounded-2 p-2" type="text" placeholder="Castilo" :value="`${userName.uid}`">
                        </div>
                    </div>
                    <div class="col-12 col-md-6 mt-2">
                        <div class="form-group">
                            <label class="col-3">Email</label>
                            <input class="col-9 rounded-2 p-2" type="text" placeholder="william@example.com"
                                :value="`${userName.email}`">
                        </div>
                    </div>
                    <div class="col-12 col-md-6 mt-2">
                        <div class="form-group">
                            <label class="col-3">Telefon</label>
                            <input class="col-9 rounded-2 p-2" type="text" placeholder="+1452 876 5432"
                                :value="`${userName.phoneNumber}`">
                        </div>
                    </div>
                    <div class="col-12 col-md-6 mt-2">
                        <div class="form-group">
                            <label class="col-3">Kullanıcı Adı</label>
                            <input class="col-9 rounded-2 p-2" type="text" placeholder="+1452 876 5432"
                                :value="`${userName.tokensValidAfterTimestamp}`">
                        </div>
                    </div>
                    <div class="col-12 col-md-6 mt-2">
                        <div class="form-group">
                            <label class="col-3">Şifre</label>
                            <input type="password" class=" pass-input col-9 rounded-2 p-2">
                        </div>
                    </div>
                    <div class="col-12 mt-5">
                        <a href="javascript:void(0);" @click="updateUser"
                            class="btn btn-submit text-white me-4 bg-primary rounded-2 p-2"
                            style="background-image: linear-gradient( rgba(207, 62, 62, 0), rgb(64, 163, 180));">Güncelle</a>
                        <a href="javascript:void(0);" @click="resetData"
                            class="btn btn-cancel text-white rounded-2 px-4 py-2"
                            style="background-color: rgba(231, 151, 70, 0.836);">İptal</a>
                    </div>
                </div>
            </div>
        </div>
    </div>
</template>

<script>

import Navbar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
import { getAuth } from 'firebase/auth';

export default {
    components: {
        Navbar,
        Footer
    },
    data() {
        return {
            userName: '',
        }
    },

    methods: {
        updateUser() {

        },
        resetData() {

        }
    },
    mounted() {
        const data = this.$route.meta.data;
        //this.userName = getAuth().getCurrentUser;
        this.userName = data['userInfo'];

    },
}
</script>

<script setup>

</script>

<style>
.header {
    background: #FF9F43;
    background: #fff;
    border-bottom: 1px solid #DEE2E6;
    height: 60px;
    z-index: 999;
    position: fixed;
    top: 0;
    right: 0;
    left: 0;
}

.profile-set .profile-head {
    height: 109px;
    background: linear-gradient(90deg, #EA5455 0%, #FF9F43 100%);
    border-radius: 0 10px 0 0;
}

.card {
    position: relative;
    display: flex;
    flex-direction: column;
    min-width: 0;
    word-wrap: break-word;
    background-color: #fff;
    background-clip: border-box;
    border: 1px solid rgba(0, 0, 0, .125);
    border-radius: 0.25rem;
}

.card-body {
    flex: 1 1 auto;
    padding: 1rem 1rem;
}

.profile-set {
    margin-bottom: 30px;
}

.profile-top {
    justify-content: space-between;
    -webkit-justify-content: space-between;
    -ms-flex-pack: space-between;
}

.profile-content .profile-set .profile-top {
    display: -webkit-box;
    display: -ms-flexbox;
    display: flex;
}

.profile-set .profile-top .profile-contentimg img {
    border-radius: 50px;
}

.profile-set .profile-top .profileupload a {
    background: #FF9F43;
    width: 34px;
    height: 34px;
    z-index: 1;
    border-radius: 50px;
    position: absolute;
    bottom: 10px;
    left: 41px;
}
</style>