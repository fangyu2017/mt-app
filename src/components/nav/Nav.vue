<template>
  <div class="nav">
    <router-link to="goods" class="nav-item">商品</router-link>
    <router-link to="ratings" class="nav-item">评价</router-link>
    <router-link  to="seller" class="nav-item">商家</router-link>
  </div>

</template>

<script>

export default {
  components: {

  }
};
</script>

<style scoped>
.nav {
  display: flex;
  width: 100%;
  height: 40px;
  line-height: 40px;
  border-bottom: 1px solid #e4e4e4;
}
.nav-item {
  flex: 1;
  text-align: center;
  font-size: 13px;
  text-decoration: none;
  color: #666;
}
/* 选中的样式 */
.active{
  color: #ffbb22;
  position: relative;
}
.active::after{
  content: '';
  position: absolute;
  width: 20%;
  left: 50%;
  margin-left: -10%;
  background-color: #ffbb22;
  bottom: 5px;
  height: 2px;

}
</style>
