import Vuex from "vuex";


const store = ()=>{
    return new Vuex.Store({
        state:{
            user:{}
        },
        mutations:{
            SET_USER(state,user){
                state.user = user;
            }
        },
        actions:{
            setUser({commit},user){
                commit('SET_USER',user);
            }
        },
        getters:{
            mevcutUser(state){
                return state.user;
            }
        }
    })
};

export default store;