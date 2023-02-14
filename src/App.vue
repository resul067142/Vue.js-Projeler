<template>
  <div id="app">
    <sitenavbar v-if="$store.getters.mevcutUser.guid"></sitenavbar>
      <router-view/>
  </div>
</template>

<script>
import firebase, { functions, firestore } from "firebase/app";
import {mapActions} from "vuex";
import sitenavbar from "./components/GonderiAkislari/SiteNavBar.vue"
export default {
  name: 'App',
  async created(){
    await this.userGetir();
  },
  components:{sitenavbar},
  watch:{
    $route(to,from){
       this.routeName = to.fullPath.replace('/','');
    }
  },
  data(){
    return{
      routeName:"",
      
    }
  },
  methods: {
    ...mapActions(["setUser"]),
      async userGetir(){
        var userLogin = localStorage.getItem('login');
        if(userLogin!=null){
          var db = firebase.firestore();
          var userTemp = await db.collection('user').where("guid","==",userLogin).get();
          var user = await userTemp.docs[0].data();
          this.setUser(user);
          
        }else{
          this.routeName = this.$router.currentRoute.path.replace('/','');
          if(this.routeName!=='login'){
          
             this.$router.push('/login');
          }
          
        }
      }
  },
}
</script>


