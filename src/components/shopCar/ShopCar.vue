<template>
  <div class="shopcart">
    <div class="shopcart-wrapper">
    <!-- 底部左侧 -->
      <div class="content-left">
        <div class="logo-wrapper" :class="{'highlight':totalCount>0}"  >
          <span class="icon-shopping_cart logo" :class="{'highlight':totalCount>0}" @click="toggleList"></span>
          <i class="num" v-show="totalCount">{{totalCount}}</i>
        </div>
        <div class="desc-wrapper">
          <p class="totalPrice" v-show="totalPrice">{{totalPrice}}</p>
          <p class="tip" :class="{'highlight':totalCount>0}">另需{{poiInfo.shipping_fee_tip}}</p>
        </div>
      </div>
    <!-- 底部右侧 -->
      <div class="content-right" :class="{'highlight':totalCount>0}">{{payStr}}</div>

    <!-- 购物车列表 -->
      <div class="shopcart-list" v-if="listShow" :class="{'show':listShow}">
        <div class="list-top" v-show="poiInfo.discounts2">{{poiInfo.discounts2[0].info}}</div>
        <div class="list-header">
          <h3 class="title">购买清单</h3>
          <div class="empty" @click="clearAll">
            <img src="./img/ash_bin.png" alt="">
            <span>清空购物车</span>
          </div>
        </div>
        <div class="list-content" ref="listContent">
          <ul>
            <li class="food-item" v-for="(food,index) in selectFoods" :key="index">
              <div class="desc-wrapper">
                <div class="desc-left">
                  <p class="name">{{food.name}}</p>
                  <p class="unit" v-show="!food.description">{{food.unit}}</p>
                  <p class="description" v-show="!food.unit">{{food.unit}}</p>
                </div>
                <div class="desc-right">{{food.min_price}}</div>
              </div>
              <div class="cartcontrol-wrapper">
                <CartControl :food="food"></CartControl>
              </div>
            </li>
          </ul>
        </div>
        <div class="list-bottom"></div>
      </div>
    </div>
    <div class="shopcart-mask" v-show="listShow" @click="hideMask"></div>
  </div>
</template>

<script>
import CartControl from "../cartControl/CartControl";
import BScroll from "better-scroll";
export default {
  components: {
    CartControl
  },
  data() {
    return {
      fold: true
    };
  },
  props: {
    poiInfo: {
      type: Object,
      detault:{
          discounts2:[
            {info:''},
          ]
        }


    },
    selectFoods: {
      type: Array,
      default() {
        return [];
      }
    }
  },
  computed: {
    totalCount() {
      let num = 0;
      this.selectFoods.forEach(food => {
        num += food.count;
      });
      return num;
    },
    totalPrice() {
      let total = 0;
      this.selectFoods.forEach(food => {
        total += food.min_price * food.count;
      });
      return total;
    },
    payStr() {
      if (this.totalCount > 0) {
        return "去结算";
      } else {
        return this.poiInfo.min_price_tip;
      }
    },
    listShow() {
      if (!this.totalCount) {
        this.fold = true;
        return false;
      } else {
        let show = !this.fold;
        if (show) {
          this.$nextTick(() => {
            if (!this.shopScroll) {
              this.shopScroll = new BScroll(this.$refs.listContent, {
                click: true
              });
            } else {
              this.shopScroll.refresh();
            }
          });
        }
        return show;
      }
    }
  },
  methods: {
    toggleList() {
      //判断购物车是否为空
      if (!this.totalCount) {
        return;
      } else {
        this.fold = false;
        console.log(111);
      }
    },
    clearAll() {
      this.selectFoods.forEach(food => {
        food.count = 0;
      });
    },
    hideMask() {
      this.fold = true;
    }
  }

};
</script>

