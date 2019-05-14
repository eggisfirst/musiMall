
import {IndexModel} from '../../request/index.js'
const indexModel = new IndexModel()
Page({
  data: {
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
    list: [{
      name: '正在疯抢',
      tab: 0,
      }, {
      name: '即将开抢',
      tab: 1,
      }, {
      name: '抢购结束',
      tab: 2,
    }],
    contenList: [],
    showTips: true,
    tipsText: '请先登录'
  },
  onLoad(options) {
    this.getAdvertisement()
    this.initData()
  },
  //初始的时候选择正在抢购
  initData() {
    if (getApp().globalData.key) {
      getApp().globalData.key = false
      this.getArtivityProductList(1)
    }
  },
  //获取首页轮播图
  getAdvertisement() {
    indexModel.getAdvertisement().then(res => {
      if(res.status == 1) {
        this.setData({
          imgUrls: res.data
        })
      }
    })
  },
  //获取活动列表
  getArtivityProductList(status) {
    indexModel.getArtivityProductList(status).then(res => {
      if(res.status) {
        this.setData({
          contenList: res.data
        })
      }
    })
  },
  //tab组件触发
  getCurrentTab(e) {
    let index = e.detail.currentTab
    this.setData({
      tabVal: index
    })
    let status = index == 0 ? 1 : index == 1? 0 : 2
    this.getArtivityProductList(status)
  },
  //content组件触发
  setCurrentTab(e) {
    let index = e.detail.current
    this.setData({
      current: index
    })
    let status = index == 0 ? 1 : index == 1 ? 0 : 2
    this.getArtivityProductList(status)
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
    wx.redirectTo({
      url: '../login/login'
    })
  },
})
