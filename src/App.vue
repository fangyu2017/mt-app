<template>
  <div id="app">
    <!-- 头部 -->
    <Header :poiInfo="poiInfo"></Header>
      <!-- 导航 -->
    <Nav :commentNum="commentNum"></Nav>
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
      poiInfo:{},
      commentNum:0
   }
  },
  created(){
    fetch("/api/goods").then(res=>{
      return res.json()
    }).then(response=>{
      if(response.code==0){
        this.poiInfo=response.data.poi_info
      }
    })
    fetch("/api/ratings").then(res=>{
      return res.json()
    }).then(response=>{
      if(response.code==0){
        this.commentNum=response.data.comment_num
      }
    })
  }
}
</script>

<style>

</style>
