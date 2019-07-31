import { IndexModel } from '../../request/index.js'
const indexModel = new IndexModel()
const app = getApp()
Component({
  //从父组件接收
  properties: {
    contenList: null,
    type:String,
    current: String,
    key: Boolean,
    hasMoreData: Boolean,
    noData: Boolean
  },
  data: {
    orderHeight: '',
    hasPhoneStatus: true

  }, 
  ready() {
    // console.log(111,this.properties.noData)
    if (app.globalData.userId) {
      wx.hideLoading()
    } else {
      app.checkLoginReadyCallback = res => {
        wx.hideLoading()
        this.handleHasPhoneStatus(res.data.mobileNumber)
      };
    }
  },
  methods: {
     //判断手机有没有授权
     handleHasPhoneStatus(phone) {
      if(!phone) {
        this.setData({
          hasPhoneStatus: false
        })
      }
    },
    
    //手机授权
    getPhoneNumber(e) {
      if (e.detail.encryptedData) {
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
          this.setData({
            hasPhoneStatus: true
          })
        }
      })
    },



    //先判断有没有登陆再跳转
    toProductDetails(e) {
      // let tips = getApp().globalData.login
      // this.triggerEvent('setLoginTips', { loginTips: tips});

      // if(tips) {
        let id = e.currentTarget.dataset.id
        let current = this.properties.current
        wx.navigateTo({
          url: `../../pages/activityDetails/activityDetails?id=${id}&current=${current}`
        })
      // }
    },
    //跳转订单详情页面
    toOrderStatus(e) {
      let no = e.currentTarget.dataset.no
      wx.navigateTo({
        url: `/pages/orderStatus/orderStatus?no=${no}&status=${this.properties.current}`,
      })
    }
  }
})
