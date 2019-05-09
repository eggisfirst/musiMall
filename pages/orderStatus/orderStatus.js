// pages/orderStatus/orderStatus.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    endTime: "1557399093826"
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init(options)
  },
  init(options) {
    this.setData({
      queryData: options
    })
  },
  //支付订单
  comfirm() {
    console.log('pay')
  },
  //取消订单
  cancle() {
    wx.showModal({
      title: '提示',
      content: '是否取消订单',
      success(res) {
        //刷新页面数据
        if (res.confirm) {
          wx.navigateBack({
            delta: 1
          })
        } else if (res.cancel) {
          console.log('用户点击取消')
        }
      }
    })
  }
})