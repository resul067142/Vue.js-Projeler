<template>
   <div class="col-md-4 vh-100 bg-dark bg-opacity-10">
            
            <div class="mt-3 d-flex direction-column justify-content-center" style="border:1px solid orangered;">
                <input type="file"  ref="resimUploadMain" @change="yuklemeHazirlik" v-if="resimYuklenecek"/>
                <img class="rounded mx-auto d-block" style="max-width: 150px"
                :src="mevcutUser.photo.length>0 ? mevcutUser.photo : 'https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg'"
                alt="" v-if="!resimYuklenecek">
                <button  v-if="!resimYuklenecek" class="btn btn-link btn-block" style="margin-left:35%;" @click="resimYuklenecek=true">
                    <i class="fa fa-edit"></i> Düzenle
                </button>
                  <button  v-else class="btn btn-warning btn-rounded" style="margin-left:35%;" @click="profilPhotosuGuncelle()">
                    <i class="fa fa-save"></i> Kaydet
                </button>
            </div>
            <div class="mt-3" style="text-align:center;">
                <label>Ad Soyad</label>
                <input class="form-control" v-model="nameSurname">

                <label>Email</label>
                <input class="form-control" v-model="email">

                <br>
                <button class="btn btn-rounded btn-warning" @click="saveNameSurname()">
                    <i class="fa fa-check"></i> Kaydet
                </button>
                
            </div>
           
          
        </div>
</template>

<script>
import firebase, { functions, firestore } from "firebase/app";
import { mapActions } from "vuex";

export default {
  name: "profilebaredit",
  created() {
    this.nameSurname = this.mevcutUser.nameSurname;
    this.email = this.mevcutUser.email;
  },
  computed: {
    mevcutUser() {
      return this.$store.getters.mevcutUser;
    },
  },
  data() {
    return {
      nameSurname: "",
      email: "",
      resimYuklenecek: false,
      file: {},
    };
  },
  methods: {
    ...mapActions(["setUser"]),
    async saveNameSurname() {
      var self = this;
      var db = firebase.firestore();
      var user = self.mevcutUser;
      var currentUser = await db
        .collection("user")
        .where("guid", "==", user.guid)
        .get();
      var docId = currentUser.docs[0].id;
      await db.collection("user").doc(docId).update({
        nameSurname: self.nameSurname,
        email: self.email,
      });
      var setEdilmisUser = await db
        .collection("user")
        .where("guid", "==", user.guid)
        .get();
      var setEdilecekUser = setEdilmisUser.docs[0].data();
      self.setUser(setEdilecekUser);
      self.resimYuklenecek = false;
    },
    yuklemeHazirlik(e) {
      console.log(this.$refs.resimUploadMain.files);
    },
    profilPhotosuGuncelle() {
      var files = this.$refs.resimUploadMain.files;
      var file = files[0];
      var metadata = { contentType: "image/jpeg" };
      var self = this;
      var db = firebase.firestore();

      var uploadTask = firebase
        .storage()
        .ref()
        .child("images/" + file.name)
        .put(file, metadata);
      uploadTask.on(
        firebase.storage.TaskEvent.STATE_CHANGED,
        (snapshot) => {},
        (err) => {
          console.log(err);
        },
        () => {
          uploadTask.snapshot.ref.getDownloadURL().then(async (downloadURL) => {
            var user = self.mevcutUser;
            var currentUser = await db
              .collection("user")
              .where("guid", "==", user.guid)
              .get();
            var docId = currentUser.docs[0].id;
            await db.collection("user").doc(docId).update({
              photo: downloadURL,
            });
            var setEdilmisUser = await db
              .collection("user")
              .where("guid", "==", user.guid)
              .get();
            var setEdilecekUser = setEdilmisUser.docs[0].data();
            self.setUser(setEdilecekUser);
            self.resimYuklenecek = false;
          });
        }
      );
    },
  },
};
</script>

<style>
</style>