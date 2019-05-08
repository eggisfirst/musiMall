// pages/login/login.js
Page({
  data: {

  },
  onLoad: function (options) {

  },
  //登录按钮
  loginBtn() {
    wx.switchTab({
      url: '/pages/activity/activity'
    })
  }
})