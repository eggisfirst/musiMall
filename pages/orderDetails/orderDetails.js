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
    contentlist: [
      {
        tab:0,
        orderList: []
      },{
        tab:1,
        orderList: []
      },{
        tab:2,
        orderList: []
      },{
        tab:3,
        orderList: []
      }
    ]
  },
  onLoad: function (options) {
    this.initQueryData(options.index)
    this.getOrderList(options.index)
  },
  //获取订单列表
  getOrderList(index) {
    let status = index - 1
    let my_index = index
    let list = this.data.contentlist
    indexModel.getOrderList(status).then(res => {
      // console.log(res.data)
      if(res.status == 1) {
        list[my_index].orderList = res.data.list
        this.setData({
          contentlist: list
        })
      }
    })
  },
  //判断第几个tab
  initQueryData(index) {
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
    this.setData({
      current: e.detail.current
    })
  },
})