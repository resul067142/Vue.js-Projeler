<template>
     <div class="row">
                <div class="col-md-12">
                    <div class="card">
                        <div class="card-header">
                            <h5>Yeni Gönderi Yayınla</h5>
                        </div>
                        <div class="card-body">
                            <div class="row form-group">
                                <div class="col-sm-4">
                                    <label for="">Gönderi Başlığı</label>
                                </div>
                                <div class="col-sm-8">
                                    <input class="form-control" v-model="gonderi.baslik">    
                                </div>
                            </div>
                            <div class="row mt-3">
                                <vue-editor :useCustomImageHandler="true"  @image-added="handleImageAdded" v-model="gonderi.icerik" />
                            </div>
                        </div>
                        <div class="card-footer">
                            <div class="row">
                                <button class="btn btn-rounded btn-warning" style="float:right;" @click="gonderiYayinla()">
                                    <i class="fa fa-check"></i> Gönderi Yayınla
                                </button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
</template>

<script>
import firebase, { functions, firestore } from "firebase/app";
export default {
  name: "gonderiyayinla",
  computed: {
    mevcutUser() {
      return this.$store.getters.mevcutUser;
    },
  },
  data() {
    return {
      gonderi: {
        baslik: "",
        icerik: "",
      },
    };
  },
  methods: {
    async gonderiYayinla() {
      console.log("Deneme");
      var gonderi = {};
      gonderi.post = { ...this.gonderi };
      gonderi.user = this.mevcutUser;
      gonderi.yorumlar = [];
      gonderi.begeniler = [];
      gonderi.created = Math.floor(new Date("2012.08.10").getTime() / 1000);
      var db = firebase.firestore();
      var gonderiKayit = db.collection("gonderiler").add(gonderi);
      var gonderi = await (await (await gonderiKayit).get()).data();
      this.gonderi = {
        baslik: "",
        icerik: "",
      };
    },
    handleImageAdded: function (file, Editor, cursorLocation, resetUploader) {
      // An example of using FormData
      // NOTE: Your key could be different such as:
      // formData.append('file', file)
      console.log("start");
      var metadata = { contentType: "image/jpeg" };
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
            Editor.insertEmbed(cursorLocation, "image", downloadURL);
          });
        }
      );
    },
  },
};
</script>

<style>
.ql-container.ql-snow {
  max-height: 200px !important;
}
</style>