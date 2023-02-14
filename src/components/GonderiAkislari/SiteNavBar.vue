<template>
<nav class="navbar navbar-expand-lg navbar-light bg-light">
  <router-link class="navbar-brand" to="/">SP</router-link>
  <button class="navbar-toggler" type="button" data-toggle="collapse" data-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
    <span class="navbar-toggler-icon"></span>
  </button>

  <div class="collapse navbar-collapse" id="navbarSupportedContent">
    <ul class="navbar-nav me-auto">
      <li class="nav-item active">
        <router-link class="nav-link" to="/"><i class="fa fa-home"></i>Ana Sayfa <span class="sr-only">(current)</span></router-link>
      </li>
    </ul>

    <div class="dropdown me-3">
  <button class="btn btn-secondary dropdown-toggle" type="button" data-bs-toggle="dropdown" aria-expanded="false">
    {{$store.getters.mevcutUser.nameSurname}}
  </button>
  <ul class="dropdown-menu dropdown-menu-end">
    <li> <router-link class="dropdown-item" to="/profile">Profl Düzenle</router-link></li>
    <li><a class="dropdown-item" href="#">Another action</a></li>
    <li> <router-link class="dropdown-item" :to="{name: 'Logout'}">Çıkış Yap</router-link></li>
  </ul>
</div>

  </div>
</nav>
</template>

<script>
export default {

}
</script>

<style>

</style>
