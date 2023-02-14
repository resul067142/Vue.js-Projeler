<template>
     <div class="col-md-4 vh-100 bg-dark bg-opacity-10">
            <div class="mt-3">
            <img class="rounded mx-auto d-block" style="max-width: 150px"
                :src="mevcutUser.photo.length>0 ? mevcutUser.photo : 'https://thumbs.dreamstime.com/b/default-profile-picture-avatar-photo-placeholder-vector-illustration-default-profile-picture-avatar-photo-placeholder-vector-189495158.jpg'"
                alt="">
            </div>
            <div class="mt-3" style="text-align:center;">
            <h5>{{ mevcutUser.nameSurname }}</h5>
            <h6>{{ mevcutUser.email }}</h6>
            </div>
            <table class="table">
                <tr v-for="item in begenilmeSayilari" :key="item.name">
                    <td>{{item.name}}</td>
                    <td>{{item.count}}</td>
                </tr>
            </table>
          
        </div>
</template>

<script>

export default {
    name:'profilebar',
    props:["begenilmeSayilari"],
    computed:{
        mevcutUser(){
            return this.$store.getters.mevcutUser
        }
    }    
}
</script>

<style>

</style>