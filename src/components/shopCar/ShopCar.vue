<template>
  <div class="shopCart-wrapper">
    <!-- 底部左侧 -->
    <div class="content-left">
      <div class="logo-wrapper">
        <span class="icon-shopping_cart logo"></span>
      </div>
      <div class="desc-wrapper">
        <p class="tip">另需{{poiInfo.shipping_fee_tip}}</p>
      </div>
    </div>
    <!-- 底部右侧 -->
    <div class="content-right">{{poiInfo.min_price_tip}}</div>
  </div>
</template>

<script>
  export default {
    props:{
     poiInfo:{
        type:Object,
        detault:{}
     }
    },
    data(){
      return{
        // poiInfo:{}
      }
    }
  }
</script>

<style scoped>
@import url(../../common/icon.css);
.shopCart-wrapper{
  width: 100%;
  height: 51px;
  background-color: #514f4f;
  position: fixed;
  left: 0;
  bottom: 0;
  display:flex;
  z-index: 999;
}
.shopCart-wrapper .content-left{
  flex: 1;
}
.shopCart-wrapper .content-left .logo-wrapper{
  width: 50px;
  height:50px;
  background-color: #666;
  border-radius: 50%;
  position:relative;
  top: -14px;
  left: 10px;
  text-align: center;
  float: left;
}
.shopCart-wrapper .content-left .logo-wrapper .logo{
  font-size: 28px;
  color:#c4c4c4;
  line-height: 50px;
}
.shopCart-wrapper .content-left .desc-wrapper{
  float: left;
  margin-left: 25px;
}
.shopCart-wrapper .content-left .desc-wrapper .tip{
  font-size: 12px;
  color:#bab9b9;
  line-height: 51px;
}
.shopCart-wrapper .content-right{
  padding:0 0 110px;
  font-size: 15px;
  color: #bab9b9;
  line-height: 51px;
  font-weight: bold;
  text-align: center;
  margin-right: 25px;

}
</style>
