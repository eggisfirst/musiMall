// components/lotteryCmp/lotteryBox/cmp.js
import { IndexModel } from '../../../request/index.js'
const indexModel = new IndexModel()
const app = getApp()
Component({
  properties: {
    allScore: {
      type: Number,
      observer() {
        this.hasPhone()
      }
    }
  },
  data: {
    tipsData: {
      title: "",
      imgUrl:"",
      text:"",
      remark: "",
      type: 0
    },
    tipsStatus: false,
    awardTipsStatus: false,
    awardData: {
      imgUrl: '/images/lottery/bed.png',
      name: "时尚释压枕"
    },
    awardAnimation:[],
    key: true,
    prizeList: [],
    awardType: "",
    phoneStatus: true,
    productId: "",
    stystem: "",
  },
  ready() {
    // console.log(app.globalData)
    this.getSize()
    this.getPrizeList()
  },
  methods: {
    //判断有没有授权手机
    hasPhone() {
      const phone = wx.getStorageSync('phone')
      console.log(1231233,phone)
      if(!phone) {
        this.setData({
          phoneStatus: false
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
          app.globalData.phone = res.data.mobileNumber
          app.globalData.hasPhone = true
          if(!wx.getStorageSync('phone')) {
            wx.setStorageSync('phone',res.data.mobileNumber)
          }
          this.setData({
            phoneStatus: true
          })
        }
      })
    },


    //获取宽高
    getSize() {
      wx.getSystemInfo({
        success: res => {
          console.log(res)
          let rpx = 1 * (res.windowWidth * res.pixelRatio) / (750 * res.pixelRatio);
          let stystem;
          if(res.platform == "ios"){
            stystem = 'ios'
          }else if(res.platform == "android"){
            stystem = 'android'
          }else {
            stystem = ''
          }
          this.setData({
            rpx: rpx,//添加到小程序全局data里面
            stystem
          })
          this.setAnimationSize()
        }
      })
    },
    //px转成rpx
    setAnimationSize() {
      const aniSize =  [
        {
            animate: {x: 101, y:0},
            id: 2
          }, {
            animate: {x: 202, y:0},
            id: 3
          }, {
            animate: {x: 202, y:94},
            id: 6
          }, {
            animate: {x: 202, y:187},
            id: 9
          }, {
            animate: {x: 101, y:187},
            id: 8
          }, {
            animate: {x: 0, y:187},
            id: 7
          }, {
            animate: {x: 0, y:94},
            id: 4
          },
          {
            animate: {x: 0, y:0},
            id: 1
          }, 
        ]
        for(const key of aniSize) {
          let x = key.animate.x
          let y = key.animate.y
          key.animate.x = this.data.rpx*x*2
          key.animate.y = this.data.rpx*y*2
        }
        this.setData({
          awardAnimation: aniSize
        })
    },
      //获取九宫格奖项
    getPrizeList() {
      const userId = wx.getStorageSync('userId')
      indexModel.getPrizeList(userId).then(res => {
        if(res.status) {
          let data = res.data
          data.splice(4,0,{
            title: "每次消耗50积分",
          })
          this.setData({
            prizeList: data
          })
        }
      })
    },
    //抽奖
    _luckDraw() {
      const userId = wx.getStorageSync('userId')
      indexModel.luckDraw(userId).then(res => {
        if(res.status) {
          const time = this._setAnimationTime(res.data.id)

          this.triggerEvent("startLottery", true)
          this._setAnimation(time)

          this._setAwardTipsType(res.data)
          this.setData({
            productId: res.data.prize_winning_record_id
          })
          
         
        }else { //活动时间未开始/已结束
          const tipsData = this.data.tipsData
          const title = res.msg.split(',')[0];
          const remark = res.msg.split(',')[1]
          tipsData.title = title
          tipsData.remark = remark
          tipsData.type = 0
          this.setData({
            tipsStatus: true,
            awardType: "tipsStatus",
            tipsData
          })
          this.triggerEvent('sexFixStatus',{type:false,status:true}) 
        }
      })
    },
    //九宫格顺序
    _changeId(id) {
      if(id === 4) {
        return 7
      }else if(id === 5) {
        return 3
      }else if(id === 7) {
        return 5
      }else if(id === 8) {
        return 4
      }else if(id === 1) {
        return 8
      }else if(id === 2) {
        return 1
      }else if(id === 3) {
        return 2
      }
      else {
        return id
      }
    },
    //设置动画时间
    _setAnimationTime(id) {
      const myId = this._changeId(id)
      return  2400 + 60*myId
    },
    //设置中奖类型
    _setAwardTipsType(data) {
      const tipsData = this.data.tipsData
      const awardData = this.data.awardData
      if(data.title.indexOf('代金券') !== -1 ) {
        tipsData.title = data.title
        tipsData.imgUrl = data.detail_pictures
        tipsData.remark = '请前往“我的>优惠券”使用'
        tipsData.type = 1
        this.setData({
          awardType: "tipsStatus",
          tipsData
        })
      }else if(data.id === 8) {
        tipsData.title = '谢谢参与'
        tipsData.type = 2
        tipsData.remark = '可前往周边慕思门店了解更多活动信息哦'
        this.setData({
          awardType: "tipsStatus",
          tipsData
        })
      }
      else {
        awardData.imgUrl = data.detail_pictures
        awardData.name = data.title
        this.setData({
          awardType: "awardTipsStatus",
          awardData
        })
      }
    },
    //开始抽奖
    handleStart() {
      if(this.data.allScore >= 50) {
        if(this.data.key) {
          this.setData({
            key: false,
          })
          this._luckDraw()
        }else {
          return
        }
      }else {
        if(this.data.key) {
          console.log(123123)
          const tipsData = this.data.tipsData
          tipsData.title = '您的积分不足'
          tipsData.remark = '快去做任务赚积分吧'
          tipsData.type = 0
          this.setData({
            tipsStatus: true,
            awardType: "tipsStatus",
            tipsData
          })
          this.triggerEvent('sexFixStatus',{type:false,status:true}) 
        }
      }
     
    },
    _setAnimation(time) {
      let animation = wx.createAnimation({
        duration: 20,
        timingFunction: 'ease',
        delay: 0
      });
      // var time = this._setAnimationTime(res.data.id)
      // var time = 2400 + 60*8 //奖品


      const ani = this.data.awardAnimation
      let i = 0
      var t = 50

      var set1 = setInterval(fn, t);
      var that = this
      function fn() {
          i++;
          if(i >= ani.length) {
            i = 0
          }
          if(time <= 0) {
            console.log('-=-=-=-= timer',set1)
            that._handleTipsBox(that.data.awardType)

            clearInterval(set1)
          }else {
            if(time > 1000) {
              animation.translate(ani[i].animate.x,ani[i].animate.y).step({duration: 20})
              time -= 60

              clearInterval(set1);
              set1 = setInterval(fn, 60);

            }
            else if(time >500 && time <= 1000) {
              animation.translate(ani[i].animate.x,ani[i].animate.y).step({duration: 100})
              time -= 100
              clearInterval(set1);
              set1 = setInterval(fn, 100);
            }
            else if(time >200 && time <= 500) {
              animation.translate(ani[i].animate.x,ani[i].animate.y).step({duration: 250,delay:100})
              time -= 350
              clearInterval(set1);
              set1 = setInterval(fn, 350);
            }
            else if(time >= 0 && time <= 200) {
              animation.translate(ani[i].animate.x,ani[i].animate.y).step({duration: 300,delay:200})
              time -= 500
              clearInterval(set1);
              set1 = setInterval(fn, 500);
            }
            that.setData({
              ani: animation.export()
            })
          }
        
        }
    },
    //关闭提示
    closeTipsBox() {
      const tipsName = this.data.awardType
      this.setData({
        key: true
      })
      this._handleTipsBox(tipsName,false)
    },
    _handleTipsBox(tipsName,status=true) {
      this.triggerEvent('sexFixStatus',{type:false,status})    //打开蒙层的时候底部固定
      this.setData({
        [tipsName]: status
      })
    }
  }
})
