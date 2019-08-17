// pages/lottery/lottery.js
import { IndexModel } from '../../request/index.js'
const indexModel = new IndexModel()
const app = getApp()

Page({
  data: {
    fixed: "",
    scrollTop: 0,
    showRules: false,
    allScore: 0,
    imgUrl: '',
    name: '',
    posterStatus: false,
    posterBtn: true,
    hasSave: false,
    getList: false,
    getScoreStatus: false,
    hasPhoneStatus: false
  },
  onLoad (options) {
    
    // this.getUserIntegral()
    app.checkLoginReadyCallback = res => {
      // wx.hideLoading()
      console.log('activeload')
        if(res.data.mobileNumber) {
          app.globalData.hasPhone = true
          app.globalData.phone = res.data.mobileNumber
          if(!wx.getStorageSync('phone')) {
            wx.setStorageSync('phone',res.data.mobileNumber)
          }
          this.hasGetInfo()
          //每次请求中奖名单
          this.getUserIntegral()
          const status = !this.data.getList
          const scoreStatus = !this.data.getScoreStatus
          this.setData({
            getList: status,
            getScoreStatus:scoreStatus,
            key: true
          })
         
        }
    };
  },
  onShow() {
      console.log('show')
      this.hasGetInfo()
      //每次请求中奖名单
      this.getUserIntegral()
      const status = !this.data.getList
      const scoreStatus = !this.data.getScoreStatus
      this.setData({
        getList: status,
        getScoreStatus:scoreStatus
      })
  },
  /**抽奖的授权 */
  hasPhone() {
    this.setData({
      hasPhoneStatus: true
    })
  },
  //判断有没有授权个人信息
  hasGetInfo() {
    if (!app.globalData.userInfo) {
      this.setData({
        posterBtn: false
      })
    }
  },
  //获取个人头像
  setViaImage(e) {
    console.log('data',e.detail.user)
    this.setData({
      imgUrl:e.detail.user.avatarUrl,
      name: e.detail.user.nickName
    })
  },
   //打开海报
  setPosterStatus(e) {
    this.scroll(true,true)
    this.setData({
      posterStatus: true,
    })
  },
  //保存海报
  // savePoster() {
  //   this.setData({
  //     hasSave: true,
  //   })
  // },
   //关闭海报
  // closePoster() {
  //   this.scroll(true,false)

  //   this.setData({
  //     posterStatus: false,
  //   })
  // },
  //授权登录后
  setPosterBtn() {
    this.setData({
      posterBtn: true
    })
  },
  //活动每次操作完重新获取分数
  setScore() {
    this.getUserIntegral()
  },
  
  //分享
  onShareAppMessage:(res) => {
    const userId = app.globalData.userId 
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: '一起为慕思篮球王全国挑战赛打Call！点击参与>>',
      path: '/pages/home/home?userId=' + userId,
      imageUrl: "https://derucci-app.oss-cn-hangzhou.aliyuncs.com/musiMall/images/kebi/poster.png",
      success:() => {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })

      }
    }
  },
  //获取用户积分
  getUserIntegral() {
    const userId = wx.getStorageSync('userId')
    // const userId = app.globalData.userId
    indexModel.getUserIntegral(userId).then(res => {
      if(res.status) {
        this.setData({
          allScore: res.data.surplusIntegral
        })
      }
    })
  },
  //点击开始抽奖
  startLottery() {
    let allScore = this.data.allScore
    if(allScore >= 50) {
      allScore = allScore - 50
      this.setData({
        allScore
      })
    }
   
  },
  //监听页面滚动距离
  onPageScroll(e) { // 获取滚动条当前位置
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  //当前页面固定/滚动到原位置
  scroll(type,status) {
    const fixed = status? 'indexFixed' : ''
    this.setPageScroll(type,status)
    this.setData({
      fixed
    })
  },
  //设置背景是否固定
  sexFixStatus(e) {
    const status = e.detail.status
    const fixed = status? 'indexFixed' : ''
    const hasScroll = e.detail.type  //判断页面需不需要滚动
    this.setPageScroll(hasScroll,status)
    this.setData({
      fixed
    })
  },
  //页面滚动到指定位置
  setPageScroll(hasScroll,status) {
    if(!hasScroll) {
      return
    }
    if(!status) {
      this.setPageScroll()
    }else {
      wx.setStorageSync('srcollTop', this.data.scrollTop)
    }
    const scrollTop = wx.getStorageSync('srcollTop')
    setTimeout(() => {
      wx.pageScrollTo({
        scrollTop
      })
    }, 10);
  },
  //点击打开规则
  handleRuleBtn() {
    this.setData({
      showRules: true,
      fixed: 'indexFixed'
    })
  },
  //关闭规则
  setShowRules() {
    this.setData({
      showRules: false,
      fixed: ''
    })
  }

})