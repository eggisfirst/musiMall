//index.js
//获取应用实例
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
    contentlist: [{
      name: 'tab1',
      tab: 0,
      productList: [
        {
          name: '产品名称产品名称产品名称产品名称产品名称产品名称',
          productType: 0,
          imgUrl: '',
          price: 500,
          slider: true,
          precent: 0,
          robbed: 0,
          priceSpike: 100,
          count: true,
          countHour: '01',
          countMin: '05',
          countSec: '30',
          maxlength: 1,
        }, {
          name: '优惠卷名称',
          productType: 1,
          imgUrl: '',
          price: 500,
          slider: true,
          precent: 0,
          robbed: 0,
          priceSpike: 100,
          count: true,
          countHour: '01',
          countMin: '05',
          countSec: '30',
          maxlength: 2,
        }
      ],
    }, {
      name: 'tab2',
      tab: 1,
      productList: [
        {
          name: '产品名称产品名称产品名称产品名称产品名称产品名称',
          productType: 0,
          price: 500,
          slider: false,
          precent: 0,
          robbed: 0,
          priceSpike: 100,
          piece: 50,
          count: false,
          startDay: '3月30日',
          startTime: '09:00'
        }
      ],
    }, {
      name: 'tab3',
      tab: 2,
      productList: [
        {
          name: '产品名称',
          productType: 0,
          price: 500,
          slider: true,
          precent: 10,
          robbed: 8,
          priceSpike: 100,
          piece: 50,
          count: false,
          endDay: true
        }
      ],
    }],
    showTips: true,
    tipsText: '请先登录'
  },
  onLoad(options) {
    this.getAdvertisement()
    this.getArtivityProductList()
    
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
  getArtivityProductList() {
    indexModel.getArtivityProductList(1).then(res => {
      console.log(res)
    })
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
