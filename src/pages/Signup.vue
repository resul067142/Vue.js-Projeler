<template>
    <div class="row d-flex justify-content-center">
        <div class="col-md-4 row signupEkrani">
            <div class="col-sm-6">
                <img style="border-radius:20px;" src="https://dynamic.brandcrowd.com/asset/logo/238edeec-d2f9-4fc1-9563-f5bc5e84bfc3/logo-search-grid-1x?v=637856119202330000">
            </div>
            <div class="col-sm-6">
                  <div class="form-group">
                    <label>Name Surname</label>
                    <input class="form-control" v-model="user.nameSurname">
                </div>
                <div class="form-group">
                    <label>Email</label>
                    <input class="form-control" type="email" v-model="user.email">
                </div>

                <div class="form-group">
                    <label>Pass</label>
                    <input class="form-control" type="password" v-model="user.pass">
                </div>
                <div class="form-group">
                    <label>Password Yeniden</label>
                    <input class="form-control" type="password" v-model="passIkinci">
                </div>
            </div>
            <div class="col-md-12 d-flex justify-content-center" style="flex-direction: column;margin-top:20px;margin-bottom:20px;align-items: center;">
                <button class="btn btn-rounded btn-primary" style="width:200px;" @click="userKaydet()">
                    Kaydol
                </button>
                <div style="margin-top:10px;">
                    Hesabınız varsa <router-link to="login">Giriş Yap</router-link>
                </div>
                
            </div>

        </div>
    </div>
</template>

<script>
import firebase, { functions, firestore } from "firebase/app";
import {mapActions} from "vuex";
export default {
  name: "SignUp",
  data() {
    return {
      user: {
        email: "",
        nameSurname: "",
        pass: "",
      },
      passIkinci: "",
    };
  },
  methods:{
    ...mapActions(["setUser"]),
    async userKaydet(){
        var nullForm = false;
        Object.keys(this.user).forEach(key=>{
            if(this.user[key].length==0){
                nullForm = true;
            }
        });
        if(nullForm){
            alert("Lütfen tüm alanları doldurunuz");
            return;
        }
        if(this.user.pass!==this.passIkinci){
            alert("Lütfen tüm alanları doldurunuz");
            return;
        }
        var db = firebase.firestore();
        var guid = this.makeid();
        var userObjesi = {
            email:this.user.email,
            nameSurname:this.user.nameSurname,
            pass:this.user.pass,
            photo:"",
            kendiniTanit:{
                baslik:"",
                kisaAciklama:"",
                lakap:"",
            },
            yetenekler:[],
            projeler:[],
            kaynakLinkler:[],
            sosyalMedyaLinkleri:[],
            guid:guid
        }
        var userTemp = await db.collection("user").add(userObjesi);
        var user = await (await userTemp.get()).data();
        this.setUser(user);
        localStorage.setItem("login",guid);
        this.$router.push("/profile");


    },
    makeid() {
    var result           = '';
    var characters       = 'abcdefghijklmnopqrstuvwxyz0123456789';
    var charactersLength = characters.length;
    for ( var i = 0; i < 15; i++ ) {
        result += characters.charAt(Math.floor(Math.random() * charactersLength));
    }
    return result;
}

  }
};
</script>

<style>
.signupEkrani {
  min-height: 40vh;
  border: 2px solid orangered;
  border-radius: 10px;
  margin-top: auto;
  background: rgb(255, 193, 171);
  padding-top: 4%;
}
</style>
