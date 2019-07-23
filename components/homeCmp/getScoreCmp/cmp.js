// components/homeCmp/getScoreCmp/cmp.js
import { IndexModel } from '../../../request/index.js'
const indexModel = new IndexModel()
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    phoneStatus:Boolean
  },

  /**
   * 组件的初始数据
   */
  data: {

  },
  methods: {
    //关闭弹框
    handleClose() {
      this.triggerEvent("handleBtnStatus", false)
    },
    //领取积分
    handleGetScore() {
      console.log('get')
    },
    getPhoneNumber(e) {
      console.log(e.detail)
      if (e.detail.encryptedData) {
        this.checkSession(e)
      } else {
        wx.showToast({
          title: '获取手机失败',
          icon: "none",
          duration: 1500
        })
      }
    },
    //先校验sessionkey有无过期
    checkSession(e) {
      wx.checkSession({
        success: () => {
          // console.log(e)
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
      let shareUserId = "";
      if (app.globalData.shareUserId) {
        shareUserId = app.globalData.shareUserId
      }
      let obj = {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        sessionKey: app.globalData.sessionKey,
        openId: app.globalData.openId,
        shareUserId
      }
      indexModel.decodeUserInfo(obj).then(res => {
        if (res.status) {
          this.triggerEvent("setPhoneStatus", true)
        }
      })
    },
  }
})
