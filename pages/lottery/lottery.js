// pages/lottery/lottery.js
import { IndexModel } from '../../request/index.js'
const indexModel = new IndexModel()
const app = getApp()

Page({
  data: {
    fixed: "",
    scrollTop: 0,
    showRules: false,
    allScore: 0,
  },
  onLoad (options) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
  //判断onLaunch是否执行完毕
  if (app.globalData.userId) {
    wx.hideLoading()
    this.getUserIntegral(app.globalData.userId)
  } else {
    app.checkLoginReadyCallback = res => {
      wx.hideLoading()
      this.getUserIntegral(res.data.id)
    };
  }
  },
  //获取用户积分
  getUserIntegral() {
    const userId = app.globalData.userId
    indexModel.getUserIntegral(userId).then(res => {
      if(res.status) {
        this.setData({
          allScore: res.data.surplusIntegral
        })
      }
    })
  },
  //点击开始抽奖
  startLottery() {
    let allScore = this.data.allScore
    if(allScore >= 50) {
      allScore = allScore - 50
      this.setData({
        allScore
      })
    }
   
  },
  //监听页面滚动距离
  onPageScroll(e) { // 获取滚动条当前位置
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  //设置背景是否固定
  sexFixStatus(e) {
    const status = e.detail.status
    const fixed = status? 'indexFixed' : ''
    const hasScroll = e.detail.type  //判断页面需不需要滚动
    this.setPageScroll(hasScroll,status)
    this.setData({
      fixed
    })
  },
  //页面滚动到指定位置
  setPageScroll(hasScroll,status) {
    if(!hasScroll) {
      return
    }
    if(!status) {
      this.setPageScroll()
    }else {
      wx.setStorageSync('srcollTop', this.data.scrollTop)
    }
    const scrollTop = wx.getStorageSync('srcollTop')
    setTimeout(() => {
      wx.pageScrollTo({
        scrollTop
      })
    }, 10);
  },
  //点击打开规则
  handleRuleBtn() {
    this.setData({
      showRules: true,
      fixed: 'indexFixed'
    })
  },
  //关闭规则
  setShowRules() {
    this.setData({
      showRules: false,
      fixed: ''
    })
  }

})