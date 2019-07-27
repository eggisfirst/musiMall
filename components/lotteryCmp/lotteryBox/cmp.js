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
    tipsStatus: false
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //开始抽奖
    handleStart() {
      // if(this.data.hasChange) {
      //   console.log('start')
      // }else {
      //   this.setData({
      //     tipsStatus: true
      //   })
      // }
      this._handleTipsBox()
    },
    //关闭提示
    closeTipsBox() {
      this._handleTipsBox(false)
    },
    //提示的内容
    setActiveStatus() {
      
    },

    _handleTipsBox(status=true) {
      this.triggerEvent('sexFixStatus',{type:true,status})    //打开蒙层的时候底部固定
      this.setData({
        tipsStatus: status
      })
    }
  }
})
