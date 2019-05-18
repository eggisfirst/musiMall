import { IndexModel } from '../../request/index.js'
const indexModel = new IndexModel()
const app = getApp()
Page({
  data: {

  },
  onLoad: function (options) {
    this.setData({
      type: options.type
    })
  },
  //获取个人信息的回调。
  getPhoneNumber (e) {
    this.checkSession(e)
  },

  //先校验sessionkey有无过期
  checkSession(e) {
    wx.checkSession({
      success: () => {
        this.decodeUserInfo(e)
      },
      fail: () => {
        wx.login({
          success: res => {
            this.getOpenId(res.code, e)
          }
        })
      }
    })
  },
  //重新获取sessionkey
  getOpenId(code, e) {
    indexModel.getOpenId(code).then(res => {
      if (res.status) {
        app.globalData.sessionKey = res.data.sessionKey
        this.decodeUserInfo(e)
      }
    })
  },


  //验证绑定
  decodeUserInfo(e) {
    let obj = {
      encryptedData: e.detail.encryptedData,
      iv: e.detail.iv,
      sessionKey: app.globalData.sessionKey,
      openId: app.globalData.openId
    }
    indexModel.getPhoneNumber(obj).then(res => {
      if(res.data) {
        app.globalData.phone = res.data.mobileNumber
        app.globalData.login = true
        let type = this.data.type
        wx.switchTab({
          url: `/pages/${type}/${type}`
        })
      }
    })
  }
})