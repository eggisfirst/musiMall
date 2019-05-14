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
      code: app.globalData.code
    }
    indexModel.decodeUserInfo(obj).then(res => {
      if(res.data) {
        app.globalData.phone = res.data.mobileNumber
        app.globalData.openId = res.data.openId
        this.wxRegister(res.data.mobileNumber, res.data.openId)
      }
    })
  },
  //绑定手机
  wxRegister(phone,id) {
    indexModel.wxRegister(phone, id).then(res => {
      if(res.status) {
        app.globalData.login = true
        wx.switchTab({
          url: '/pages/activity/activity'
        })
      }
    })
  }
})