<style scoped>
@import url(../../common/icon.css);
.shopcart-wrapper {
  width: 100%;
  height: 51px;
  background-color: #514f4f;
  position: fixed;
  left: 0;
  bottom: 0;
  display: flex;
  z-index: 999;
}
.shopcart-wrapper .content-left {
  flex: 1;
}
.shopcart-wrapper .content-left .logo-wrapper {
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
.shopcart-wrapper .content-left .logo-wrapper .logo {
  font-size: 28px;
  color: #c4c4c4;
  line-height: 50px;
}
.shopcart-wrapper .content-left .logo-wrapper .num {
  position: absolute;
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
.shopcart-wrapper .content-left .desc-wrapper {
  float: left;
  margin-left: 25px;
}
.shopcart-wrapper .content-left .desc-wrapper .tip {
  font-size: 12px;
  color: #bab9b9;
  line-height: 51px;
}
.shopcart-wrapper .content-left .desc-wrapper .tip.highlight {
  line-height: 12px;
}
.shopcart-wrapper .content-left .desc-wrapper .totalPrice {
  font-size: 18px;
  line-height: 33px;
  color: #fff;
}
.shopcart-wrapper .content-right {
  padding: 0 30px;
  font-size: 15px;
  color: #bab9b9;
  line-height: 51px;
  font-weight: bold;
  text-align: center;
  /* margin-right: 25px; */
}
.shopcart-wrapper .content-right.highlight {
  background-color: #ffd161;
  color: #2d2b2a;
}
.shopcart-wrapper .content-left .logo-wrapper.highlight {
  background-color: #ffd161;
}
.shopcart-wrapper .content-left .logo-wrapper.highlight .logo {
  color: #000;
}

/* */
.shopcart-wrapper .shopcart-list {
  position: absolute;
  left: 0;
  top: 0;
  z-index: -1;
  width: 100%;
}
.shopcart-wrapper .shopcart-list.show {
  transform: translateY(-100%);
}

.shopcart-wrapper .shopcart-list .list-top {
  height: 30px;
  text-align: center;
  font-size: 11px;
  background: #f3e6c6;
  line-height: 30px;
  color: #646158;
}

.shopcart-wrapper .shopcart-list .list-header {
  height: 30px;
  background: #f4f4f4;
}
.shopcart-wrapper .shopcart-list .list-header .title {
  float: left;
  border-left: 4px solid #53c123;
  padding-left: 6px;
  line-height: 30px;
  font-size: 12px;
}
.shopcart-wrapper .shopcart-list .list-header .empty {
  float: right;
  line-height: 30px;
  margin-right: 10px;
  font-size: 0;
}
.shopcart-wrapper .shopcart-list .list-header .empty img {
  height: 14px;
  margin-right: 9px;
  vertical-align: middle;
}
.shopcart-wrapper .shopcart-list .list-header .empty span {
  font-size: 12px;
  vertical-align: middle;
}

.shopcart-wrapper .shopcart-list .list-content {
  max-height: 360px;
  overflow: hidden;
  background: white;
}
.shopcart-wrapper .shopcart-list .list-content .food-item {
  height: 38px;
  padding: 12px 12px 10px 12px;
  border-bottom: 1px solid #f4f4f4;
}
.shopcart-wrapper .shopcart-list .list-content .food-item .desc-wrapper {
  float: left;
  width: 240px;
}
.shopcart-wrapper
  .shopcart-list
  .list-content
  .food-item
  .desc-wrapper
  .desc-left {
  float: left;
  width: 170px;
  /* position: relative; */
}
.shopcart-wrapper
  .shopcart-list
  .list-content
  .food-item
  .desc-wrapper
  .desc-left
  .name {
  font-size: 16px;
  margin-bottom: 8px;

  /* 超出部分隐藏*/
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
  height: 16px;
}
.shopcart-wrapper
  .shopcart-list
  .list-content
  .food-item
  .desc-wrapper
  .desc-left
  .unit {
  font-size: 12px;
  color: #b4b4b4;
}
.shopcart-wrapper
  .shopcart-list
  .list-content
  .food-item
  .desc-wrapper
  .desc-left
  .description {
  font-size: 12px;
  color: #b4b4b4;

  /* 超出部分隐藏*/
  overflow: hidden;
  height: 12px;
}
.shopcart-wrapper
  .shopcart-list
  .list-content
  .food-item
  .desc-wrapper
  .desc-right {
  float: right;
  width: 70px;
  text-align: right;
}
.shopcart-wrapper
  .shopcart-list
  .list-content
  .food-item
  .desc-wrapper
  .desc-right
  .price {
  font-size: 12px;
  line-height: 38px;
}

.shopcart-wrapper .shopcart-list .list-content .food-item .cartcontrol-wrapper {
  float: right;
  margin-top: 6px;
}

.shopcart .shopcart-mask,
.mask {
  position: fixed;
  top: 0;
  right: 0;
  width: 100%;
  height: 100%;
  z-index: 98;
  background: rgba(7, 17, 27, 0.6);
}
</style>
