<template>
 <div class="row container">
    <profilebaredit></profilebaredit>
    <div class="col-md-8">
           <ul class="nav nav-tabs" id="myTab" role="tablist">
            <li class="nav-item" role="presentation">
              <button class="nav-link active" id="kendiniTanitTab" data-bs-toggle="tab" data-bs-target="#kendini-tanit" type="button" role="tab" aria-controls="kendini-tanit" aria-selected="true">Kendini Tanıt</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="yetenekler-tab" data-bs-toggle="tab" data-bs-target="#yetenekler" type="button" role="tab" aria-controls="yetenekler" aria-selected="false">Yetenekler</button>
            </li>
            <li class="nav-item" role="presentation">
              <button class="nav-link" id="contact-tab" data-bs-toggle="tab" data-bs-target="#contact" type="button" role="tab" aria-controls="contact" aria-selected="false">Contact</button>
            </li>
          </ul>
          <div class="tab-content" id="myTabContent">
            <div class="tab-pane fade show active" id="kendini-tanit" role="tabpanel" aria-labelledby="kendiniTanitTab">
              <kendinitanit></kendinitanit>
            </div>
            <div class="tab-pane fade" id="yetenekler" role="tabpanel" aria-labelledby="yetenekler-tab">
                <Yetenekler></Yetenekler>
            </div>
            <div class="tab-pane fade" id="contact" role="tabpanel" aria-labelledby="contact-tab">...</div>
          </div>
    </div>

 </div>
</template>

<script>
import profilebaredit from "../../components/ProfileEdit/ProfilBart.vue";
import kendinitanit from "../../components/ProfileEdit/KendiniTanit.vue";
import Yetenekler from "../../components/ProfileEdit/Yetenekler";

export default {
  name:"profile",
  components:{Yetenekler, profilebaredit,kendinitanit}


}
</script>

<style>

</style>
