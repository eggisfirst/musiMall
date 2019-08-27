// pages/poster/poster.js
Page({

  /**
   * 页面的初始数据
   */
  data: {
    imgUrl: "",
    name: "",
    key: false
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    this.init(options)
  },
  init(options) {
    // const user = JSON.parse(options.user)
    this.setData({
      imgUrl: options.avatarUrl,
      name: options.nickName
    })
  },
  closePoster() {
    wx.switchTab({
      url: '/pages/lottery/lottery?key=' + this.data.key
    })
  },
  savePoster() {
    this.setData({
      key: true
    })
  }
})