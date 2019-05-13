// pages/orderDetails/orderDetails.js
import { IndexModel } from '../../request/index.js'
const indexModel = new IndexModel()
Page({
  data: {
    list: [{
      name: '全部',
      tab: 0,
    }, {
      name: '待付款',
      tab: 1,
    }, {
      name: '待核销',
      tab: 2,
    }, {
      name: '已核销',
      tab: 3,
    }],
    contentList: []
  },
  onLoad: function (options) {
    this.initQueryData(options.index)
    this.getOrderList(options.index)
  },
  //获取订单列表
  getOrderList(status) {
    let index = status - 1
    indexModel.getOrderList(index).then(res => {
      if(res.status == 1) {
        this.setData({
          contenList: res.data.list
        })
      }
    })
  },
  //判断第几个tab
  initQueryData(index) {
    console.log(index)
    if(index) {
      this.setData({
        tabVal: index
      })
    }
  },
  //tab组件触发
  getCurrentTab(e) {
    let index = e.detail.currentTab
    this.setData({
      tabVal: index
    })
    this.getOrderList(index)
    // console.log(e.detail.currentTab)
  },
  //content组件触发
  setCurrentTab(e) {
    let index = e.detail.current
    this.setData({
      current: index,
      key: true
    })
    this.getOrderList(index)
  },
})