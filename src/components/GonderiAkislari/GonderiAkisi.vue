<template>
    <div class="row mt-3">
                <div class="col-md-12 mt-3" v-for="(item,index) in gonderiler" :key="index">
                    <div class="card">
                      <gonderiicerik :gonderi="item" :mevcutUser="mevcutUser"></gonderiicerik>
                       <begeniler :item="item"></begeniler>
                       <yorumakislari :item="item"></yorumakislari>
                    </div>
                </div>
            </div>
</template>

<script>
import begeniler from "./Begeniler.vue";
import yorumakislari from "./YorumAkislari.vue";
import firebase, { functions, firestore } from "firebase/app";
import gonderiicerik from './GonderiIcerik.vue';
export default {
  name: "gonderiakisi",
  async created(){
    await this.gonderileriCek();
  },
  components: { begeniler, yorumakislari,gonderiicerik },
  computed: {
    mevcutUser() {
      return this.$store.getters.mevcutUser;
    },
  },
  data() {
    return {
      gonderiler: [],
    };
  },
  methods: {
    async gonderileriCek() {
      var db = firebase.firestore();
      var gonderilerTemp = await db.collection("gonderiler").get();
      var gonderiler = gonderilerTemp.docs;
      var tempArray = [];
      gonderiler.forEach((gonderi) => {
        var id = gonderi.id;
        var gonderi = gonderi.data();
        gonderi.id = id;
        tempArray.push(gonderi);
      });
      tempArray = tempArray.sort((a, b) => {
        return a.created - b.created;
      });
      this.gonderiler = tempArray;
      
      this.snapShotCalistir();
    },
    async snapShotCalistir() {
      console.log('snapshot start');
      var db = firebase.firestore();
      var self = this;
      await db.collection("gonderiler").onSnapshot((snap) => {
        var arr = [];

        snap.docs.forEach((gonderi) => {
          var id = gonderi.id;
          var gonderi = gonderi.data();
          gonderi.id = id;
          arr.push(gonderi);
        });
        console.log('snapshot icerik');
        console.log(arr);
        self.gonderiler = arr;
        
      });
    },
  },
};
</script>

<style>
</style>