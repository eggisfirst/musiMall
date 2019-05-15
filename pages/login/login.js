import { IndexModel } from '../../request/index.js'
const indexModel = new IndexModel()
const app = getApp()
Page({
  data: {

  },
  onLoad: function (options) {

  },
  //获取个人信息的回调。
  getPhoneNumber (e) {
    this.decodeUserInfo(e)
  },
  //验证绑定
  decodeUserInfo(e) {
    // console.log(e)
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
        wx.switchTab({
          url: '/pages/activity/activity'
        })
      }
    })
  }
})