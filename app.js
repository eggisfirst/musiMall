//app.js
import { IndexModel } from './request/index.js'
const indexModel = new IndexModel()
App({
  onLaunch: function () {
    // 展示本地存储能力
    var logs = wx.getStorageSync('logs') || []
    logs.unshift(Date.now())
    wx.setStorageSync('logs', logs)

    // 登录
    wx.login({
      success: res => {
        // console.log('登陆成功：', res)
        this.globalData.code = res.code
        this.getOpenId(res.code)
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    // 验证用户有没有授权
    wx.getSetting({
      success: res => {
        if (res.authSetting['scope.userInfo']) {
          // 已经授权，可以直接调用 getUserInfo 获取头像昵称，不会弹框
          wx.getUserInfo({
            success: res => {
              this.globalData.userInfo = res.userInfo
              // console.log('获取用户信息成功：', res)
              // 可以将 res 发送给后台解码出 unionId
              // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
              // 所以此处加入 callback 以防止这种情况
              if (this.userInfoReadyCallback) {
                this.userInfoReadyCallback(res)
              }
            }
          })
        }
      }
    })
    //判断是不是iphone x
    wx.getSystemInfo({
      success: res => {
        let modelmes = res.model;
        if (modelmes.search('iPhone X') != -1) {
          this.globalData.isIphoneX = true
        }
      }
    })
    // 获取用户地理位置
    // wx.getLocation({
    //   type: 'wgs84',
    //   success(res) {
    //     console.log('获取客户地理位置：', res)
    //     const latitude = res.latitude
    //     const longitude = res.longitude
    //     const speed = res.speed
    //     const accuracy = res.accuracy
    //   }
    // })
  },
  //获取openid
  getOpenId(code) {
    wx.showLoading({
      title: '加载中',
      mask: true
    })
    indexModel.getOpenId(code).then(res => {
      if (res.status) {
        wx.hideLoading()
        this.globalData.userId = res.data.id;
        if (this.checkLoginReadyCallback) {
          this.checkLoginReadyCallback(res);
        }
        this.globalData.openId = res.data.openId
        this.globalData.sessionKey = res.data.sessionKey
        if (res.data.mobileNumber) {
          this.globalData.hasPhone = true
          this.globalData.phone = res.data.mobileNumber
          this.globalData.login = true
        }
      }
    })
  },
  
  globalData: {
    hasPhone: '',
    userInfo: null,
    login: false,
    key: true,
    phone: '',
    openId: '',
    sessionKey: '',
    loading: false,
    isIphoneX: false,
    onshow:false,
    userId: "",
  }
})