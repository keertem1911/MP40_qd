import Vuex from 'vuex'
import Vue from 'vue'
import {saveToSession,loadFromSession} from '../common/js/store'
Vue.use(Vuex);
const  RECEIVE_USERINFO="receive_userinfo";
const  RECEIVE_SELLERINFO="receive_sellerinfo";
const  RECEIVE_ADDGOODS="receive_addgoods";
const  RECEIVE_SELECTGOODS="receive_selectgoods";
const  RECEIVE_DELETEGOODS="receive_deletegoods";
const  RECEIVE_CLEARGOODS="receive_cleargoods";
const state={
  userinfo:{
    openid:''
  },
  seller:{},
  selectGoods:[]

};
const mutations={
  [RECEIVE_USERINFO](state,info){
    state.userinfo=info;
    saveToSession(RECEIVE_USERINFO,info);
  },
  [RECEIVE_SELLERINFO](state,info){
    state.seller=info;
    saveToSession(RECEIVE_SELLERINFO,info);
  },
  [RECEIVE_ADDGOODS](state,good){
        const index= state.selectGoods.findIndex(item=>item.id===good.id);
          if(index>0){
              let item= state.selectGoods[index];
              item.count+= good.count;
          }else {

            state.selectGoods.push(good);
            Vue.set(good,'count');
          }
    saveToSession(RECEIVE_SELECTGOODS,state.selectGoods);
  },
  [RECEIVE_CLEARGOODS](state){
    state.selectGoods=[];
    saveToSession(RECEIVE_SELECTGOODS,'');
  },
  [RECEIVE_DELETEGOODS](state,goods){
    const index=state.selectGoods.findIndex(item=>item.id===goods.id)
    let item =state.selectGoods[index];
    if(item.count >goods.count){
      item.count -=goods.count;
    }else{
      state.selectGoods.splice(0,index);
    }
    saveToSession(RECEIVE_SELECTGOODS,state.selectGoods);
  }

};
const actions={
    saveUserInfo({commit, state},info){
    commit(RECEIVE_USERINFO,info);
  },
  saveSeller({commit},seller){
      commit(RECEIVE_SELLERINFO,seller);
  },
  addGoods({commit},goods){

  },
  desGoods({commit},goods){

  },
  clearGoods({commit}){
      commit(RECEIVE_CLEARGOODS)
  },

};
const getters={
  sellerinfo(state){
    if(!state.seller.name){
        state.seller= loadFromSession(RECEIVE_SELLERINFO,'');

    }
    return state.seller;
  },
  userinfo(state){
    if(!state.userinfo.phone){
      state.userinfo= loadFromSession(RECEIVE_USERINFO,'');

    }
    return state.userinfo;
  },
  selectGoods(state){
    if(state.selectGoods.length===0){
      state.selectGoods=loadFromSession(RECEIVE_SELECTGOODS,'');

    }
    return state.selectGoods;
  }
};
export default new Vuex.Store({
  state,
  mutations,
  actions,
  getters
})
