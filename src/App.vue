<template>
  <div>
    <template v-if="$route.meta.showHeader">
      <v-header :seller="sellerinfo"></v-header>
      <div class="tab border-1px">
        <div class="tab-item">
          <router-link to="/goods">商品</router-link>
        </div>
        <!--<div class="tab-item">-->
          <!--<router-link to="/ratings">评论</router-link>-->
        <!--</div> -->
        <div class="tab-item">
          <router-link to="/orderlist">订单</router-link>
        </div>
        <div class="tab-item">
          <router-link to="/seller">商家</router-link>
        </div>
      </div>
    </template>

    <router-view :seller="sellerinfo" :showHeader="$route.meta.showHeader"></router-view>

  </div>
</template>

<script type="text/ecmascript-6">
  import {mapGetters} from 'vuex'
  import header from 'components/header/header.vue';
  const ERR_OK = 0;

  export default {
    data() {
      return {

      };
    },
    computed:{
      ...mapGetters(['sellerinfo'])
    },
    methods: {
      changeHash() {
        const hash = window.location.hash;
        if (hash.indexOf('payment') > -1
        || hash.indexOf('order') > -1) {
          this.showHeader = false;
        } else {
          this.showHeader = true;
        }
      }
    },
    mounted() {
      this.changeHash();
      window.addEventListener('hashchange', () => {
        this.changeHash();
      });
      if (this.showHeader) {
        this.$http.get('/sell/api/seller.json').then((response) => {
          response = response.body;
          if (response.errno === ERR_OK) {

            this.$store.dispatch('saveSeller',response.data)
          }
        });
      }

    },
    components: {
      'v-header': header
    }
  };

</script>

<style lang="stylus" rel="stylesheet/stylus">
  @import "./common/stylus/mixin.styl"

  .tab
    display: flex
    width: 100%
    height: 40px
    line-height: 40px
    // border-bottom: 1px solid rgba(7, 17, 27, 0.1)
    border-1px(rgba(7, 17, 27, 0.1))
    .tab-item
      flex: 1
      text-align: center
      & > a
        display: block
        font-size: 14px
        color: rgb(77, 85, 93)
        &.active
          color: rgb(240, 20, 20)
</style>
