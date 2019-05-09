// pages/orderStatus/orderStatus.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    orderMsg: [{
      name: "订单号",
      msg: '201990009991232321'
    }, {
      name: "手机号",
      msg: '15013999222'
    }, {
      name: "下单时间",
      msg: '2019-03-15 12:30'
    }, {
      name: "关闭时间",
      msg: '2019-03-15 12:40'
    }, {
      name: "数量",
      msg: '1'
    }, {
      name: "总价",
      msg: '¥100.00'
    }]
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
  }
})