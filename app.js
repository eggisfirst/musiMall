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
        
        // this.getIp()
        // 发送 res.code 到后台换取 openId, sessionKey, unionId
      }
    })
    
    // 获取用户地理位置
    // wx.getLocation({
    //   type: 'wgs84',
    //   success(res) {
    //     // console.log('获取客户地理位置：', res)
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
      mask: true,
    })
    indexModel.getOpenId(code).then(res => {
      if (res.status) {
        wx.hideLoading()
        this.globalData.openId = res.data.openId
        this.globalData.sessionKey = res.data.sessionKey
        if (res.data.mobileNumber) {
          this.globalData.hasPhone = true
          this.globalData.phone = res.data.mobileNumber
          this.globalData.login = true
        }

        this.getMyUserInfo()
        // this.getInfo(res.data.openId)
      }else {
        wx.hideLoading()
      }
    })
  },
  //验证用户有没有绑定手机
  getMyUserInfo() {
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
              if(!this.globalData.hasPhone) {
                this.decodeUserInfo(res)
              }
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
  },
  //获取用户信息，如果有手机号码，不再验证绑定
  getInfo(id) {
    indexModel.getUserInfoByMap(id).then(res => {
      if (res.data.mobileNumber) {
        this.globalData.hasPhone = true
        this.globalData.phone = res.data.mobileNumber
        this.globalData.login = true
      }
    })
  },
  //验证绑定
  decodeUserInfo(data) {
    let obj = {
      encryptedData: data.encryptedData,
      iv: data.iv,
      sessionKey: this.globalData.sessionKey,
      openId: this.globalData.openId
    }
    indexModel.decodeUserInfo(obj).then(res => {
      if (res.data && res.data.mobileNumber) {
        this.globalData.phone = res.data.mobileNumber
        this.globalData.login = true
      }
    })
  },
 
  //获取手机ip
  getIp() {
    wx.request({
      url: 'http://ip-api.com/json',
      success: res => {
        this.globalData.ip = res.data.query
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
    ip: '',
    sessionKey: '',
    loading: false
  }
})