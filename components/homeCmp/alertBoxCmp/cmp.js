// components/homeCmp/alertBoxCmp/cmp.js
const app = getApp()
import { IndexModel } from '../../../request/index.js'
const indexModel = new IndexModel()

Component({
  properties: {
    signUpStatus: Boolean,
    posterBtn: Boolean
  },
  data: {
    showPoster: false,
    imgUrl: "",
    name: ''
  },
  methods: {
    //分享活动
    handleShare() {
      console.log('share')
    },
    //前往抽奖
    handlelottery() {
      wx.switchTab({
        url: '/pages/lottery/lottery'
      })
      // wx.showToast({
      //   title: '活动尚未开始',
      //   duration: 1000,
      //   icon: 'none',
      //   mask: true
      // })
    },
    //生成海报
    handlePoster() {
      if (this.data.posterBtn) {
        this.setData({
          showPoster: true,
          imgUrl:app.globalData.userInfo.avatarUrl,
          name: app.globalData.userInfo.nickName
        })
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
          this.setData({
            showPoster: true,
            imgUrl: res.data.avatarUrl,
            name:res.data.nickName
          })
        }
      })
    },

    //关闭弹框
    handleClose() {
      this.triggerEvent('setSignUpStatus', { signUpStatus: false });
    },
    //取消海报
    handleSavePoster(e) {
      if(e.detail.cancle) {
        this.setData({
          showPoster: false
        })
      }
    }
  }
})
