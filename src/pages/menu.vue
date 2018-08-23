<template>
  <el-container class="container">
    <el-header class="header"  height="8rem">
      <img src="../../static/image/avatar.jpg" class="avatar">
      <p>陈棉耿</p>
    </el-header>
    <el-main class="main">
      <el-row type="flex" class="recommand">
        <el-col :span="8" v-for="(recommand, index) in recommands" :key="index" :offset="index > 0 ? 1 : 0">
          <el-card :body-style="{ padding: '0px' }">
            <img :src="recommand.url" class="image">
            <div class="recommand-detail">
              <span>{{recommand.title}}</span>
              <div class="bottom clearfix">
                <span class="price">￥{{recommand.price}}</span>
                <div class="btn-group">
                  <el-button type="success"  v-if="recommand.number > 0" icon="el-icon-minus" round :data-level="recommand.level" :data-id="recommand.id" @click="sub"></el-button>
                  <p v-if="recommand.number > 0">{{recommand.number}}</p>
                  <el-button type="success" icon="el-icon-plus" round :data-level="recommand.level" :data-id="recommand.id" @click="add"></el-button>
                </div>
              </div>
            </div>
          </el-card>
        </el-col>
      </el-row>
      <p class="menu-title">菜单</p>
      <div class="menu">
        <ul class="menu-level" ref="menu">
          <ul>
            <li v-for="(level, index) in menu_level" :key="level" :class="index === currentIndex()? 'active' : ''" :data-id="index" @click="select">{{level}}</li>
          </ul>
        </ul>
        <div class="menu-body" ref="food">
          <ul>
            <li v-for="dish in dishes" :key="dish.id" class="food-level">
              <h3>{{dish.title}}</h3>
                <ul class="level-item">
                  <li v-for="food in dish.foods" :key="food.id">
                    <div class="menu-item">
                      <img :src="food.url" alt="">
                      <div class="item-detail">
                        <p>{{food.title}}</p>
                        <p>￥{{food.price}}</p>
                      </div>
                      <div class="btn-group">
                        <el-button type="success"  v-if="food.number > 0" icon="el-icon-minus" round :data-level="dish.id" :data-id="food.id" @click="sub"></el-button>
                        <p v-if="food.number > 0">{{food.number}}</p>
                        <el-button type="success" icon="el-icon-plus" round :data-level="dish.id" :data-id="food.id" @click="add"></el-button>
                      </div>
                    </div>
                  </li>
                </ul>
            </li>
          </ul>
        </div>
      </div>
    </el-main>
    <div class="shop-car-img">
      <img src="../../static/image/shopCar.png" @click="power">
    </div>
    <div class="shop-car" v-show="showCar">
      <h3>购物车</h3>
      <div class="shopcar-item" v-for="dish in shopCar" :key="JSON.stringify(dish)">
        <p>{{dish.title}}</p>
        <p>￥{{dish.price}}</p>
        <div class="shopcar-btn">
          <el-button type="success" icon="el-icon-minus" class="button" round :data-level="dish.level" :data-id="dish.id" @click="sub"></el-button>
          <p>{{dish.number}}</p>
          <el-button type="success" icon="el-icon-plus" class="button" round :data-level="dish.level" :data-id="dish.id" @click="add"></el-button>
        </div>
      </div>
      <div class="summary">
        <div class="total">总价：￥{{total}}</div>
        <div class="pay">立即支付</div>
      </div>
    </div>
    <div class="mask" v-show="showCar" @click="off"></div>
  </el-container>
</template>

