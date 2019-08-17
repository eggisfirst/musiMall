// pages/orderDetails/orderDetails.js
import { IndexModel } from '../../request/index.js'
const indexModel = new IndexModel()
const app = getApp()
Page({
  data: {
    list: ['全部','待付款','待核销','已核销'],
    contenList: [],
    page: 1,
    key: true,
    hasMoreData: false,
    noData: false,
  },
  onLoad: function (options) {
    this.initQueryData(options.index)
    this.getOrderList(options.index,1)
  },
  //初始化参数
  initParmas() {
    this.setData({
      hasMoreData: false,
      noData: false,
      key: true,
      page: 1
    })
  },
  //下拉刷新
  onPullDownRefresh() {
    // console.log(this.data.current)
    wx.showNavigationBarLoading();//在当前页面显示导航条加载动画。
    this.initParmas()
    this.getOrderList(this.data.current, 1)
  },
  //触底刷新
  onReachBottom() {
    if(this.data.key) {
      let page = this.data.page + 1
      this.setData({ 
        page,
        hasMoreData: true
      })
      let status = this.data.current
      this.getOrderList(status, page)
    }
  },
  //获取订单列表
  getOrderList(status,page) {
    let index = status - 1
    /**添加了unionid */
    const id = app.globalData.unionId
    indexModel.getOrderList(this.data.phone,index,page,id).then(res => {
      if(res.status == 1) {
        wx.hideNavigationBarLoading();//隐藏导航条加载动画。
        wx.stopPullDownRefresh();//停止当前页面下拉刷新。
        if(page == 1) {
          this._locked(res.data.list)
          this._setList(res.data.list)
        }else {
          let list = this.data.contenList.concat(res.data.list)
          this._setList(list)
          this._locked(res.data.list)
        }
      }
    })
  },
  //设置数据
  _setList(list) {
    this.setData({
      contenList: list,
      hasMoreData: false
    })
  },
  //上锁
  _locked(list) {
    if (list && list.length < 10) {
      list.length === 0 ? this.hasNoData() : this.noMoreData()
    }
  },
  //初始没有数据
  hasNoData() {
    this.setData({
      key: false,
      noData: false
    })
  },
  //数据不到10条
  noMoreData() {
    this.setData({
      key: false,
      noData: true
    })
  },
  //判断第几个tab
  initQueryData(index) {
    if(index) {
      this.setData({
        current: index,
        // tabVal: index,
        phone:  wx.getStorageSync('phone')
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
      contenList: [],
      hasMoreData: false,
      noData: false
    })
    this.getOrderList(index,1)
  }
})