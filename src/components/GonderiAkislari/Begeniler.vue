<template>
       <div class="col-md-12 row" style="margin-left:auto;margin-right:auto;background:#fff;">
                <div class="col">
                     <button class="btn btn-link"  @click="gonderiyiBegenmektenCikar(item)" v-if="begeniButonu(item)">
                        <i class="fa fa-heart" style="color:red;"></i>
                        Beğenildi
                    </button>
                    <button class="btn btn-link" @click="gonderiyiBegen(item)" v-else>
                        <i class="fa fa-heart"></i>
                        Beğen
                    </button>
                </div>
                <div class="col" v-if="item.begeniler.length>2">
                    <span v-for="likelayanUser in item.begeniler.slice(0,2)" :key="likelayanUser.user.guid">
                        {{likelayanUser.user.nameSurname}}
                    </span>
                    <span>
                        + {{item.begeniler.length-2}} Kişi Daha Beğendi
                    </span>
                </div>
                <div class="col" v-else>
                    <span v-for="likelayanUser in item.begeniler" :key="likelayanUser.user.guid">
                        {{likelayanUser.user.nameSurname}}
                    </span>
                </div>
               
                
            </div>
</template>

<script>
import firebase, { functions, firestore } from "firebase/app";
export default {
  name: "begeniler",
  props: ["item"],
  computed:{
    mevcutUser(){
        return this.$store.getters.mevcutUser;
    }
  },
  methods: {
    async gonderiyiBegen(item) {
      var self = this;
      var db = firebase.firestore();
      await db
        .collection("gonderiler")
        .doc(item.id)
        .set(
          {
            begeniler: firebase.firestore.FieldValue.arrayUnion({
              user: self.mevcutUser,
            }),
          },
          { merge: true }
        );
    },
    async gonderiyiBegenmektenCikar(item) {
      var begeniler = item.begeniler.filter(
        (begeni) => begeni.user.guid != this.mevcutUser.guid
      );
      var db = firebase.firestore();
      await db.collection("gonderiler").doc(item.id).update({
        begeniler: begeniler,
      });
    },
    begeniButonu(item) {
      var kontrol = item.begeniler.filter(
        (begeni) => begeni.user.guid == this.mevcutUser.guid
      );

      return kontrol.length > 0;
    },
  },
};
</script>

<style>
</style>