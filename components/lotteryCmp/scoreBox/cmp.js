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
    }
  },
  data: {
    optionsList:[
      {
        imgUrl: "../../../images/lottery/wx.png",
        title: "微信登陆",
        content: "仅首次登陆奖励积分",
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
        content: "邀请好友登陆小程序30积分/人",
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
    name: ""
    
  },
  ready() {
    this.getOtherActivity()
  },
  methods: {
    //获取状态
    getOtherActivity(){
      const userId = app.globalData.userId
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
    //领取积分
    getScore() {
      const userId = app.globalData.userId
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
      if (this.data.posterBtn) {
        this.triggerEvent('setViaImage', {user: app.globalData.userInfo});
        this.triggerEvent("setPosterStatus",true)
      }
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
          this.triggerEvent('setViaImage', {user: res.data});
        }
      })
    },
  }
})
