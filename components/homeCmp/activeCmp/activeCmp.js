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
          app.globalData.hasPhone = true
          const url = this.data.activeData.linkTo
          this.triggerEvent("setPhoneStatus",true)
          if (url === "activity") {
            wx.switchTab({
              url: `../${url}/${url}`,
            })
          }
          else if (url === 'lottery') {
            wx.switchTab({
              url: `../${url}/${url}`,
            })
          }
          else if (url === "basketSignUp"){
            this.toSignUp(url)
          }
          else if(url === 'game') {
            this.playGame()
            this.toGame()
          }
        }
      })
    },
    toGame() {
      wx.navigateTo({
        url:"/pages/game/game"
      })
    },
    navigateTo(e) {
      const url = this.data.activeData.linkTo
      if (url === "activity") {
        wx.switchTab({
          url: `../${url}/${url}`,
        })
      }
      else if (url === 'lottery') {
        wx.switchTab({
          url: `../${url}/${url}`,
        })
      }
      else if (url === "basketSignUp"){
        if (app.globalData.userId) {
          this.hasSignUp()
        } else {
          this.toSignUp(url)
        }
      }
      else if(url === 'game') {
        this.playGame()
        this.toGame()
      }
    },
    //跳转到报名
    toSignUp(url) {
      wx.navigateTo({
        url: `../${url}/${url}`,
      })
    },
    toSignUped(url) {
      wx.navigateTo({
        url: `../${url}/${url}?type=1`  ,
      })
    },
    //判断有没有报名
    hasSignUp() {
      const url = this.data.activeData.linkTo
      indexModel.hasSignUp(app.globalData.userId).then(res => {
        if (res.data && res.data.length) {
          this.toSignUped(url)
        } else {
          this.toSignUp(url)
        }
      })
    },
    //领取游戏积分
    playGame() {
      const value = wx.getStorageSync('playGame')
      if(value) {
        return
      }
      indexModel.playGame(app.globalData.userId).then(res => {
        if(res.status) {
          wx.setStorageSync('playGame', true)
        }
      })
    },

  }
})
