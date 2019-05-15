import { IndexModel } from '../../request/index.js'
const indexModel = new IndexModel()
const app = getApp()
Page({
  data: {
    key:false
  },
  onLoad: function (options) {
    this.getOrderDetails(options.no)
  },
  //获取订单详情
  getOrderDetails(number) {
    indexModel.getOrderDetails(number).then(res => {
      if(res.status == 1) {
        this.setData({
          orderDetails: res.data
        })
      }
    })
  },
  //支付订单
  comfirm() {
    if (this._isLock()) {
      return
    }
    this._lock()
    this.orderPay()
  },
  //请求数据
  orderPay() {
    let list = this.data.orderDetails
    let openId = app.globalData.openId
    let obj = {
      orderNumber: list.orderNumber,
      body: list.productName,//  商品名称,
      detail: list.productSpecification,//    商品详细描述,
      totalPrice: list.totalPrice,//  交易金额，订单总价,
      'sceneInfo': {},
      // ip: app.globalData.ip,//   客户端ip,
      ip: '',
      openId: openId,//   会员微信openid'
    }
    this.sendData(obj)
  },
  //发起支付
  sendData(obj) {
    indexModel.orderPay(obj).then(res => {
      if (res.status) {
        let data = res.data
        wx.requestPayment({
          timeStamp: data.timeStamp,
          nonceStr: data.nonceStr,
          package: data.package,
          signType: 'MD5',
          paySign: data.paySign,
          success: res => {
            this._unlock()
            this.toOrderPage()
          },
          fail: res => {
            this._unlock()
            this.toOrderPage()
          }
        })
      }
    })
  },
  //成功或者失败跳转页面
  toOrderPage() {
    wx.navigateBack({
      delta: 1
    })
    // wx.redirectTo({
    //   url: "/pages/orderDetails/orderDetails?index=1"
    // })
  },
  //取消订单提示
  cancle() {
    let number = this.data.orderDetails.orderNumber
    wx.showModal({
      title: '提示',
      content: '是否取消订单',
      success:(res) => {
        //刷新页面数据
        if (res.confirm) {
          this.cancleOrder(number)
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  },
  //取消订单
  cancleOrder(number) {
    indexModel.cancleOrder(number).then(res => {
      if(res.status == 1) {
        // var pages = getCurrentPages();
        // var prevPage = pages[pages.length - 2];  //上一个页面
        // prevPage.setData({
        //   mydata: { index: 0 }
        // })
        // wx.navigateBack({
        //   delta: 1
        // })
        wx.redirectTo({
          url: '/pages/orderDetails/orderDetails?index=0'
        })
      }
    })
  },
  _isLock() {
    return this.data.key
  },
  _lock() {
    this.setData({
      key: true
    })
    wx.showLoading({
      title: '加载中',
      mask: true,
    })
  },
  _unlock() {
    this.setData({
      key: false
    })
    wx.hideLoading()
  }
})