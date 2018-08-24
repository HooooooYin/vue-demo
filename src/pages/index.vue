<template>
  <el-container>
    <el-header class="header" height="10rem">
      <img src="../../static/image/avatar.jpg" class="avatar">
      <p>被绿色包围的陈棉耿</p>
    </el-header>
    <el-main class="main">
      <el-carousel :interval="4000" type="card" style="padding: 5px 20px;" height="100px" indicator-position="none" arrow="never">
        <el-carousel-item v-for="item in item" class="slider" :key="item">
          <img :src="item" class="slider-img">
        </el-carousel-item>
      </el-carousel>
      <div class="main-body">
        <div class="notices">
          <p class="notices-title">
            <i>
              <img src="../../static/image/notices.png" alt="">
            </i>
            <span>公告</span>
          </p>
          <div class="notices-body">
            <p v-for="(notice, index) in notices" :key="index">
              {{index + 1 + '.' + notice}}
            </p>
          </div>
        </div>
        <div class="notices">
          <p class="notices-title">
            <i>
              <img src="../../static/image/activities.png" alt="">
            </i>
            <span>活动</span>
          </p>
          <div class="notices-body">
            <p v-for="(activity, index) in activities" :key="index">
              {{index + 1 + '.' + activity}}
            </p>
          </div>
        </div>
        <div class="notices">
          <p class="notices-title">
            <i>
              <img src="../../static/image/shop.png" alt="">
            </i>
            <span>商家信息</span>
          </p>
          <div class="notices-body">
            <p v-for="(shop_info, index) in shop_infos" :key="index">
              {{index + 1 + '.' + shop_info}}
            </p>
          </div>
        </div>
      </div>
    </el-main>
  </el-container>
</template>

<style lang="scss" scoped>
  @import '../style/common';
  .header{
    background-color: $header_color;
    display: flex;
    flex-direction: column;
    justify-content: center;
    align-items: center;
    color: $font_color;
    .avatar{
      height: 5rem;
      width: 5rem;
      border-radius: 50%;
    }
  }

  .main{
    padding: 0;
    flex: 1;

    .slider{
      width: 10rem;
      .slider-img{
        width: 9rem;
      }
    }

    .main-body{
      display: flex;
      flex-direction: column;
      align-items: center;
      justify-content: flex-start;
      .notices{
        box-shadow: 0 0 1rem #dcdcdc;
        margin: 1rem 0;
        width: 95%;
        background-color: $panel_color;
        &:last-child{
          margin-bottom: 4rem;
        }
        .notices-title{
          display: flex;
          flex-direction: row;
          align-items: flex-start;
          font-size: 0.8rem;
          text-align: left;
          padding: 0 10px;
          margin: 0;
          border-bottom: 1px solid #dcdcdc;
          background-color: $header_color;
          color: $font_color;
          img{
                height: 15px;
                margin-right: 5px;
          }
        }
        .notices-body{
          text-align: left;
          padding: 1rem;
          border-bottom: 1px solid #dcdcdc;
          height: 5rem;
          overflow: auto;
          color: $font_color;
          p{
            margin: 0;
            font-size: 0.8rem;
          }
        }
      }
    }
  }
</style>

<script>
export default {
  name: 'Home',
  data () {
    return {
      item: [
        '../static/image/slider1.jpg',
        '../static/image/slider2.jpg',
        '../static/image/slider3.jpg',
        '../static/image/slider4.jpg',
        '../static/image/slider5.jpg',
        '../static/image/slider6.jpg'
      ],
      notices: [
        '本店外卖饭盒价格统一为1元。',
        '本店晚上10点半以后配送费加5元。'
      ],
      activities: [
        '满19减9',
        '会员免配送费',
        '评价有机会免单'
      ],
      shop_infos: [
        '满19减9',
        '会员免配送费',
        '评价有机会免单'
      ]
    }
  }
}
</script>
