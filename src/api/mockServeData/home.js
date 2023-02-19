//mock数据模拟
import Mock from 'mockjs'

//图表数据
let List = []
export default {
  getStatisticalData: () => {
    for (let i = 0; i < 7; i++) {
      List.push(
        Mock.mock({
          苹果: Mock.Random.float(100, 8000, 0, 0),
          vivo: Mock.Random.float(100, 8000, 0, 0),
          oppo: Mock.Random.float(100, 8000, 0, 0),
          魅族: Mock.Random.float(100, 8000, 0, 0),
          三星: Mock.Random.float(100, 8000, 0, 0),
          小米: Mock.Random.float(100, 8000, 0, 0)
        })
      )
    }
    return {
      code: 2000,
      data: {
        //饼图
        videoData: [
          {
            name: '小米',
            value: 2999
          },
          {
            name: '苹果',
            value: 5999
          },
          {
            name: 'vivo',
            value: 1999
          },
          {
            name: 'oppo',
            value: 1500
          },
          {
            name: '魅族',
            value: 500
          },
          {
            name: '三星',
            value: 4999
          }
        ],
        //柱状图
        userData: [
          {
            data: '周一',
            new: 5,
            active: 200
          },
          {
            data: '周二',
            new: 10,
            active: 500
          },
          {
            data: '周三',
            new: 12,
            active: 550
          },
          {
            data: '周四',
            new: 8,
            active: 300
          },
          {
            data: '周五',
            new: 11,
            active: 400
          },
          {
            data: '周六',
            new: 28,
            active: 600
          },
          {
            data: '周日',
            new: 33,
            active: 800
          }
        ],
        //折线图
        orderData: {
          date: ['20191001', '20191002', '20191003', '20191004', '2191005', '20191006', '20191007'],
          data: List
        },
        //表格数据
        tableData: [
          {
            name: 'oppo',
            todayBuy: 500,
            monthBuy: 3500,
            totalBuy: 22000
          },
          {
            name: 'vivo',
            todayBuy: 1000,
            monthBuy: 5000,
            totalBuy: 32000
          },
          {
            name: '小米',
            todayBuy: 800,
            monthBuy: 3000,
            totalBuy: 21000
          },
          {
            name: '三星',
            todayBuy: 1200,
            monthBuy: 3000,
            totalBuy: 50000
          },
          {
            name: '苹果',
            todayBuy: 1500,
            monthBuy: 5500,
            totalBuy: 62000
          },
          {
            name: '魅族',
            todayBuy: 700,
            monthBuy: 3900,
            totalBuy: 32000
          }
        ]
      }
    }
  }
}