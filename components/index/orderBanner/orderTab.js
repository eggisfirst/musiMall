import { IndexModel } from '../../../request/index.js'
const indexModel = new IndexModel()
const app = getApp()
Component({
  properties: {
    //从父组件接收
    status: {
      type: Boolean,
      observer() {
        console.log('=======status======')
        this.handleHasPhoneStatus(wx.getStorageSync('phone'))
      }
    }
  },
  data: {
    tabList: [{
      name: '全部订单',
      imgUrl: '/images/index/all-order.png',
      color: 'background:rgba(255,45,85,0.6)'
    },{
      name: '待付款',
      imgUrl: '/images/index/unpay.png',
      color: 'background:rgba(0,122,255,0.6);'
    },{
      name: '待核销',
      imgUrl: '/images/index/weihexiao.png',
      color: 'background:rgba(255,204,0,0.6);'
    }, {
      name: '已核销',
      imgUrl: '/images/index/yihexiao.png',
      color: 'background:rgba(255,149,0,6);'
    }],
    hasPhoneStatus: true
  },
  ready() {
    // console.log(this.properties.current)
  },
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  methods: {
    //判断手机有没有授权
    handleHasPhoneStatus(phone) {
      if(!phone) {
        this.setData({
          hasPhoneStatus: false
        })
      }else {
        this.setData({
          hasPhoneStatus: true
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
          app.globalData.phone = res.data.mobileNumber 
          if(!wx.getStorageSync('phone')) {
            wx.setStorageSync('phone',res.data.mobileNumber)
          } 
          this.setData({
            hasPhoneStatus: true
          })
        }
      })
    },

    toDetails(e) {
      let index = e.currentTarget.dataset.index
      wx.navigateTo({
        url: '/pages/orderDetails/orderDetails?index=' + index
      })
    }
  }
})
