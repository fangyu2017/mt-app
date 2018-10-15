<template>
  <div class="goods">
    <!-- 分类列表 -->
    <div class="menu-wrapper">
      <!-- 专场 -->
      <ul>
        <li class="menu-item">
          <p class="text">
            <img :src="container.tag_icon" v-if="container.tag_icon" class="icon">
            {{container.tag_name}}
          </p>
        </li>
        <li class="menu-item" v-for="(item,index) in goods" :key="index">
          <p class="text">
            <img :src="item.icon" v-if="item.icon" class="icon">
            {{item.name}}
          </p>
        </li>
      </ul>
    </div>
     <!-- 商品列表 -->
    <div class="foods-wrapper">
      <ul>
        <!-- 专场 -->
        <li class="container_list">
          <div v-for="(item,index) in container.operation_source_list" :key="index">
            <img :src=" item.pic_url" alt="">
          </div>
        </li>
        <!-- 具体分类 -->
        <li class="foods_list" v-for="(item,index) in goods" :key="index">
          <h3 class="title">{{item.name}}</h3>
          <!-- 具体商列表分类 -->
          <ul>
            <li class="" v-for="(food ,index) in item.spus" :key="index">
              <div class="icon" :style="head_bg(food.picture)"></div>
              <div class="content">
                <h3 class="name">{{food.name}}</h3>
                <p class="desc" v-if="food.description">{{food.description}}</p>
                <div class="extra">
                    <span class="saled">{{food.month_saled_content}}</span>
                    <span class="praise">{{food.praise_content}}</span>

                </div>
                <img class="product" :src="food.product_label_picture" alt="">
                <p class="price">
                  <span class="text">{{food.min_price}}</span>
                  <span class="unit">{{food.unit}}</span>
                </p>
              </div>
            </li>
          </ul>
        </li>
      </ul>
      </div>
  </div>
</template>

<script>
export default {
  data() {
    return {
      goods: [],
      container:[]
    };
  },
  created() {
    fetch("/api/goods")
      .then(res => {
        return res.json();
      })
      .then(response => {
        console.log(response);
        if (response.code == 0) {
          this.container=response.data.container_operation_source
          this.goods = response.data.food_spu_tags;
        }
      });
  },
  methods:{
    head_bg(img_name){
       return "background-image: url(" + img_name + ");"
    }
  }
};
</script>

<style scoped>
.goods {
  position: absolute;
  display: flex;
  width: 100%;
  bottom: 50px;
  overflow: hidden;
  top: 190px;
}
.goods .menu-wrapper {
  flex: 0 0 85px;
  background-color: #f4f4f4;
}
.goods .menu-wrapper .menu-item{
  border-bottom: 1px solid #e4e4e4;
  padding: 16px 23px 15px 10px;
}
.goods .menu-wrapper .menu-item .text{
  font-size: 13px;
  color:#333;
  line-height: 17px;
  vertical-align: middle;
  -webkit-line-clamp:2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.goods .menu-wrapper .menu-item .icon{
  width: 15px;
  height: 15px;
  vertical-align: middle;
}
.goods .foods-wrapper {
  flex: 1;
  /* background-color: blue; */
}
.goods .foods-wrapper .container_list {
  padding: 11px 11px 0 11px;
  border-bottom: 1px solid #e4e4e4;

}
.goods .foods-wrapper .container_list img{
  width: 100%;
  margin-bottom: 11px;
  border-radius: 5px;
}
</style>
