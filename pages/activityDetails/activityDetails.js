Page({
  data: {
    imgUrls: [
      '/images/activityDetails/bed.png',
      '/images/activityDetails/bed1.png'
    ],
    swiperType: {
      height: '573',
      indicatorDots: true,
      indicatorCcolor: "rgba(54,54,54,0.3)",
      indicatorActiveColor: 'rgba(54,54,54,0.6)',
      autoplay: false,
      interval: 3000,
      duration: 1000,
      circular: true
    },
    showRules: true,
    showTips: true,
    tipsText: '活动尚未开始'
  },
  onLoad(options) {
    console.log(options)
  },
  //关闭规则
  setRulesTips(e){
    this.setData({
      showRules: e.detail.isShowRules
    })
  },
  //弹出规则
  clickRule(e) {
    this.setData({
      showRules: e.detail.rules
    })
  },
  //关闭提示
  closeTips(e) {
    this.setData({
      showTips: e.detail.tips
    })
  },
  //填出提示
  clickBeginBtn(e) {
    this.setData({
      showTips: e.detail.tips
    })
  }
})