<script>
import BScroll from 'better-scroll'
export default {
  name: 'dinner',
  data () {
    return {
      recommandId: [
        {
          level: 1,
          id: 1
        },
        {
          level: 2,
          id: 1
        },
        {
          level: 2,
          id: 2
        },
        {
          level: 2,
          id: 3
        },
        {
          level: 2,
          id: 4
        },
        {
          level: 2,
          id: 5
        }
      ],
      dishes: [
        {
          title: '优惠',
          id: 0,
          foods: [
            {
              title: '菜品1',
              url: '../../static/image/slider1.jpg',
              price: '11',
              id: 1,
              number: 0
            },
            {
              title: '菜品2',
              url: '../../static/image/slider2.jpg',
              price: '12',
              id: 2,
              number: 0
            },
            {
              title: '菜品3',
              url: '../../static/image/slider3.jpg',
              price: '13',
              id: 3,
              number: 0
            },
            {
              title: '菜品4',
              url: '../../static/image/slider4.jpg',
              price: '14',
              id: 4,
              number: 0
            },
            {
              title: '菜品5',
              url: '../../static/image/slider5.jpg',
              price: '15',
              id: 5,
              number: 0
            },
            {
              title: '菜品6',
              url: '../../static/image/slider6.jpg',
              price: '11',
              id: 6,
              number: 0
            }
          ]
        },
        {
          title: '热销',
          id: 1,
          foods: [
            {
              title: '菜品1',
              url: '../../static/image/slider1.jpg',
              price: '11',
              id: 1,
              number: 0
            },
            {
              title: '菜品2',
              url: '../../static/image/slider2.jpg',
              price: '12',
              id: 2,
              number: 0
            },
            {
              title: '菜品3',
              url: '../../static/image/slider3.jpg',
              price: '13',
              id: 3,
              number: 0
            },
            {
              title: '菜品4',
              url: '../../static/image/slider4.jpg',
              price: '14',
              id: 4,
              number: 0
            },
            {
              title: '菜品5',
              url: '../../static/image/slider5.jpg',
              price: '15',
              id: 5,
              number: 0
            },
            {
              title: '菜品6',
              url: '../../static/image/slider6.jpg',
              price: '11',
              id: 6,
              number: 0
            }
          ]
        },
        {
          title: '套餐',
          id: 2,
          foods: [
            {
              title: '菜品1',
              url: '../../static/image/slider1.jpg',
              price: '11',
              id: 1,
              number: 0
            },
            {
              title: '菜品2',
              url: '../../static/image/slider2.jpg',
              price: '12',
              id: 2,
              number: 0
            },
            {
              title: '菜品3',
              url: '../../static/image/slider3.jpg',
              price: '13',
              id: 3,
              number: 0
            },
            {
              title: '菜品4',
              url: '../../static/image/slider4.jpg',
              price: '14',
              id: 4,
              number: 0
            },
            {
              title: '菜品5',
              url: '../../static/image/slider5.jpg',
              price: '15',
              id: 5,
              number: 0
            },
            {
              title: '菜品6',
              url: '../../static/image/slider6.jpg',
              price: '11',
              id: 6,
              number: 0
            }
          ]
        },
        {
          title: '小吃',
          id: 3,
          foods: [
            {
              title: '菜品1',
              url: '../../static/image/slider1.jpg',
              price: '11',
              id: 1,
              number: 0
            },
            {
              title: '菜品2',
              url: '../../static/image/slider2.jpg',
              price: '12',
              id: 2,
              number: 0
            },
            {
              title: '菜品3',
              url: '../../static/image/slider3.jpg',
              price: '13',
              id: 3,
              number: 0
            },
            {
              title: '菜品4',
              url: '../../static/image/slider4.jpg',
              price: '14',
              id: 4,
              number: 0
            },
            {
              title: '菜品5',
              url: '../../static/image/slider5.jpg',
              price: '15',
              id: 5,
              number: 0
            },
            {
              title: '菜品6',
              url: '../../static/image/slider6.jpg',
              price: '11',
              id: 6,
              number: 0
            }
          ]
        },
        {
          title: '饮品',
          id: 4,
          foods: [
            {
              title: '菜品1',
              url: '../../static/image/slider1.jpg',
              price: '11',
              id: 1,
              number: 0
            },
            {
              title: '菜品2',
              url: '../../static/image/slider2.jpg',
              price: '12',
              id: 2,
              number: 0
            },
            {
              title: '菜品3',
              url: '../../static/image/slider3.jpg',
              price: '13',
              id: 3,
              number: 0
            },
            {
              title: '菜品4',
              url: '../../static/image/slider4.jpg',
              price: '14',
              id: 4,
              number: 0
            },
            {
              title: '菜品5',
              url: '../../static/image/slider5.jpg',
              price: '15',
              id: 5,
              number: 0
            },
            {
              title: '菜品6',
              url: '../../static/image/slider6.jpg',
              price: '11',
              id: 6,
              number: 0
            }
          ]
        }
      ],
      shopId: [],
      show: false,
      menu: null,
      food: null,
      scrollY: 0,
      listHeight: []
    }
  },
  computed: {
    total: function () {
      let sum = 0
      for (let i = 0; i < this.shopCar.length; i++) {
        sum = sum + this.shopCar[i].price * this.shopCar[i].number
      }
      return sum
    },
    showCar: function () {
      if (this.shopId.length === 0) {
        return false
      } else {
        return this.show
      }
    },
    menu_level: function () {
      let menu = []
      for (let i = 0; i < this.dishes.length; i++) {
        menu.push(this.dishes[i].title)
      }
      return menu
    },
    recommands: function () {
      let arr = []
      let temp
      for (let i = 0; i < this.recommandId.length; i++) {
        for (let j = 0; j < this.dishes.length; j++) {
          if (this.dishes[j].id === this.recommandId[i].level) {
            temp = this.dishes[j].foods
            break
          }
        }
        for (let j = 0; j < temp.length; j++) {
          if (this.recommandId[i].id === temp[j].id) {
            arr.push({level: this.recommandId[i].level, ...temp[j]})
            break
          }
        }
      }
      return arr
    },
    shopCar: function () {
      let shopCar = []
      let temp
      for (let i = 0; i < this.shopId.length; i++) {
        for (let j = 0; j < this.dishes.length; j++) {
          if (this.dishes[j].id === this.shopId[i].level) {
            temp = this.dishes[j].foods
            break
          }
        }
        for (let j = 0; j < temp.length; j++) {
          if (this.shopId[i].id === temp[j].id) {
            shopCar.push({level: this.shopId[i].level, ...temp[j]})
          }
        }
      }
      return shopCar
    }
  },
  methods: {
    select: function ($event) {
      let foodElm = this.$refs.food
      let foodList = foodElm.getElementsByClassName('food-level')
      let el = foodList[parseInt($event.currentTarget.dataset.id)]
      this.foodScroll.scrollToElement(el, 300)
    },
    power: function () {
      if (this.shopId.length > 0) {
        this.show = true
      }
    },
    off: function () {
      this.show = false
    },
    add: function ($event) {
      let id = parseInt($event.currentTarget.dataset.id)
      let level = parseInt($event.currentTarget.dataset.level)
      let note = true
      for (let i = 0; i < this.dishes.length; i++) {
        if (this.dishes[i].id === level) {
          for (let j = 0; j < this.dishes[i].foods.length; j++) {
            if (id === this.dishes[i].foods[j].id) {
              this.dishes[i].foods[j].number++
              break
            }
          }
          break
        }
      }
      for (let i = 0; i < this.shopId.length; i++) { // 购物车已存在
        if (this.shopId[i].id === id && this.shopId[i].level === level) {
          note = false
        }
      }
      if (note) {
        this.shopId.push({
          id: id,
          level: level
        })
      }
    },
    sub: function ($event) {
      let id = parseInt($event.currentTarget.dataset.id)
      let level = parseInt($event.currentTarget.dataset.level)
      let note = false
      for (let i = 0; i < this.dishes.length; i++) {
        if (this.dishes[i].id === level) {
          for (let j = 0; j < this.dishes[i].foods.length; j++) {
            if (id === this.dishes[i].foods[j].id) {
              this.dishes[i].foods[j].number--
              if (this.dishes[i].foods[j].number === 0) {
                note = true
                break
              }
            }
          }
          break
        }
      }
      if (note) {
        for (let i = 0; i < this.shopId.length; i++) {
          if (this.shopId[i].id === id && this.shopId[i].level === level) {
            this.shopId.splice(i, 1)
          }
        }
        if (this.shopId.length === 0) this.show = false
      }
    },
    _initScroll: function () {
      this.menuSroll = new BScroll((this.$refs.menu), {
        click: true
      })
      this.foodScroll = new BScroll((this.$refs.food), {
        probeType: 3,
        click: true
      })
      this.foodScroll.on('scroll', (pos) => {
        this.scrollY = Math.abs(Math.round(pos.y))
      })
    },
    getGoodHeight: function () {
      let foodElm = this.$refs.food
      let height = 0
      this.listHeight.push(height)
      let foodList = foodElm.getElementsByClassName('food-level')
      for (let i = 0; i < foodList.length; i++) {
        let item = foodList[i]
        height += item.clientHeight
        this.listHeight.push(height)
      }
    },
    currentIndex: function () {
      for (let i = 0; i < this.listHeight.length; i++) {
        let height1 = this.listHeight[i]
        let height2 = this.listHeight[i + 1]
        if (!height2 || (this.scrollY < height2 && this.scrollY >= height1)) {
          return i
        }
      }
    }
  },
  created () {
    this.$nextTick(() => {
      this._initScroll()
      this.getGoodHeight()
    })
  }
}
</script>

