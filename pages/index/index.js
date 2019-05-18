const app = getApp()
import { IndexModel } from '../../request/index.js'
const indexModel = new IndexModel()
Page({
  data: {
    userInfo: {},
    hasUserInfo: false,
    canIUse: wx.canIUse('button.open-type.getUserInfo'),
    showTips: true,
    tipsText: '请先登录'
  },
  onLoad: function () {
    this.init()
  },
  //验证客户有没有授权
  init() {
    //判断有没有授权。已授权则直接获取信息。
    if (app.globalData.userInfo) {
      this.setData({
        userInfo: app.globalData.userInfo,
        hasUserInfo: true
      })
    } else if (this.data.canIUse) {
      // 由于 getUserInfo 是网络请求，可能会在 Page.onLoad 之后才返回
      // 所以此处加入 callback 以防止这种情况
      app.userInfoReadyCallback = res => {
        this.setData({
          userInfo: res.userInfo,
          hasUserInfo: true
        })
      }
    } else {
      // 在没有 open-type=getUserInfo 版本的兼容处理
      wx.getUserInfo({
        success: res => {
          app.globalData.userInfo = res.userInfo
          this.setData({
            userInfo: res.userInfo,
            hasUserInfo: true
          })
        }
      })
    }
  },
  //获取个人信息的回调。
  getUserInfo(e) {
    if(e.detail.userInfo) {
      this.checkSession(e)
      app.globalData.userInfo = e.detail.userInfo
      this.setData({
        userInfo: e.detail.userInfo,
        hasUserInfo: true
      })
    }
  },
  //先校验sessionkey有无过期
  checkSession(e) {
    wx.checkSession({
      success:() => {
        // console.log(e)
        this.decodeUserInfo(e)
      },
      fail:() => {
        wx.login({
          success: res => {
            this.getOpenId(res.code,e)
          }
        })
      }
    })
  },
  //重新获取sessionkey
  getOpenId(code,e) {
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
    indexModel.decodeUserInfo(obj).then(res => {
      console.log(res)
    })
  },
  //打开登录提示
  setLoginTips(e) {
    this.setData({
      showTips: e.detail.loginTips
    })
  },
  //关闭提示
  closeTips(e) {
    if (e.detail.tips) {
      this._setShowTips()
      this._toLoginPage()
    } else {
      this._setShowTips()
    }
  },
  //跳转登录页面
  _toLoginPage() {
    wx.redirectTo({
      url: '../login/login?type=index'
    })
  },
  //
  _setShowTips() {
    this.setData({
      showTips: true
    })
  }
})
