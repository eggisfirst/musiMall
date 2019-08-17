import { IndexModel } from '../../../request/index.js'
const indexModel = new IndexModel()
const app = getApp()
// components/lotteryCmp/scoreBox/cmp.js

Component({
  properties: {
    allScore: Number,
    posterBtn:Boolean,
    hasSave: {
      type: Boolean,
      observer(newval) {
        this.triggerEvent('setScore',true)
        const list = this.data.optionsList
        list[2].right.status = 1
        list[2].right.text = '已生成'
        this.setData({
          optionsList: list
        })
      }
    },
    //每次onshow就重新获取状态
    getScoreStatus: {
      type: Boolean,
      observer() {
        this.getOtherActivity()
        this.judgeHasPhone()
      }
    }
  },
  data: {
    optionsList:[
      {
        imgUrl: "../../../images/lottery/wx.png",
        title: "微信登录",
        content: "仅首次登录奖励积分",
        right: {
          status: 0,
          text: "领取",
          score: "+80"
          // status: 1,
          // text: "已登陆"
        }
      },
      {
        imgUrl: "../../../images/lottery/friend.png",
        title: "邀请好友参加活动",
        content: "邀请好友登录小程序30积分/人",
        right: {
          status: 0,
          text: "分享",
          score: "+30"
        }
      }, {
        imgUrl: "../../../images/lottery/poster.png",
        title: "生成保存助威海报",
        content: "仅首次生成保存奖励积分",
        right: {
          status: 0,
          text: "生成",
          score: "+50"
        }
      }, {
        imgUrl: "../../../images/lottery/ball.png",
        title: "参与趣味篮球小游戏",
        content: "仅首次游玩奖励积分",
        right: {
          status: 0,
          text: "参与",
          score: "+50"
        }
      }
    ],
    showRecord: false,
    posterStatus: false,
    posterBtn:true,
    imgUrl: "",
    name: "",
    hasPhone: false
    
  },
  ready() {
    // this.getOtherActivity()
  },
  methods: {
    /**判断手机有没有授权 */
    judgeHasPhone() {

      const hasPhone = app.globalData.hasPhone
      console.log('phone',hasPhone)
      this.setData({
        hasPhone
      })
    },

    //获取状态
    getOtherActivity(){
      const userId = wx.getStorageSync('userId')
      // const userId = app.globalData.userId
      indexModel.getOtherActivity(userId).then(res => {
        if(res.status) {
          this.setOptionsList(res.data)
        }
      })
    },
    setOptionsList(data) {
      const list = this.data.optionsList
      data.map((item,index) => {
        switch (index) {
          case 0:
            list[0].right.status = item.getIntegralStatus
            list[0].right.text = item.getIntegralStatus? '已领取' : '领取'
            break;
          case 1:
            break;
          case 2:
            list[2].right.status = item.getIntegralStatus
            list[2].right.text = item.getIntegralStatus? '已生成' : '生成'
            break;
          case 3:
            list[3].right.status = item.getIntegralStatus
            list[3].right.text = item.getIntegralStatus? '已参与' : '参与'
            break;
          default:
            break;
        }
      })
      this.setData({
        optionsList: list
      })
    },
    //点击参与活动/分享/按钮
    handleActiveBtn(e) {
      const index = e.currentTarget.dataset.index
      if(index === 3) {
        this.playGame()
      }
      else if(index === 0) {
        this.getScore()
      }
      else if(index === 2) {
        this.handlePosterBtn()
      }
    },


//手机授权
  getPhoneNumber(e) {
    if (e.detail.encryptedData) {
      this.checkSessionNumber(e)
    }else {
      wx.showToast({
        title: '获取手机失败',
        icon: "none",
        duration: 1500
      })
    }
  },
  //先校验sessionkey有无过期
  checkSessionNumber(e) {
    wx.checkSession({
      success: () => {
        // console.log(e)
        this.decodeUserInfoNumber(e)
      },
      fail: () => {
        wx.login({
          success: res => {
            this.getOpenIdNumber(res.code, e)
          }
        })
      }
    })
  },
  //重新获取sessionkey
  getOpenIdNumber(code, e) {
    indexModel.getOpenId(code).then(res => {
      if (res.status) {
        app.globalData.sessionKey = res.data.sessionKey
        this.decodeUserInfoNumber(e)
      }
    })
  },
  //验证绑定
  decodeUserInfoNumber(e) {
    const index = e.currentTarget.dataset.index

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
        /**直接触发按钮 */
        if(index === 0) {
          this.getScore()
        }else if(index === 3) {
          this.playGame()
        }
        this.setData({
          hasPhone: true
        })
      }
    })
  },




    //领取积分
    getScore() {
      const userId = wx.getStorageSync('userId')
      // const userId = app.globalData.userId
      const list = this.data.optionsList
      indexModel.authorizationGiveIntegral(userId).then(res => {
        if(res.status) {
          this.triggerEvent('setScore',true)
          list[0].right.status = 1
          list[0].right.text = '已领取'
          this.setData({
            optionsList: list
          })
          wx.showToast({
            title: '领取成功',
            icon: 'none',
            duration: 1500
          })
        }
      })
    },
    //参与游戏
    playGame() {
      const userId = app.globalData.userId
      indexModel.playGame(userId).then(res => {
        if(res.status) {
          this.triggerEvent('setScore',true)          
          const list = this.data.optionsList
          list[3].right.status = 1
          list[3].right.text = '已参与'
          this.setData({
            optionsList: list
          })
        }
      })
      wx.navigateTo({
        url: "/pages/game/game"
      })
    },
    //打开海报
    handlePosterBtn() {
      const user = JSON.stringify(app.globalData.userInfo);
      //跳转到新页面
      wx.redirectTo({
        url: "/pages/poster/poster?user=" + user,
      })
      // this.triggerEvent('setViaImage', {user: app.globalData.userInfo});
      // this.triggerEvent("setPosterStatus",true)
    },
    //点击打开中奖记录
    handleRecord() {
      this._handleShowRecord()
    },
    //组件/关闭中奖记录
    setShowRecord() {
      this._handleShowRecord(false)
    },

    _handleShowRecord(status=true) {
      this.triggerEvent("sexFixStatus",{status,type:true}) //背景固定
      this.setData({
        showRecord: status
      })
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
          this.triggerEvent('setViaImage', {user: res.data});
          this.triggerEvent('setPosterBtn', true);
          this.handlePosterBtn()
          // this.triggerEvent("setPosterStatus",true)
        }
      })
    },
  }
})
