
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
    tipsText: '请先登录',
    key: true,
    page: 1
  },
  onLoad(options) {
    this.getAdvertisement()
    this.initData()
  },
  onReachBottom() {
    if (this.data.key) {
      let page = this.data.page + 1
      this.setData({ page })
      let status = this.data.tabVal || 1
      this.getArtivityProductList(status, page)
    }
  },
  //初始的时候选择正在抢购
  initData() {
    if (getApp().globalData.key) {
      getApp().globalData.key = false
      this.getArtivityProductList(1,1)
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
  getArtivityProductList(status,page) {
    indexModel.getArtivityProductList(status,page).then(res => {
      if(res.status) {
        if (page == 1) {
          this.setData({
            contenList: res.data.list
          })
        } else {
          if (res.data.list && res.data.list.length < 10) {
            this.setData({ key: false })
          }
          let list = this.data.contenList.concat(res.data.list)
          this.setData({
            contenList: list
          })
        }
      }
    })
  },
  //tab组件触发
  getCurrentTab(e) {
    let index = e.detail.currentTab
    this.setData({
      tabVal: index,
      key: true,
      page: 1
    })
    let status = index == 0 ? 1 : index == 1? 0 : 2
    this.getArtivityProductList(status,1)
  },
  //content组件触发
  setCurrentTab(e) {
    let index = e.detail.current
    this.setData({
      current: index
    })
    let status = index == 0 ? 1 : index == 1 ? 0 : 2
    this.getArtivityProductList(status,1)
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