<style lang="scss" scoped>
  @import '../style/common';
  @keyframes power {
    0%{
      bottom: -30vh;
      opacity: 0.3;
    }

    100%{
      bottom: 0;
      opacity: 1;
    }
  }
  @keyframes power {
    0%{
      opacity: 0.3;
    }

    100%{
      opacity: 1;
    }
  }
  .container{
    height: 91vh;
    display: flex;
    flex-direction: column;
    .header{
      display: flex;
      flex-direction: row;
      align-items: center;
      background-color: $header_color;
      color: $font_color;
      .avatar{
        width: 5rem;
        height: 5rem;
        border-radius: 50%;
        margin-right: 2rem;
      }
    }
    .main{
      padding: 0;
      margin-top: 5px;
      flex: 1;
      display: flex;
      flex-direction: column;
      overflow: hidden;
    }
    .shop-car-img{
      position: fixed;
      right: 1rem;
      bottom: 6rem;
      width: 3rem;
      height: 3rem;
      border-radius: 50%;
      background-color: $header-color;
      display: flex;
      justify-content: center;
      align-items: center;
      img{
        width: 70%;
      }
    }
    .shop-car{
      max-height: 40vh;
      overflow: auto;
      position: fixed;
      bottom: 0;
      z-index: 999;
      width: 100%;
      animation: power 0.3s linear;
      background-color: $panel_color;
      h3{
        font-size: 0.5rem;
        text-align: left;
        margin: 0;
        padding: 0.3rem;
        color: $font_color;
        border-top: 1px solid #dcdcdc;
        border-bottom: 1px solid #dcdcdc;
        box-shadow: 0 1px 1px #dcdcdc;
      }
      .shopcar-item{
        display: flex;
        flex-direction: row;
        justify-content: space-between;
        align-items: center;
        padding: 0 1rem;
        border-bottom: 1px solid #dcdcdc;
        color: $font_color;
        .shopcar-btn{
          display: flex;
          height: 1rem;
          justify-content: center;
          align-items: center;
          p{
            line-height: 1rem;
            margin: 0 0.5rem;
          }
          .button{
            padding: 0;
          }
        }
      }
      .summary{
        display: flex;
        flex-direction: row;
        height: 3rem;
        align-items: center;
        .total{
          height: 100%;
          line-height: 3rem;
          flex: 2;
          text-align: left;
          padding-left: 3rem;
          box-sizing: border-box;
          color: $font_color;
        }
        .pay{
          flex: 1;
          height: 100%;
          line-height: 3rem;
          text-align: center;
          background-color: $header_color;
          color: #ffffff;
        }
      }
    }
    .mask{
      background-color: rgba(0, 0, 0, 0.3);
      position: fixed;
      top: 0;
      bottom: 0;
      left: 0;
      right: 0;
      animation: maskpower 0.3s linear;
      z-index: 888;
    }
  }
  .recommand{
    background-color: $bg_color;
    overflow: auto;
    .recommand-detail{
      display: flex;
      flex-direction: column;
      background-color: $panel_color;
      span{
        text-align: left;
      }
      .bottom {
        width: 100%;
        margin: 0.5rem 0;
        text-align: left;
        position: relative;
        .btn-group{
          position: absolute;
          right: 0.2rem;
          bottom: 0.1rem;
          display: flex;
          flex-direction: row;
          align-items: flex-end;
          height: 1rem;
          button{
            padding: 0;
            width: 1rem;
          }
          p{
            margin: 0 0.5rem;
            line-height: 1rem;
          }
        }
        .price {
          color: #929292;
          font-size: 0.5rem;
        }
      }
    }
    .image {
      width: 6rem;
      display: block;
    }
  }

  .menu-title{
    margin: 0;
    text-align: left;
    color: $font_color;
    padding: 0 10px;
    border-bottom: 1px solid #dcdcdc;
  }

  .menu{
    background-color: $bg_color;
    flex: 1;
    display: flex;
    flex-direction: row;
    margin: 0;
    .menu-level{
      height: 100%;
      list-style: none;
      padding: 0;
      width: 25%;
      color: $font_color;
      border-right: 1px solid #dcdcdc;
      margin: 0;
      ul{
        list-style: none;
        padding: 0;
        li{
          cursor: pointer;
          border-bottom: 1px solid #dcdcdc;
          padding: 0.8rem 0.5rem;
        }
        .active{
          display: block;
          margin-right: -1px;
          background-color: $bg_color;
        }
      }
    }
    .menu-body{
      width: 100%;
      overflow: scroll;
      padding-bottom: 3.5rem;
      ul{
        list-style: none;
        padding: 0;
        margin: 0;
        .food-level{
          h3{
            margin: 0;
            color: $font_color;
            font-size: 1rem;
            font-weight: normal;
            text-align: left;
            padding: 0 1rem;
            border-bottom: 1px solid #dcdcdc;
            background-color: $header_color;
          }
          .level-item{
            .menu-item{
            color: $font_color;
            width: 100%;
            box-sizing: border-box;
            position: relative;
            display: flex;
            flex-direction: row;
            justify-content: flex-start;
            align-items: center;
            width: 100%;
            padding: 1rem;
            border-bottom: 1px solid #dcdcdc;
              img{
                width: 5rem;
              }
              .item-detail{
                p{
                  text-align: left;
                  margin: 0;
                  margin-left: 1rem;
                  &:first-child{
                    margin-bottom: 1rem;
                  }
                  &:last-child{
                    font-size: 0.8rem;
                    color: #929292;
                  }
                }
              }
              .btn-group{
                position: absolute;
                bottom: 1rem;
                right: 1rem;
                display: flex;
                flex-direction: row;
                align-items: flex-end;
                height: 1rem;
                button{
                  padding: 0;
                }
                p{
                  margin: 0 0.5rem;
                  line-height: 1rem;
                }
              }
            }
          }
        }
      }
    }
  }
</style>
