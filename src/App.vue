<template>
  <div id="app">
    <!-- 头部 -->
    <Header :poiInfo="poiInfo"></Header>
      <!-- 导航 -->
    <Nav></Nav>
    <!-- 内容 -->
   <router-view></router-view>
  </div>

</template>

<script>
import Header from './components/header/Header'
import Nav from './components/nav/Nav'
export default {
  name: 'App',
  components: {
    Header,
    Nav
  },
  data(){
   return{
      poiInfo:{}
   }
  },
  created(){
    fetch("/api/goods").then(res=>{
      return res.json()
    }).then(response=>{
      console.log(response)
      if(response.code==0){
        this.$nextTick(function () {
        this.poiInfo=response.data.poi_info
        console.log(this.poiInfo) // => 'updated'
      })

      }
    })
  }
}
</script>

<style>

</style>
