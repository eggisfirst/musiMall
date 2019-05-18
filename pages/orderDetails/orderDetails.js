// pages/orderDetails/orderDetails.js
import { IndexModel } from '../../request/index.js'
const indexModel = new IndexModel()
const app = getApp()
Page({
  data: {
    list: ['全部','待付款','待核销','已核销'],
    contenList: [],
    page: 1,
    key: true
  },
  onLoad: function (options) {
    this.initQueryData(options.index)
    this.getOrderList(options.index,1)
  },
  //下拉刷新
  onPullDownRefresh() {
    // console.log(this.data.current)
    wx.showNavigationBarLoading();//在当前页面显示导航条加载动画。
    this.getOrderList(this.data.current, 1)
  },
  //触底刷新
  onReachBottom() {
    if(this.data.key) {
      let page = this.data.page + 1
      this.setData({ page })
      let status = this.data.current
      this.getOrderList(status, page)
    }
  },
  //获取订单列表
  getOrderList(status,page) {
    let index = status - 1
    indexModel.getOrderList(this.data.phone,index,page).then(res => {
      if(res.status == 1) {
        wx.hideNavigationBarLoading();//隐藏导航条加载动画。
        wx.stopPullDownRefresh();//停止当前页面下拉刷新。
        if(page == 1) {
          this._locked(res.data.list)
          this._setList(res.data.list)
        }else {
          this._locked(res.data.list)
          let list = this.data.contenList.concat(res.data.list)
          this._setList(list)
        }
      }
    })
  },
  //设置数据
  _setList(list) {
    this.setData({
      contenList: list
    })
  },
  //上锁
  _locked(list) {
    if (list && list.length < 10) {
      this.setData({
        key: false
      })
    }
  },
  //判断第几个tab
  initQueryData(index) {
    if(index) {
      this.setData({
        current: index,
        // tabVal: index,
        phone: app.globalData.phone
      })
    }
  },
  //tab组件触发
  getCurrentTab(e) {
    let index = e.detail.currentTab
    this.setData({
      // tabVal: index,
      page: 1,
      key: true,
      current: index,
      contenList: []
    })
    this.getOrderList(index,1)
  }
})