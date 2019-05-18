
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
    list: [ '正在疯抢','即将开抢','抢购结束'],
    contenList: [],
    showTips: true,
    tipsText: '请先登录',
    key: true,
    page: 1,
    status: 0,
    hasMoreData: false,
    noData:false
  },
  //下拉刷新
  onPullDownRefresh() {
    wx.showNavigationBarLoading();//在当前页面显示导航条加载动画。
    this.initParmas()
    let status = this.data.status == 0 ? 1 : this.data.status == 1 ? 0 : 2
    this.getArtivityProductList(status, 1)
  },
  onLoad(options) {
    this.getAdvertisement()
    this.initData()
  },
  //触底刷新
  onReachBottom() {
    if (this.data.key) {
      let page = this.data.page + 1
      this.setData({ 
        page,
        hasMoreData: true
      })
      let status = this.data.status == 0 ? 1 : this.data.status == 1 ? 0 : 2
      this.getArtivityProductList(status, page)
    }
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
  //初始的时候选择正在抢购
  initData() {
    //一键登录跳转过来
    if (getApp().globalData.key || getApp().globalData.login) {
      getApp().globalData.key = false
      this.setData({
        current: '0'
      })
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
    // this._loading()
    indexModel.getArtivityProductList(status,page).then(res => {
      if(res.status) {
        wx.hideNavigationBarLoading();//隐藏导航条加载动画。
        wx.stopPullDownRefresh();//停止当前页面下拉刷新。
        // this._loaded()
        if (page == 1) {
          this._locked(res.data.list)
          this._setList(res.data.list)
        } else {
          let list = this.data.contenList.concat(res.data.list)
          this._setList(list)
          this._locked(res.data.list)
        }
      }
    })
  },
  //tab组件触发
  getCurrentTab(e) {
    this._loading()
    let index = e.detail.currentTab
    this.setData({
      status: index,
      contenList: [],
      current: index,
      key: true,
      page: 1,
      noData: false,
      hasMoreData: false
    })
    let status = index == 0 ? 1 : index == 1 ? 0 : 2
    this.getArtivityProductList(status, 1)
  },
  //设置数据
  _setList(list) {
    this.setData({
      contenList: list,
      hasMoreData: false
    })
  },
  //上锁
  _locked(list,page) {
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
  },
  //打开登录提示
  setLoginTips(e) {
    this.setData({
      showTips: e.detail.loginTips
    })
  },
  //关闭提示
  closeTips(e) {
    if(e.detail.tips) {
      this._setShowTips()
      this._toLoginPage()
    }else {
      this._setShowTips()
    }
  },
  //跳转登录页面
  _toLoginPage() {
    wx.redirectTo({
      url: '../login/login?type=activity'
    })
  },
  //
  _setShowTips() {
    this.setData({
      showTips: true
    })
  }
})
