// pages/orderDetails/orderDetails.js
import { IndexModel } from '../../request/index.js'
const indexModel = new IndexModel()
const app = getApp()
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
    contentList: [],
    page: 1,
    key: true
  },
  onLoad: function (options) {
    this.initQueryData(options.index)
    this.getOrderList(options.index,1)
  },

  //触底刷新
  onReachBottom() {
    if(this.data.key) {
      let page = this.data.page + 1
      this.setData({ page })
      let status = this.data.tabVal
      this.getOrderList(status, page)
    }
  },
  //获取订单列表
  getOrderList(status,page) {
    this._loading()
    let index = status - 1
    indexModel.getOrderList(this.data.phone,index,page).then(res => {
      if(res.status == 1) {
        this._loaded()
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
        tabVal: index,
        phone: app.globalData.phone
      })
    }
  },
  //tab组件触发
  getCurrentTab(e) {
    this._loading()
    let index = e.detail.currentTab
    this.setData({
      tabVal: index,
      page: 1,
      key: true,
      current: index
    })
    this.getOrderList(index,1)
  },
  //加载图标
  _loading() {
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
  },
  //隐藏加载图标
  _loaded() {
    wx.hideLoading()
  }
})