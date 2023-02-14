<template>
     <div class="card-footer">
                            <div class="row">
                             
                                <div class="col-md-12 row">
                                    
                                    <yorumkarti :item="item" v-if="item.yorumlar.length>0"></yorumkarti>
                                    <div class="col-12 mt-3 row">
                                      <div class="col-12">
                                            <vue-editor v-model="comments" />
                                       </div>
                                       <div class="col-12">
                                            <button class="btn btn-rounded btn-primary" @click="yorumEkle(item)">
                                                Yorum Yap
                                            </button>
                                       </div>
                                    </div>
                                </div>
                                
                            </div>
                        </div>
</template>

<script>
import yorumkarti from "../YorumKarti.vue";
import firebase, { functions, firestore } from "firebase/app";
export default {
  name: "yorumakislari",
  props: ["item"],
  data() {
    return {
      comments: "",
    };
  },
  computed:{
    mevcutUser(){
        return this.$store.getters.mevcutUser;
    }
  },
  components: { yorumkarti },
  methods: {
    async yorumEkle(item) {
      var self = this;
      var db = firebase.firestore();
      var user = this.mevcutUser;
      var comments = this.comments;

      await db
        .collection("gonderiler")
        .doc(item.id)
        .set(
          {
            yorumlar: firebase.firestore.FieldValue.arrayUnion({
              user: user,
              comments: comments,
              yorumlar:[]
            }),
          },
          { merge: true }
        );
        this.comments = "";
    },
  },
};
</script>

<style>
</style>