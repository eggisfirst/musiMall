// pages/coupon/coupon.js
import { IndexModel } from '../../request/index.js'
const indexModel = new IndexModel()
const app = getApp()
Page({

  /**
   * 页面的初始数据
   */
  data: {
    list: ['全部','未核销','已核销','已过期'],
    current: 0,
    couponList: [],
    status: false
  },
  onLoad() {
    this.getCoupon()
  },
   //下拉刷新
   onPullDownRefresh() {
    wx.showNavigationBarLoading();//在当前页面显示导航条加载动画。
    this.getCoupon(this.data.current)
  },
  //tab组件触发
  getCurrentTab(e) {
    let index = e.detail.currentTab
    const status = !this.data.status //每次切换都使规则状态初始化
    this.getCoupon(index)
    this.setData({
      status,
      current: index
    })
  },
  //获取优惠券
  getCoupon(loadListType) {
    const obj = {
      userId: app.globalData.userId,
      winning: 1,
      page: 1,
      limit: 10000,
      loadListType,
      code: "coupon"
    }
    indexModel.getCoupon(obj).then(res => {
      if(res.status) {
        wx.hideNavigationBarLoading();//隐藏导航条加载动画。
        wx.stopPullDownRefresh();//停止当前页面下拉刷新。
        const data = this.filterCouponData(res.data.list)
        this.setData({
          couponList: data
        })
      }
    })
  },
  filterCouponData(data) {
    let temp = data.filter(item => {
      return item.code === 'coupon'
    })
    return temp
  },
})