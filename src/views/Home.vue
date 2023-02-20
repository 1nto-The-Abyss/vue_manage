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
        <el-card style="height: 240px;margin-bottom:10px;">
          <div ref="line" style="height:240px"></div>
        </el-card>
        <div class="graph">
          <el-card style="height: 260px">
            <div ref="bar" style="height: 260px"></div>
          </el-card>
          <el-card style="height: 260px">
            <div ref="pie" style="height: 260px"></div>
          </el-card>
        </div>
      </el-col>
    </el-row>
  </div>
</template>
<script>
import { getData } from "../api/index";
import * as echarts from "echarts";
export default {
  name: "Home",
  data() {
    return {
      tableData: [],
      tableLabel: {
        name: "型号",
        todayBuy: "今日购买",
        monthBuy: "本月购买",
        totalBuy: "总购买"
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
    };
  },
  methods: {},
  mounted() {
    const lineChart = echarts.init(this.$refs.line);
    const barChart = echarts.init(this.$refs.bar)
    const pieChart = echarts.init(this.$refs.pie)
    getData().then(({ data }) => {
      const { tableData } = data.data;
      this.tableData = tableData;

      // 折线图
      const { orderData } = data.data;
      const linexAxis = Object.keys(orderData.data[0]);
      const lineSeries = [];
      linexAxis.forEach(key => {
        lineSeries.push({
          name: key,
          data: orderData.data.map(item => item[key]),
          type: "line"
        });
      });
      const lineOption = {
        title: { text: '商品销量' },
        xAxis: { data: orderData.date },
        yAxis: {},
        tooltip: {},
        legend: { data: linexAxis },
        series: lineSeries
      };
      lineChart.setOption(lineOption);
      // 柱状图
      const { userData } = data.data
      const barOption = {
        title: { text: '用户人数' },
        xAxis: {
          type: "category",
          data: userData.map(item => item.data)
        },
        yAxis: {
          type: "value"
        },
        tooltip: {},
        legend: {},
        series: [
          {
            name: '新增',
            data: userData.map(item => item.new),
            type: "bar"
          },
          {
            name: '活跃',
            data: userData.map(item => item.active),
            type: "bar"
          }
        ]
      }
      barChart.setOption(barOption);
      // 饼状图
      const { videoData } = data.data
      const pieOption = {
        title: { text: '商品利润' },
        tooltip: { trigger: 'item' },
        series: {
          type: 'pie',
          roseType: 'radius',
          radius: [10, 100],
          center: ['50%', '40%'],
          itemStyle: {
            borderRadius: 5
          },
          data: videoData.sort((item1,item2)=> item2.value-item1.value)
        }
      }
      pieChart.setOption(pieOption)
    });
    // 图表自适应
    window.addEventListener("resize",() => {
      lineChart.resize()
      barChart.resize()
      pieChart.resize()
    })
  }
};
</script>
<style scoped lang="less">
.el-col-8 {
  padding-right: 20px;
}
.user-card {
  .user {
    display: flex;
    align-items: center;
    position: relative;
    padding-bottom: 20px;
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
    margin-bottom: 10px;
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
.graph {
  display: flex;
  justify-content: space-between;
  .el-card {
    width: 49%;
    margin-bottom: 10px;
  }
}
</style>