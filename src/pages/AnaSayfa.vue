<template>
    <div class="container row d-flex justify-content-center">
        <profilebar :begenilmeSayilari="begenilmeSayilari"></profilebar>
        <div class="col-md-8">
            <gonderiyayinla></gonderiyayinla>
            <gonderiakisi></gonderiakisi>
        </div>
    </div>
</template>

<script>
import profilebar from "../components/ProfileBar.vue";
import firebase, { functions, firestore } from "firebase/app";
import gonderiyayinla from "../components/GonderiAkislari/GonderiYayinla.vue"
import gonderiakisi from "../components/GonderiAkislari/GonderiAkisi.vue";
export default {
  name: "AnaSayfa",
  components: { profilebar,gonderiyayinla,gonderiakisi },
  async created() {
   // await this.gonderileriCek();
    //console.log(this.gonderiler);
  },
  computed: {
    mevcutUser() {
      return this.$store.getters.mevcutUser;
    },
  },
  data() {
    return {
      gonderiler:[],
      begenilmeSayilari:[]
    };
  },
  methods: {

   
  
  
  
 
    gruplamaVeSiralama(){
        var arr = [...this.gonderiler];
        var likeCountu = {};
        arr.forEach(item=>{
            if(likeCountu[item.user.guid]){
                likeCountu[item.user.guid].count = likeCountu[item.user.guid].count+item.begeniler.length;
            }else{
                likeCountu[item.user.guid] = {nameSurname:item.user.nameSurname,count:item.begeniler.length};
            }
        });
        var tempArray = [];
        for(var key in likeCountu){
            tempArray.push({name:likeCountu[key].nameSurname,count:likeCountu[key].count})
        }
        tempArray = tempArray.sort((a,b)=>{return b.count-a.count});
        this.begenilmeSayilari = tempArray;
        
    },
 
  },
};
</script>

<style>
</style>