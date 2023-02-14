<template>
  <div class="row d-flex justify-content-center loginBackground">
    <div class="col-md-4 loginScreen">
        <div class="form-group">
          <label>Email</label>
          <input class="form-control" type="email" v-model="user.email">
        </div>
        <div class="form-group">
          <label>Password</label>
          <input class="form-control" type="password" v-model="user.pass">
        </div>
        <div class="form-group d-flex justify-content-center mt-2" style="flex-direction: column;">
            <button class="btn btn-rounded btn-block btn-primary" style="width: 140px;" @click="loginOl()">
              <i class="fa fa-check"></i>
              Giriş Yap
            </button>
            <div>
            <br>Hesap Açmak İçin
            <router-link to="signup">Tıklayınız</router-link>
          </div>
        </div>
    </div>
  </div>
</template>

<script>
import firebase, { functions, firestore } from "firebase/app";
import {mapActions} from "vuex";
export default {
  name:"login",
  data() {
    return {
      user:{
        email:"",
        pass:""
      }
    }
  },
  methods:{
    ...mapActions(['setUser']),
    async loginOl(){
      if(this.user.email.length==0){
        alert('Lütfen Emailinizi Giriniz');
        return;
      }
      if(this.user.pass.length==0){
        alert('Lütfen Şifrenizi Giriniz');
        return;
      }
      var db = firebase.firestore();
      var userControl =await db.collection('user').where('email',"==",this.user.email).get();
      if(userControl.docs.length==0){
        alert('Böyle bir email bulunamadı');
        return;
      }

      var user = userControl.docs[0].data();
      if(user.pass!=this.user.pass){
        alert('Şifreniz yanlıştır.');
        return;
      }
      localStorage.setItem('login',user.guid);
      this.setUser(user);
      this.$router.push('/');



    }
  }
}
</script>

<style>
  .loginBackground{
    background: url('https://thumbs.dreamstime.com/b/smart-city-social-media-people-icons-communication-network-modern-background-171236825.jpg');
    background-position: center;
    background-repeat: no-repeat;
    background-size: cover;
    min-height: 100vh;
  }
  .loginScreen{
    max-height: 40vh;
    background: rgba(128, 0, 128, 0.096);
    border: 3px solid purple;
    border-radius: 20px;
    margin-top: 10%;
    padding: 5%;

  }
</style>