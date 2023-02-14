<template>
  <div class="card">
         <div class="card-header">
            <h5>{{gonderi.user.nameSurname}}</h5>
            <button class="btn btn-link" style="float:right;color:red;" v-if="gonderi.user.guid==mevcutUser.guid">
                <i class="fa fa-times"></i> Gönderiyi Sil
            </button>
        </div>
        <div class="card-body">
            <div class="col-md-12">
                <h6>{{gonderi.post.baslik}}</h6>
            </div>
            <div class="col-md-12" v-html="gonderi.post.icerik">
              
            </div>
        </div>
  </div>
</template>

<script>
export default {
    name:'gonderiicerik',
    props:["gonderi","mevcutUser"]
};
</script>

<style>
</style>