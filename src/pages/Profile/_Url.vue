<template>
  <div class=container>
      <div class="row coverImage" ></div>
      <div class="row">
        <div class="col-md-2">
          <img :src="user.photo" class="img imgProfile">
          
        </div>
        <div class="col-md-10" style="margin-left:100px;">
          {{user.kendiniTanit.baslik}}
          <div v-html="user.kendiniTanit.kisaAciklama"></div>
        </div>
        </div>
        <div class="row" style="padding-left:100px">
          <div class="col-md-2">
         
            <table class="table">
              <tbody>
                <tr>
                  <td>{{user.nameSurname}}</td>
                </tr>
                <tr>
                  <td>{{user.email}}</td>
                </tr>
              </tbody>
            </table>
            <table class="table">
              <thead>
                <tr>
                  <th>Üstüne Tıklayarak Yeteneklere Oy Verebilirsiniz</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="yetenek in user.yetenekler" :key="yetenek">
                  <td style="cursor:pointer;" @click="yetenekPuaniAyarla(yetenek)">{{yetenek}}</td>
                </tr>
              </tbody>
            </table>
        
          </div>
          <div class="col-md-10 akis">
            <div class="row"  v-for="(gonderi,index) in gonderiler" :key="index">
                <gonderiicerik class="mt-3" :gonderi="gonderi"  :mevcutUser="mevcutUser"></gonderiicerik>
                <begeniler style="background: gainsboro;border-radius: 10px;margin-top: -20px;z-index: 999;width: 90%;" :item="gonderi"></begeniler>
                <yorum-akislari style="border: 2px solid #003580;border-radius: 10px;margin-top: -20px;" :item="gonderi"></yorum-akislari>
            </div>
              
              
          </div>

        </div>
      
      <div class="modal fade" id="oylamaModal" tabindex="-1" role="dialog" aria-labelledby="exampleModalLabel" aria-hidden="true">
        <div class="modal-dialog" role="document">
          <div class="modal-content">
            <div class="modal-header">
              <h5 class="modal-title" id="exampleModalLabel">{{secilenYetenek}}</h5>
              <button type="button" class="close" data-dismiss="modal" @click="oylamaVazgec()" aria-label="Close">
                <span aria-hidden="true">&times;</span>
              </button>
            </div>
            <div class="modal-body">
                <label for="customRange1" class="form-label">Oyunuz : {{kullaniciPuani}}</label>
                <input type="range" class="form-range" id="customRange1" v-model="kullaniciPuani">
            </div>
            <div class="modal-footer">
              <button type="button" class="btn btn-secondary" data-dismiss="modal"  @click="oylamaVazgec()">Vazgeç</button>
              <button type="button" class="btn btn-primary" @click="oyuKaydet()">Oyu Kaydet</button>
            </div>
          </div>
        </div>
      </div>
  </div>
</template>

