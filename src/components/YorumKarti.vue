<template>
    <div class="col-12 mt-3 row" style="margin-left:auto;margin-right:auto;">
         <div class="col-12 row card mt-3" style="margin-right:auto;margin-left:auto;" v-for="(yorum,yorumIndex) in item.yorumlar" :key="yorumIndex">
             <div class="card-header col-12 row">
                 <span style="font-size:14px;" class="col-6">{{yorum.user.nameSurname}}</span>
                 <div class="col-6">
                     <button class="btn btn-link" style="float:right;color:red;font-size:14px;" v-if="yorum.user.guid==mevcutUser.guid">
                         <i class="fa fa-times"></i> Yorumu Sİl
                     </button>
                </div>
             </div>
             <div class="card-body row">
                 <div class="col-12 mt-3 p-3" v-html="yorum.comments" style="border-bottom: 1px solid orangered;">
                     
                 </div>
                 <div class="col-md-12 row">
                     <div class="col-md-6">
                         <button class="col btn btn-link" style="font-size:12px;" @click="secilenYorumIndex=yorumIndex;">
                             <i class="fa fa-comment"></i> Cevapla
                         </button>
                         
                     </div>
                     <div class="col-md-6">
                         <button class="col btn btn-link" style="float:right;font-size:12px;">
                             <i class="fa fa-heart"></i> Beğen
                         </button>
                     </div>
                 </div>
                <div class="row" style="margin-left:auto;">
                     <div class="col-md-12 row" v-for="(yorumYorumu,yorumYorumuIndex) in yorum.yorumlar" :key="yorumYorumuIndex">
                         <div class="col-12 row">
                             {{yorumYorumu.user.nameSurname}}
                             <br>
                             <div style="background: #e8e8e8;padding: 5px;border-radius: 10px;" v-html="yorumYorumu.comments"></div>
                             
                         </div>
                     </div>
                 </div>
             </div>
             <div class="card-footer row" v-if="secilenYorumIndex==yorumIndex">
                 <vue-editor v-model="yorumunYorumu" />
                 <button class="btn btn-rounded btn-warning mt-3" @click="yorumuYorumla(item,yorumIndexi)">
                     Cevapla
                 </button>
             </div>
             
             
         </div>
         
     </div>
</template>

<script>
import firebase, { functions, firestore } from "firebase/app";
export default {
  name: "yorumkarti",
  props: ["item"],
  computed:{
    mevcutUser(){
        return this.$store.getters.mevcutUser;
    }
  },
  data() {
    return {
      secilenYorumIndex: -1,
      yorumunYorumu: "",
    };
  },
  methods: {
    async yorumuYorumla(item, yorumIndexi) {
      var yorumlar = item.yorumlar;
      var gonderiYorumu = item.yorumlar[this.secilenYorumIndex];
      gonderiYorumu.yorumlar.push({user:this.mevcutUser,comments:this.yorumunYorumu});
      yorumlar[this.secilenYorumIndex] = gonderiYorumu;
            
      var db = firebase.firestore();
      await db.collection("gonderiler").doc(item.id).update({
        yorumlar: yorumlar,
      });
      this.secilenYorumIndex = -1;
      this.yorumunYorumu = "";
    },
  },
};
</script>

<style>
</style>