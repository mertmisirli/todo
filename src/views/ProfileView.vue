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
                                <a :href="userName.profileLink">
                                    <div class="image-container">
                                        <img :src="`${userName.photoURL}`" alt="img" id="blah" width="100" height="100">
                                        <div class="icon-container">
                                            <a href="javascript:void(0);" class="img-edit-icon" @click="handleFileUpload">
                                                <i class="pi pi-user-edit"></i>
                                                <div class="profileupload">
                                                    <input type="file" id="imgInp" ref="fileInput" style="display: none"
                                                        @change="handleFileChange">
                                                </div>
                                            </a>
                                        </div>

                                    </div>
                                </a>
                            </div>
                            <div class="profile-contentname">
                                <h2>{{ userName.displayName }}</h2>
                            </div>
                        </div>
                    </div>
                </div>

                <form @submit="updateUserData">
                    <div class="row">
                        <div class="col-12 col-lg-5 mx-auto">
                            <label for="uname" class="form-label">Kullanıcı Adı</label>
                            <input type="text" class="form-control" id="uname" :value="`${userName.displayName}`"
                                required="">
                        </div>
                        <!--  -->
                        <div class="col-12 col-lg-5 mx-auto">
                            <label for="uid" class="form-label">Kullanıcı id</label>
                            <input type="text" class="form-control" id="uid" placeholder="" :value="`${userName.uid}`"
                                required="">
                        </div>


                        <div class="col-12 col-lg-5 mx-auto mt-4">
                            <label for="email" class="form-label">Email </label>
                            <input type="email" class="form-control" id="email" placeholder="you@example.com"
                                :value="`${userName.email}`">
                            <div class="invalid-feedback">
                                Lütfen Geçerli bir Email Girin </div>
                        </div>

                        <div class="col-12 col-lg-5 mx-auto mt-4">
                            <label for="phoneNumber" class="form-label">Telefon</label>
                            <input type="text" class="form-control" id="phoneNumber" :value="`${userName.phoneNumber}`"
                                required="">
                            <div class="invalid-feedback">
                                Lütfen Geçerli bir Numara Girin
                            </div>
                        </div>

                        <div class="col-12 col-lg-5 mx-auto mt-4">
                            <label for="password" class="form-label">Şifre</label>
                            <input type="password" class="form-control" id="password">
                        </div>

                        <div class="col-12 col-lg-5 mx-auto mt-4">
                            <label for="password-again" class="form-label">Şifre<span class="text-muted">(Tekrar)</span></label>
                            <input type="password" class="form-control" id="password-again">
                        </div>
                    </div>
                    <div class="col-12 col-lg-5 mx-auto mt-4">
                        <input type="submit" value="Güncelle" class="text-white me-4 bg-primary rounded-2 p-2"
                            style="background-image: linear-gradient( rgba(207, 62, 62, 0), rgb(64, 163, 180));">
                        <!-- <a href="javascript:void(0);" @click="resetData"
                            class="btn btn-cancel text-white rounded-2 px-4 py-2"
                            style="background-color: rgba(231, 151, 70, 0.836);">İptal</a> -->
                    </div>
                </form>
            </div>
        </div>
    </div>

    <Footer />
</template>

<script>

import Navbar from '../components/NavBar.vue'
import Footer from '../components/Footer.vue'
import { getStorage, ref, uploadBytes, getDownloadURL } from "firebase/storage";
import { getFirestore, collection, addDoc } from "firebase/firestore";
import firebaseConfig from '@/firebase/firebaseInit';

import { getAuth } from 'firebase/auth';

const db = getFirestore();
const storage = getStorage();

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

        },
        handleFileUpload() {
            this.$refs.fileInput.click(); // Dosya seçimi için input etiketini tetikle
        },
        handleFileChange(event) {
            const file = event.target.files[0]; // Seçilen dosya
            const downloadLink = this.saveImageToFirestore(file);

        },
        async saveImageToFirestore(file) {
            try {
                // Görsel dosyanın depolanacağı referansı oluşturun
                const storageRef = ref(storage, `images/${file.name}`);

                // Dosyayı yükleyin ve depolayın
                await uploadBytes(storageRef, file);

                // Dosyanın indirme URL'sini alın
                const downloadURL = await getDownloadURL(storageRef);

                // Firestore'da yeni bir belge oluşturun ve görsel URL'sini kaydedin
                const imageRef = await addDoc(collection(db, "images"), {
                    imageURL: downloadURL,
                    fileName: file.name
                });

                console.log("Görsel Firestore'a kaydedildi. Belge ID:", imageRef.id);
                return downloadURL;
            } catch (error) {
                console.error("Görseli Firestore'a kaydetme hatası:", error);
                return null;
            }
        },

         updateUserData(event) {
            event.preventDefault();
            const user = getAuth().currentUser;

            const form = event.target;

            // Inputların değerleri
            const firstName = form.elements.uname.value;
            const lastName = form.elements.uid.value;
            const email = form.elements.email.value;
            const phoneNumber = form.elements.phoneNumber.value;
            const password = form.elements.password.value;

            // Örnek: Konsola değerleri yazdıralım
            console.log('Ad:', firstName);
            console.log('Soyad:', lastName);
            console.log('Email:', email);
            console.log('Telefon:', phoneNumber);
            console.log('Şifre:', password);


            // user.updateUser(uid, {
            //     email: user.email, //
            //     phoneNumber: "+11234567890",
            //     emailVerified: true,
            //     password: "newPassword",
            //     displayName: "Jane Doe",
            //     disabled: true
            // })
            //     .then(function (userRecord) {
            //         // See the UserRecord reference doc for the contents of `userRecord`.
            //         console.log("Successfully updated user", userRecord.toJSON());
            //     })
            //     .catch(function (error) {
            //         console.log("Error updating user:", error);
            //     });
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
    position: absolute;
    bottom: 0;
    right: 0;
    background-color: red;
}
</style>