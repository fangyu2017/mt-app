<template>
  <div class="goods">
    <!-- 分类列表 -->
    <div class="menu-wrapper" ref="menuScroll">
      <!-- 专场 -->
      <ul>
        <li class="menu-item" :class="{'current':currentIndex===0}" @click="selectMenu(0)">
          <p class="text">
            <img :src="container.tag_icon" v-if="container.tag_icon" class="icon">
            {{container.tag_name}}
          </p>
        </li>
        <li class="menu-item" v-for="(item,index) in goods" :key="index" :class="{'current':currentIndex===index+1}" @click="selectMenu(index+1)">
          <p class="text">
            <img :src="item.icon" v-if="item.icon" class="icon">
            {{item.name}}
          </p>
        </li>
      </ul>
    </div>
     <!-- 商品列表 -->
    <div class="foods-wrapper" ref="foodScroll">
      <ul>
        <!-- 专场 -->
        <li class="container_list food-list-hook" >
          <div v-for="(item,index) in container.operation_source_list" :key="index">
            <img :src=" item.pic_url" alt="">
          </div>
        </li>
        <!-- 具体分类 -->
        <li class="food-list food-list-hook"  v-for="(item,index) in goods" :key="index">
          <h3 class="title">{{item.name}}</h3>
          <!-- 具体商列表分类 -->
          <ul>
            <li class="food-item" v-for="(food ,index) in item.spus" :key="index">
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
                  <span class="unit">/{{food.unit}}</span>
                </p>
              </div>
            </li>
          </ul>
        </li>
      </ul>
    </div>

  <!-- 购物车 -->
  <ShopCar :poiInfo="poiInfo"></ShopCar>

  </div>
</template>

<script>
import BScroll from "better-scroll";
import ShopCar from "../shopCar/ShopCar"
export default {
  components:{
    ShopCar
  },
  data() {
    return {
      goods: [],
      container: [],
      listHeight: [],
      poiInfo:{},
      menuScroll: {},
      foodScroll: {},
      scrollY: 0
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
          this.container = response.data.container_operation_source;
          this.goods = response.data.food_spu_tags;
          this.poiInfo=response.data.poi_info
          this.$nextTick(() => {
            this.initScroll();
            this.calculated_height();
          });
        }
      });
  },
  methods: {
    head_bg(img_name) {
      return "background-image: url(" + img_name + ");";
    },
    initScroll() {
      this.menuScroll = new BScroll(this.$refs.menuScroll, {
        probeType: 3
      });
      this.foodScroll = new BScroll(this.$refs.foodScroll, {
        probeType: 3
      });
      this.foodScroll.on("scroll", res => {
        this.scrollY = Math.abs(Math.round(res.y));
      });
    },
    calculated_height() {
      let foodList = this.$refs.foodScroll.getElementsByClassName(
        "food-list-hook"
      );
      let height = 0;
      this.listHeight.push(height);
      for (let i = 0; i < foodList.length; i++) {
        let v = foodList[i];
        height += v.clientHeight;
        this.listHeight.push(height);
      }
    },
    selectMenu(i) {
      // console.log(i)
      let foodList = this.$refs.foodScroll.getElementsByClassName(
        "food-list-hook"
      );
      let element = foodList[i];
      // console.log(element)
      this.foodScroll.scrollToElement(element, 2000);
    }
  },
  computed: {
    currentIndex() {
      for (let i = 0; i < this.listHeight.length; i++) {
        let minHeight = this.listHeight[i];
        let maxHeight = this.listHeight[i + 1];
        if (
          !maxHeight ||
          (this.scrollY >= minHeight && this.scrollY < maxHeight)
        ) {
          // console.log(i);
          return i;
        }
      }
      return 0;
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
.goods .menu-wrapper .menu-item {
  border-bottom: 1px solid #e4e4e4;
  padding: 16px 23px 15px 10px;
}
.goods .menu-wrapper .menu-item .text {
  font-size: 13px;
  color: #333;
  line-height: 17px;
  vertical-align: middle;
  -webkit-line-clamp: 2;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}
.goods .menu-wrapper .menu-item .icon {
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
.goods .foods-wrapper .container_list img {
  width: 100%;
  margin-bottom: 11px;
  border-radius: 5px;
}
/* 具体分类商品布局 */
.goods .foods-wrapper .food-list {
  padding: 11px;
}

.goods .foods-wrapper .food-list .title {
  height: 13px;
  font-size: 13px;
  /* background: url(./img/btn_yellow_highlighted@2x.png) no-repeat left center;
	background-size: 2px 10px; */
  padding-left: 7px;
  margin-bottom: 12px;
  border-left: 5px solid #ffaa22;
}

.goods .foods-wrapper .food-list .food-item {
  display: flex;
  margin-bottom: 25px;
  position: relative;
}

.goods .foods-wrapper .food-list .food-item .icon {
  flex: 0 0 63px;
  background-position: center;
  background-size: 120% 100%;
  background-repeat: no-repeat;
  margin-right: 11px;
  height: 75px;
}
.goods .foods-wrapper .food-list .food-item .content {
  flex: 1;
}
/* 具体内容样式 */
.goods .foods-wrapper .food-list .food-item .content .name {
  font-size: 16px;
  line-height: 21px;
  color: #333333;
  margin-bottom: 10px;
  padding-right: 27px;
}

.goods .foods-wrapper .food-list .food-item .content .desc {
  font-size: 10px;
  line-height: 19px;
  color: #bfbfbf;
  margin-bottom: 8px;

  /* 超出部分显示省略号*/
  -webkit-line-clamp: 1;
  display: -webkit-box;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.goods .foods-wrapper .food-list .food-item .content .extra {
  font-size: 10px;
  color: #bfbfbf;
  margin-bottom: 7px;
}
.goods .foods-wrapper .food-list .food-item .content .extra .saled {
  margin-right: 14px;
}
.goods .foods-wrapper .food-list .food-item .content .product {
  height: 15px;
  margin-bottom: 6px;
}
.goods .foods-wrapper .food-list .food-item .content .price {
  font-size: 0;
}
.goods .foods-wrapper .food-list .food-item .content .price .text {
  font-size: 14px;
  color: #fb4e44;
}
.goods .foods-wrapper .food-list .food-item .content .price .unit {
  font-size: 12px;
  color: #bfbfbf;
}
/* 当前选中 */
.goods .menu-wrapper .menu-item.current {
  background: white;
  font-weight: bold;
  margin-top: -1px;
}
.goods .menu-wrapper .menu-item:first-child.current {
  margin-top: 1px;
}
</style>
