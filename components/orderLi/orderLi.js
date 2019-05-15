import { IndexModel } from '../../request/index.js'
const indexModel = new IndexModel()
const app = getApp()

Component({
  properties: {
    orderList: null,
    type: String
  },
  data: {
   
  },
  ready() {
    // this.getIp()
  },
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  methods: {
    payBtn() {
      this.orderPay()
    },
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
             this.toOrderPage()
            },
            fail: res => {
              wx.showToast({
                title: '支付失败',
                icon: 'none'
              })
            }
          })
        }
      })
    },
    toOrderPage() {
      wx.redirectTo({
        url: "/pages/orderDetails/orderDetails?index=0"
      })
    }
  }
})
