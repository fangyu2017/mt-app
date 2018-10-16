<template>
  <div class="shopCart-wrapper">
    <!-- 底部左侧 -->
    <div class="content-left">
      <div class="logo-wrapper" :class="{'highlight':totalCount>0}">
        <span class="icon-shopping_cart logo" :class="{'highlight':totalCount>0}"></span>
        <i class="num" v-show="totalCount">{{totalCount}}</i>
      </div>
      <div class="desc-wrapper">
        <p class="totalPrice" v-show="totalPrice">{{totalPrice}}</p>
        <p class="tip" :class="{'highlight':totalCount>0}">另需{{poiInfo.shipping_fee_tip}}</p>
      </div>
    </div>
    <!-- 底部右侧 -->
    <div class="content-right" :class="{'highlight':totalCount>0}">{{payStr}}</div>
  </div>
</template>

<script>
export default {
  props: {
    poiInfo: {
      type: Object,
      detault: {}
    },
    selectFoods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed:{
    totalCount(){
      let num=0
      this.selectFoods.forEach(food => {
        num+=food.count
      });
      return num
    },
    totalPrice(){
      let total=0
      this.selectFoods.forEach(food=>{
        total+=food.min_price*food.count
      })
      return total
    },
    payStr(){
      if(this.totalCount>0){
        return '去结算'
      }else{
        return this.poiInfo.min_price_tip
      }
    }
  }
};
</script>

<style scoped>
@import url(../../common/icon.css);
.shopCart-wrapper {
  width: 100%;
  height: 51px;
  background-color: #514f4f;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  z-index: 999;
}
.shopCart-wrapper .content-left {
  flex: 1;
}
.shopCart-wrapper .content-left .logo-wrapper {
  width: 50px;
  height: 50px;
  background-color: #666;
  border-radius: 50%;
  position: relative;
  top: -14px;
  left: 10px;
  text-align: center;
  float: left;
}
.shopCart-wrapper .content-left .logo-wrapper .logo {
  font-size: 28px;
  color: #c4c4c4;
  line-height: 50px;
}
.shopCart-wrapper .content-left .logo-wrapper .num{
  position:absolute;
  top: 0px;
  right: 0px;
  width: 18px;
  height: 18px;
  border-radius: 50%;
  background-color: red;
  text-align: center;
  font-size: 12px;
  line-height: 1.2;
  color: #fff;
}
.shopCart-wrapper .content-left .desc-wrapper {
  float: left;
  margin-left: 25px;
}
.shopCart-wrapper .content-left .desc-wrapper .tip {
  font-size: 12px;
  color: #bab9b9;
  line-height: 51px;
}
.shopCart-wrapper .content-left .desc-wrapper .tip.highlight{
  line-height: 12px;
}
.shopCart-wrapper .content-left .desc-wrapper .totalPrice{
  font-size: 18px;
  line-height: 33px;
  color: #fff;
}
.shopCart-wrapper .content-right {
  padding: 0 30px;
  font-size: 15px;
  color: #bab9b9;
  line-height: 51px;
  font-weight: bold;
  text-align: center;
  /* margin-right: 25px; */
}
.shopCart-wrapper .content-right.highlight{
  background-color: #ffd161;
  color: #2d2b2a;
}
.shopCart-wrapper .content-left .logo-wrapper.highlight{
   background-color: #ffd161;
}
.shopCart-wrapper .content-left .logo-wrapper.highlight .logo{
  color: #000;
}
</style>
