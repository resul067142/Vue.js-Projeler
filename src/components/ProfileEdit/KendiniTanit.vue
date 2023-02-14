<template>
  <div class="row">
    <div class="col-md-12 p-3">
        <label for="">Başlık</label>
        <input class="form-control" placeholder="Kendinizi tanıtacağınız başlık" v-model="baslik">
    </div>
    <div class="col-md-12 p-3 mt-3">
         <vue-editor v-model="kisaAciklama" />
    </div>
    <div class="col-md-12 p-3 mt-3">
        <div class="btn btn-rounded btn-warning" @click="kaydet()">
            <i class="fa fa-save"></i> Kaydet
        </div>
    </div>
  </div>
</template>

<script>
import firebase, { functions, firestore } from "firebase/app";
import {mapActions} from "vuex";
export default {
  name: "kendinitanit",
  created() {
    console.log(this.mevcutUser);
    this.baslik = this.mevcutUser.kendiniTanit.baslik;
    this.kisaAciklama = this.mevcutUser.kendiniTanit.kisaAciklama;
  },
  data() {
    return {
      baslik: "",
      kisaAciklama: "",
    };
  },
  computed: {
    mevcutUser() {
        return this.$store.getters.mevcutUser;
    },
  },
  methods: {
    ...mapActions(["setUser"]),
    async kaydet() {
      var self = this;
      var db = firebase.firestore();
      var user = self.mevcutUser;
      var currentUser = await db
        .collection("user")
        .where("guid", "==", user.guid)
        .get();
      var docId = currentUser.docs[0].id;
      await db.collection("user").doc(docId).update({
        kendiniTanit:{
            baslik:self.baslik,
            kisaAciklama:self.kisaAciklama
        }
      });
      var setEdilmisUser = await db
        .collection("user")
        .where("guid", "==", user.guid)
        .get();
      var setEdilecekUser = setEdilmisUser.docs[0].data();
      self.setUser(setEdilecekUser);
      self.resimYuklenecek = false;
    },
  },
};
</script>

<style>
</style>