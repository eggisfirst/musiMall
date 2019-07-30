// components/lotteryCmp/lotteryBox/cmp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    hasChange: Boolean,
    activeStatus: String //判断提示的状态
  },
  data: {
    optionsList:[
      {
        text: "399元代金券",
        imgUrl: "../../../images/lottery/399.png"
      },
      {
        text: "500元代金券",
        imgUrl: "../../../images/lottery/500.png"
      },
      {
        text: "时尚释压枕",
        imgUrl: "../../../images/lottery/bed.png"
      },
      {
        text: "篮球世界杯决赛VIP门票一张",
        imgUrl: "../../../images/lottery/ticket.png"
      },
      {
        text: "每次消耗50积分",
        imgUrl: "../../../images/lottery/start.png"
      },
      {
        text: "篮球世界杯排位赛门票一张",
        imgUrl: "../../../images/lottery/ticket.png"
      },
      {
        text: "眼精灵按摩眼罩",
        imgUrl: "../../../images/lottery/eye.png"
      },
      {
        text: "助眠四季精油礼盒套装",
        imgUrl: "../../../images/lottery/box.png"
      },
      {
        text: "谢谢参与",
        imgUrl: "../../../images/lottery/thank.png"
      },
      
    ],
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
  },
  ready() {
    this.getSize()
  },
  /**
   * 组件的方法列表
   */
  methods: {
    //获取宽高
    getSize() {
      wx.getSystemInfo({
        success: res => {
          let rpx = 1 * (res.windowWidth * res.pixelRatio) / (750 * res.pixelRatio);
          this.setData({
            rpx: rpx//添加到小程序全局data里面
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
    //开始抽奖
    handleStart() {
      console.log(this.data.awardAnimation)
      this._setAnimation()

      // if(this.data.hasChange) {
      //   console.log('start')
      // }else {
      //   this.setData({
      //     tipsStatus: true
      //   })
      // }
      // const tipsName = 'awardTipsStatus'  //中奖提示框类型
      // const tipsName = 'tipsStatus'  //中奖提示框类型
      // this._handleTipsBox(tipsName)
    },
    _setAnimation() {
      let animation = wx.createAnimation({
        duration: 20,
        timingFunction: 'ease',
        delay: 0
      });
      var time = 1600 + 40*8 //奖品
      const ani = this.data.awardAnimation
      for(let i = 0; i < ani.length + 1; i ++) {
        time -= 40
        if(time > 800) {
          if(i >= ani.length) {
            i = 0
          }
          animation.translate(ani[i].animate.x,ani[i].animate.y).step({duration: 25})
        }else if(time >200 && time <= 800) {
          if(i >= ani.length) {
            i = 0
          }
          animation.translate(ani[i].animate.x,ani[i].animate.y).step({duration: 50,delay:50})
        }
        else if(time >20 && time <= 200) {
          if(i >= ani.length) {
            i = 0
          }
          animation.translate(ani[i].animate.x,ani[i].animate.y).step({duration: 250,delay:100})
        }
        else if(time >=0 && time <= 20) {
          if(i >= ani.length) {
            i = 0
          }
          animation.translate(ani[i].animate.x,ani[i].animate.y).step({duration: 500,delay:500})
        }
        else {
          console.log('time',i)
          this.setData({
            ani: animation.export()
          })
          return true
        }
      }
     
    },
    //关闭提示
    closeTipsBox() {
      const tipsName = 'awardTipsStatus'
      // const tipsName = 'tipsStatus'
      this._handleTipsBox(tipsName,false)
    },
    //提示的内容
    setActiveStatus() {
      
    },

    _handleTipsBox(tipsName,status=true) {
      this.triggerEvent('sexFixStatus',{type:true,status})    //打开蒙层的时候底部固定
      this.setData({
        [tipsName]: status
      })
    }
  }
})
