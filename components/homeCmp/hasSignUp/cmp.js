// components/homeCmp/hasSignUp/cmp.js
const app = getApp()
import { IndexModel } from '../../../request/index.js'
const indexModel = new IndexModel()
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    posterBtn:Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {
    imgUrl: ""
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //跳转规则
    navigateToRule() {
      wx.navigateTo({
        url: '/pages/basketRule/basketRule',
      })
    },
    //打开海报
    handlePosterBtn() {
      if (this.data.posterBtn) {
        this.triggerEvent('setViaImage', {image: app.globalData.userInfo.avatarUrl});
        this.triggerEvent("setPosterStatus",true)
      }
    },
      //授权登录
    getUserInfo(e) {
      if (e.detail.userInfo) {
        this.checkSession(e)
        app.globalData.userInfo = e.detail.userInfo
        this.setData({
          userInfo: e.detail.userInfo,
          hasUserInfo: true
        })
      } else {
        wx.showToast({
          title: '获取个人信息失败',
          icon: 'none',
          duration: 1500,
          mask: true
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
      let obj = {
        encryptedData: e.detail.encryptedData,
        iv: e.detail.iv,
        sessionKey: app.globalData.sessionKey,
        openId: app.globalData.openId,
      }
      indexModel.decodeUserInfo(obj).then(res => {
        if(res.status) {
          this.triggerEvent('setPosterBtn', true);
          this.triggerEvent("setPosterStatus",true)
          this.triggerEvent('setViaImage', {image: res.data.avatarUrl});
        }
      })
    },
  }
})
