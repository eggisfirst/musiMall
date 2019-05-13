Component({
  properties: {
    queryData: Object,
    activityState: Number,
    regulation: String
  },
  data: {
    
  },
  ready() {
  },
  methods: {
    //跳转到秒杀首页
    toActivity() {
      wx.switchTab({
        url: '/pages/activity/activity'
      })
    },
    //弹出规则提示框
    showRules() {
      // console.log(111,this.properties.regulation)
      wx.showModal({
        title: '活动规则',
        content: this.properties.regulation,
        confirmText: '知道了',
        showCancel: false,
        confirmColor: '#1a1a1a'
      })
      // this.triggerEvent('clickRule', { rules: false });
    },
    //出现即将抢购提示
    clickBeginBtn() {
      this.triggerEvent('clickBeginBtn', { tips: false });
    },
    //点击抢购按钮
    buyBtn() {
      this.triggerEvent('openSelectNum', { status: false});
    }
  }
})