<script>
//url olarak kullanıcı guid'si verildiğinde o kullanıcının profil sayfasına yönlendirme yapılacak
import firebase, { functions, firestore } from "firebase/app";
import gonderiicerik from "../../components/GonderiAkislari/GonderiIcerik.vue";
import YorumAkislari from "../../components/GonderiAkislari/YorumAkislari.vue";
import begeniler from "../../components/GonderiAkislari/Begeniler.vue";
export default {
  name: "profiledetay",
  components: { gonderiicerik, YorumAkislari, begeniler },
  data() {
    return {
      user: {},
      gonderiler: [],
      secilenYetenek: "",
      kullaniciPuani: 0,
    };
  },
  computed: {
    mevcutUser() {
      return this.$store.getters.mevcutUser;
    },
  },
  async created() {
    await this.getUser();
  },
  methods: {
    async getUser() {
      var guid = this.$route.params.guid;
      var db = firebase.firestore();
      var userTemp = await db
        .collection("user")
        .where("guid", "==", guid)
        .get();
      this.user = userTemp.docs[0].data();
      await this.getGonderiler();
    },
    async getGonderiler() {
      var guid = this.$route.params.guid;
      var db = firebase.firestore();
      var gonderilerTemp = await db
        .collection("gonderiler")
        .where("user.guid", "==", guid)
        .get();
      var tempArray = [];
      gonderilerTemp.forEach((doc) => {
        var obj = doc.data();
        obj.id = doc.id;
        tempArray.push(obj);
      });
      this.gonderiler = tempArray;
      this.snapShotRun();
    },
    snapShotRun() {
      var guid = this.$route.params.guid;
      var db = firebase.firestore();
      db.collection("gonderiler")
        .where("user.guid", "==", guid)
        .onSnapshot((snap) => {
          var tempArray = [];
          snap.forEach((doc) => {
            var obj = doc.data();
            obj.id = doc.id;
            tempArray.push(obj);
          });
          this.gonderiler = tempArray;
        });
    },
    yetenekPuaniAyarla(yetenek) {
      this.secilenYetenek = yetenek;
      $("#oylamaModal").modal("show");
    },
    oylamaVazgec() {
      this.kullaniciPuani = 0;
      this.secilenYetenek = "";
      $("#oylamaModal").modal("hide");
    },
    async oyuKaydet() {
      var self = this;
      var db = firebase.firestore();
      var yetenekOyuVarmi = await db
        .collection("yeteneklerPuanlama")
        .where("userguid", "==", self.user.guid)
        .where("yetenek", "==", self.secilenYetenek)
        .get();
      //eger oyu varsa update yoksa insert
      var ortalama;
      if (yetenekOyuVarmi.docs.length > 0) {
        //update yapılacak
        var docId = yetenekOyuVarmi.docs[0].id;
        await db
          .collection("yeteneklerPuanlama")
          .doc(docId)
          .set(
            {
              oylar: firebase.firestore.FieldValue.arrayUnion({
                user: self.mevcutUser,
                puan: self.kullaniciPuani,
              }),
            },
            { merge: true }
          );
        var yetenekListesi = yetenekOyuVarmi.docs[0].data().oylar;
        yetenekListesi.push({
          user: self.mevcutUser,
          puan: self.kullaniciPuani,
        });
        var toplam = yetenekListesi.reduce((a, b) => a + parseInt(b.puan), 0);
    
        ortalama = toplam / yetenekListesi.length;
      } else {
        //insert yapılacak
        await db.collection("yeteneklerPuanlama").add({
          userguid: self.user.guid,
          yetenek: self.secilenYetenek,
          oylar: [
            {
              user: self.mevcutUser,
              puan: self.kullaniciPuani,
            },
          ],
        });
        ortalama = self.kullaniciPuani;
      }
      await this.ortalamalariYaz(ortalama);
      this.oylamaVazgec();
    },
    async ortalamalariYaz(ortalama) {
      var self = this;
      var db = firebase.firestore();
      var secilenYetenek = this.secilenYetenek;
      var yetenekler = await db
        .collection("yetenekler")
        .where("isim", "==", secilenYetenek)
        .get();
      var updatedKey = "siralama." + this.user.guid;
      if(yetenekler.docs.length>0){
        var docId = yetenekler.docs[0].id;
          await db
        .collection("yetenekler")
        .doc(docId)
        .update({ [updatedKey]: { ortalama: ortalama, user: self.user } });
      }else{
        await db.collection("yetenekler").add({
          isim: secilenYetenek,
          siralama: {
            [self.user.guid]: {
              ortalama: ortalama,
              user: self.user,
            },
          },
        });
      }
      

      
    },
  },
};
</script>

<style>
.coverImage {
  background: url("https://www.jeewangarg.com/assets/img/social-media-marketing-services-delhi.jpg");
  min-height: 40vh;
  background-size: cover;
  background-position: center;
  background-repeat: no-repeat;
  border-bottom-left-radius: 20px;
  border-bottom-right-radius: 20px;
}
.imgProfile {
  width: 200px;
  height: 200px;
  margin-left: 100px;
  margin-top: -100px;
  border-radius: 50%;
  border: 3px solid orangered;
}
.akis {
  margin-top: -200px;
  margin-left: 264px;
  width: 80%;
}
</style>