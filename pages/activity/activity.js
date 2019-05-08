//index.js
//获取应用实例

Page({
  data: {
    imgUrls: [
      'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
      'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
    ],
    swiperType: {
      height: '300',
      indicatorDots: true,
      indicatorCcolor: "rgba(255,255,255,0.6)",
      indicatorActiveColor: '#fff',
      autoplay: true,
      interval: 3000,
      duration: 1000,
      circular: true
    },
    showTips: true,
    tipsText: '请先登录'
  },
  onLoad(options) {
  },
  //tab组件触发
  getCurrentTab(e) {
    this.setData({
      tabVal: e.detail.currentTab
    })
  },
  //content组件触发
  setCurrentTab(e) {
    this.setData({
      current: e.detail.current
    })
  },
  //打开提示
  setLoginTips(e) {
    this.setData({
      showTips: e.detail.loginTips
    })
  },
  //关闭提示
  closeTips(e) {
    this.setData({
      showTips: e.detail.tips
    })
    //登录
    getApp().globalData.login = true
    wx.redirectTo({
      url: '../login/login'
    })
  },
})
