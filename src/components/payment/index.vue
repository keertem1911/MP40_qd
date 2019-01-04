<template>
	<div class="payment">
    <div class="header">
      <div @click="$router.go(-1)" class="header-left">返回</div>
      <div   class="header-middle">结算</div>
    </div>
	  <div class="user-info">
			<div class="item"><label class="label">联系人</label><input placeholder="姓名" class="input" v-model="name" type="text"></div>
			<div class="item"><label>联系电话</label><input placeholder="您的手机号"   v-model="phone" type="text"></div>
			<div class="item"><label>配送地址</label><input placeholder="配送地址" v-model="address" type="text"></div>
		</div>
		<div class="food-info">
			<div class="card-hd"><img  class="avator" :src="sellerinfo.avatar"><span class="title">{{sellerinfo.name}}</span></div>

			<div v-for="item in selectedGoods" class="food-item">
				<label>{{item.name}}</label>
				<div class="mount"><span class="number" v-if="item.count > 1">x{{item.count}}</span>¥{{item.count * item.price}}</div>
			</div>
		</div>
		<div class="footer">
			<div class="money">待支付¥{{this.allPay}}</div>
			<div class="btn-pay" @click="pay">支付</div>
		</div>
    <AlertTip :alertText="alertText" v-show="alertShow" @closeTip="closeTip"/>
	</div>
</template>
<script >
  import {mapGetters} from 'vuex'
  import AlertTip from '../alertTip/AlertTip'
  import {loadFromSession} from '../../common/js/store'
    var config = require('config');
    config = process.env.NODE_ENV === 'development' ? config.dev : config.build
	export default {
      components:{
        AlertTip
      },
		data() {
			return {
				selectedGoods: [],
				name: '',
				phone: '',
				address: '',
        alertText: '', // 提示文本
        alertShow: false, // 是否显示警告框

			};
		},
		computed: {
      ...mapGetters(["userinfo","sellerinfo"]),
			allPay() {
				return this.selectedGoods.reduce((a, b) => {
					return a + (b.count * b.price);
				}, 0);
			}
		},
		watch: {
			'$route': 'fetchData'
		},
		mounted() {
			this.selectedGoods = loadFromSession('__SELECTEDGOODS__','');//JSON.parse(window.selectedGoods);
			// this.seller = JSON.parse(window.sellerPay);
			if(this.userinfo.phone)
			this.phone= this.userinfo.phone;
		  console.log("created() -------")
		},
		methods: {
      closeTip () {
        this.alertShow = false;
        this.alertText = ''
      },
      showAlert(alertText) {
        this.alertShow = true;
        this.alertText = alertText
      },
			pay() {
			  if(!this.name){
			    this.showAlert('请输入姓名');
          return;
        }
        if(!this.phone){
          this.showAlert('请输入电话');
          return
        }
        if(!this.address){
          this.showAlert('请输入配送地址');
          return
        }
        const openid= this.userinfo.openid;
				const goods = this.selectedGoods.map(good => {
                    return {productId: good.id, productQuantity: good.count}
                });
                const ERR_OK = 0;


                this.$http.post("/sell/buyer/order/create", {
                    'openid': openid,
                    'phone': this.phone,
                    'name': this.name,
                    'address': this.address,
                    'items': JSON.stringify(goods)}
                ).then((respones) => {
                    respones = respones.body;
                    if (respones.code === ERR_OK) {
                      // location.href = config.wechatPayUrl +
                      //   '?openid=' + openid +
                      //   '&orderId=' + respones.data.orderId +
                      //   '&returnUrl=' + encodeURIComponent(config.sellUrl + '/#/order/' + respones.data.orderId);
                      this.$router.replace('order/' + respones.data.orderId)
                    }else {
                      alert(respones.msg);
                    }
                });

                window.selectedGoods = '[]';
                // 支付成功清空localstorage selectedGoods
			}
		}
	};
  function getCookie(name) {
    var arr;
    var reg = new RegExp('(^| )' +name+"=([^;]*)(;|$)");
    if(arr=document.cookie.match(reg))
      return unescape(arr[2]);
    else
      return null;
  }
</script>

<style lang="less" >
	.payment {
		position: absolute;
		width: 100%;
		height: 100%;
		background-color: #f5f5f5;
    .header{
      height: 45px;
      width: 100%;
      background: #00b43c;
      .header-left{
        float: left;
        font-size: 14px;
        margin: 18px 0 18px 10px;
      }
      .header-middle{
        font-size: 16px;
        margin: 18px 40px;
        left: 50%;
        text-align: center;
      }
    }
		.user-info {
			margin-top: 10px;
			background-color: #fff;
			margin-bottom: 20px;
			.item {
				padding: 0 14px;
				display: flex;
				border-bottom: 1px solid #eee;
				label {
					padding: 14px 0;
					display:inline-block;
					flex-basis: 93px;
					color: #333;
				}
				input {
					display: block;
				  flex: 1;
				  outline: 0;
				  color: #333;
				}
			}
		}
		.food-info {
			background-color: #fff;
			.avator {
				width: 19px;
				height: 19px;
				margin-right: 10px;
			}
			.card-hd {
				display: flex;
				align-items: center;
				padding: 14px;
				border-bottom: 1px solid #eee;
			}
			.food-item {
				padding: 0 14px;
				display: flex;
				align-items: center;
				border-bottom: 1px solid #eee;
				label {
					display: inline-block;
					padding: 14px 0;
					flex: 2;
					color: #666;
				}
				.mount {
					display: flex;
					flex: 1;
					justify-content: flex-end;
					.number {
						padding-right: 20px;
					}
				}
			}
		}
		.footer {
			position: absolute;
			bottom: 0;
			width: 100%;
			height: 44px;
			display: flex;
			background-color: #3c3c3c;
			color: #fff;
			.money {
				flex: 1;
				padding-left: 20px;
				line-height: 44px;
			}
			.btn-pay {
				flex-basis: 110px;
				line-height: 44px;
				text-align: center;
				background-color: #56d176;
			}

		}
	}


</style>
