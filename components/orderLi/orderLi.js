import { IndexModel } from '../../request/index.js'
const indexModel = new IndexModel()
const app = getApp()

Component({
  properties: {
    orderList: null,
    type: String
  },
  data: {
    key:false
  },
  ready() {
  },
  methods: {
    payBtn() {
      if (this._isLock()) {
        return
      }
      this._lock()
      this.orderPay()
    },
    //支付
    orderPay() {
      let list = this.properties.orderList
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
      this.send(obj)
    },
    //发送数据
    send(obj) {
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
              wx.showToast({
                title: '支付失败',
                icon: 'none'
              })
            }
          })
        }else {
          this._unlock()
          wx.showToast({
            title: '支付超时，请重新下单',
            icon: 'none'
          })
        }
      })
    },
    //跳转页面
    toOrderPage() {
      wx.redirectTo({
        url: "/pages/orderDetails/orderDetails?index=0"
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
  }
})
