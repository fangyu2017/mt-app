<template>
  <div  class="cartControl">
    <transition name="move">
      <div class="cart-decrease icon-remove_circle_outline" @click.stop.prevent="cartDecrease" v-show="food.count"></div>
    </transition>
    <div class="cart-count" v-show="food.count">{{food.count}}</div>
    <div class="cart-add icon-add_circle" @click.stop.prevent="cartAdd">
      <i class="bg"></i>
     </div>
  </div>
</template>

<script>
import Vue from 'vue'
export default {
  props:{
    food:{
      type:Object,
      detault:{}
    },
    selectFoods:{
      type:Array,
      default(){
        return []
      }
    }
  },
  methods: {
    cartDecrease() {
      this.food.count--;
    },
    cartAdd() {
      if(!this.food.count){
        Vue.set(this.food,'count',1)
      }else{
        this.food.count++;
      }
    }
  }
};
</script>

<style scoped>
@import url(../../common/icon.css);
.cartControl {
  display: flex;
  flex-direction: row;
  width: 78px;
  justify-content: space-around;
  align-items: center;
}
.cartControl .cart-decrease,
.cartControl .cart-add {
  font-size: 26px;
  height: 26px;
}
.cartControl .cart-decrease {
  color: #b4b4b4;
}
.cartControl .cart-add {
  color: #ffaa22;
}
.move-enter-active,.move-leave-active{
  transition: all 0.2s linear;
}
.move-enter,.move-leave-to{
  transform: translateX(20px) rotate(180deg);
}
</style>
