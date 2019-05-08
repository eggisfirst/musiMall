// pages/order/order.js
Page({
  data: {

  },
  onLoad: function (options) {
    if(this.options.num) {
      this.initData(options)
    }
    // console.log(options.id)
    // console.log(options.num)
  },
  initData(options) {
    this.setData({
      num: options.num
    })
  }
})