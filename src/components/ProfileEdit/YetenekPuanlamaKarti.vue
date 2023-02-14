<template>
    <div class="rating">
        <input v-model="picked" @click="handleChange()" type="radio" name="rating" :value="5" id="5"><label for="5">☆</label>
        <input v-model="picked" @click="handleChange()" type="radio" name="rating" :value="4" id="4"><label for="4">☆</label>
        <input v-model="picked" @click="handleChange()" type="radio" name="rating" :value="3" id="3"><label for="3">☆</label>
        <input v-model="picked" @click="handleChange()" type="radio" name="rating" :value="2" id="2"><label for="2">☆</label>
        <input v-model="picked" @click="handleChange()" type="radio" name="rating" :value="1" id="1"><label for="1">☆</label>
    </div>
</template>

<script>
export default {
    name: "YetenekPuanlamaKarti",
    props: ["yetenekPuani"],
    created() {
        this.picked = this.yetenekPuani;
    },
    data() {
        return {
            picked: 0,
        }
    },
    methods: {
        handleChange() {
            this.$emit('update:secilenYetenekPuani', this.picked)
        }
    }
}
</script>

<style scoped>
.rating {
    display: flex;
    flex-direction: row-reverse;
    justify-content: flex-end;
}

.rating>input {
    display: none
}

.rating>label {
    position: relative;
    width: 1em;
    font-size: 30px;
    font-weight: 300;
    color: #FFD600;
    cursor: pointer
}

.rating>label::before {
    content: "\2605";
    position: absolute;
    opacity: 0
}

.rating>label:hover:before,
.rating>label:hover~label:before {
    opacity: 1 !important
}

.rating>input:checked~label:before {
    opacity: 1
}

.rating:hover>input:checked~label:before {
    opacity: 0.4
}
</style>
