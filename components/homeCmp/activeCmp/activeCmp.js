// components/homeCmp/activeCmp/activeCmp.js
import { IndexModel } from '../../../request/index.js'
const indexModel = new IndexModel()
const app = getApp()
Component({
  properties: {
    activeData:Object,
    phoneStatus: Boolean
  },
  data: {

  },
  methods: {
    getPhoneNumber(e) {
      console.log(e.detail)
      if (e.detail.encryptedData) {
        console.log(1111)
        this.checkSession(e)
      }else {
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
      indexModel.getPhoneNumber(obj).then(res => {
        if(res.status) {
          this.triggerEvent("setPhoneStatus",true)
        }
      })
    },
    navigateTo(e) {
      const url = this.data.activeData.linkTo
      if (url === "activity") {
        wx.switchTab({
          url: `../${url}/${url}`,
        })
      }
      else if (url === 'lottery' || url === "check" || url === 'game') {
        wx.showToast({
          title: '活动尚未开始',
          icon: 'none',
          duration: 1500
        })

      }
      else {
        wx.navigateTo({
          url: `../${url}/${url}`,
        })
      }
    }
  }
})
