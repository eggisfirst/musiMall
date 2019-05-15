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
        let type = this.data.type
        wx.switchTab({
          url: `/pages/${type}/${type}`
        })
      }
    })
  }
})