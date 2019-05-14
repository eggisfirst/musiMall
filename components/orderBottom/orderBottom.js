import { IndexModel } from '../../request/index.js'
const indexModel = new IndexModel()
const app = getApp()
Component({
  properties: {
    orderList:null
  },
  data: {

  },
  ready() {
    this.getIp()
  },
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  methods: {
    pay() {
      this.orderPay()
    },
    //请求数据
    orderPay() {
      let list = this.properties.orderList
      let openId = app.globalData.openId
      let obj = {
        orderNumber: list.orderNumber,
        body: list.productName,//  商品名称,
        detail: list.productSpecification,//    商品详细描述,
        totalPrice: list.totalPrice,//  交易金额，订单总价,
        'sceneInfo': {},
        ip: this.data.ip,//   客户端ip,
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
              this.toOrderPage()
            },
            fail: res => {
              this.toOrderPage()
            }
          })
        }
      })
    },
    //成功或者失败跳转页面
    toOrderPage() {
      wx.redirectTo({
        url: "/pages/orderDetails/orderDetails?index=0"
      })
    },
    //或者手机ip
    getIp() {
      wx.request({
        url: 'http://ip-api.com/json',
        success:res => {
          this.setData({
            ip: res.data.query
          })
        }
      })
    }
  }
})
