<template>
    <div>
        <div class="card mt-3" v-for="(yetenek, index) in yetenekler" :key="index">
            <div class="card-body">
                <div class="rating">
                    <i class="fa fa-star" style="cursor:pointer;color:orangered;" @click="picked(integ,index)" v-for="integ in yetenek.yetenekPuani" :key="integ"></i>
                    <i class="fa fa-star" style="cursor:pointer;" v-for="integ in 5-yetenek.yetenekPuani" :key="yetenek.yetenekPuani+integ" @click="picked((yetenek.yetenekPuani+integ),index)"></i>
                </div>
                <div class="col-md-12 row">
                    <span class="col">{{yetenek.yetenekAdi}}</span>
                    <span class="col">{{yetenek.yetenekPuani}}</span>
                </div>
                
            </div>
        </div>
     
    </div>
</template>

<script>
import YetenekPuanlamaKarti from "./YetenekPuanlamaKarti";

export default {
    name: "Yetenekler",
    components: {YetenekPuanlamaKarti},
    data() {
        return {
            yetenekler: [
                {yetenekAdi: "CSS", yetenekPuani: 5},
                {yetenekAdi: "PHP", yetenekPuani: 3},
                {yetenekAdi: "VUE", yetenekPuani: 3},
            ],
        }
    },
    methods: {
        picked(puan, index) {
            this.$set(this.yetenekler[index], 'yetenekPuani', puan);
        }
    }
}
</script>

<style>


</style>
