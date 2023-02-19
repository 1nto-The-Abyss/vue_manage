<template>
  <div class="container">
    <el-row>
      <el-col :span="8">
        <el-card>
          <div class="user-card">
            <div class="user">
              <img src="../assets/images/avatar.png"></img>
              <div class="user-info">
                <p class="name">Admin</p>
                <p class="role">管理员</p>
              </div>
            </div>
            <div class="login-info">
              <p>上次登录时间：<span>2023-01-20</span></p> 
              <p>上次登录地点：<span>南京</span></p> 
            </div>
          </div>
        </el-card>
        <el-card style="margin-top:20px; height:460px">
          <div class="table-card">
            <el-table
              :data="tableData"
              style="width: 100%">
              <el-table-column
                v-for="(val,key) in tableLabel"
                :prop="key"
                :label="val">
              </el-table-column>
            </el-table>
          </div>
        </el-card>
      </el-col>
      <el-col :span="16">
        <div class="order-data">
          <el-card v-for="item in countData" :key="item.name" :body-style="{display: 'flex'}">
            <i :class="`el-icon-${item.icon}`" class="icon" :style="{background:item.color}"></i>
            <div class="detail">
              <p class="price">￥{{ item.value }}</p>
              <p class="name">{{ item.name }}</p>
            </div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
export default {
  name: "Home",
  data(){
   return {
    tableData: [
      {
        name: 'oppo',
        todayBuy: 105,
        monthBuy: 242,
        totalBuy: 6320
      },
      {
        name: 'vivo',
        todayBuy: 210,
        monthBuy: 410,
        totalBuy: 8049
      },
      {
        name: 'honry',
        todayBuy: 300,
        monthBuy: 510,
        totalBuy: 4141
      },
      {
        name: 'xiaomi',
        todayBuy: 414,
        monthBuy: 636,
        totalBuy: 6266
      },
      {
        name: 'apple',
        todayBuy: 1340,
        monthBuy: 6366,
        totalBuy: 83423
      },
    ],
    tableLabel: {
      name: '型号',
      todayBuy: '今日购买',
      monthBuy: '本月购买',
      totalBuy: '总购买'
    },
    countData: [
      {
        name: "今日支付订单",
        value: 1111,
        icon: "success",
        color: "#2ec7c9"
      },
      {
        name: "今日收藏订单",
        value: 121,
        icon: "star-on",
        color: "#ffB980"
      },
      {
        name: "今日未支付订单",
        value: 431,
        icon: "s-goods",
        color: "#5ab1ef"
      },
      {
        name: "本月支付订单",
        value: 60782,
        icon: "success",
        color: "#2ec7c9"
      },
      {
        name: "本月收藏订单",
        value: 4087,
        icon: "star-on",
        color: "#ffB980"
      },
      {
        name: "本月未支付订单",
        value: 1431,
        icon: "s-goods",
        color: "#5ab1ef"
      }
    ]
   }
  },
  methods:{}
}
</script>
<style scoped lang="less">
.el-card {
  margin-bottom: 20px;
}
.el-col-8 {
  padding-right: 20px;
}
.user-card {
  .user {
    display: flex;
    align-items: center;
    position: relative;
    padding-bottom: 10px;
    img {
      width: 150px;
      height: 150px;
      border-radius: 50%;
      margin-right: 40px;
    }
    .user-info {
      .name {
        font-size: 32px;
        margin-bottom: 20px; 
      }
      .role {
        color: #999;
      }
    }
    &:after {
      content: "";
      position: absolute;
      bottom: 0px;
      width: 100%;
      border-bottom: 1px solid #dcdcdc;
    }
  }
  .login-info {
    padding-top: 20px;
    color: #666;
    p {
      margin-bottom: 10px;
    }
    span {
      margin-left: 10px;
    }
  }
}
.order-data {
  display: flex;
  flex-wrap: wrap;
  justify-content: space-between;
  .el-card {
    width: 32%;
    margin-bottom: 20px;
  }
  .icon {
    width: 80px;
    height: 80px;
    font-size: 30px;
    text-align: center;
    line-height: 80px;
    color: #fff;
  }
  .detail {
    display: flex;
    flex-direction: column;
    justify-content: center;
    margin-left: 15px;
    .price {
      font-size: 30px;
      margin-bottom: 10px;
    }
    .name {
      font-size: 14px;
      color: #999;
      margin-left: 10px;
    }
  }
}
</style>