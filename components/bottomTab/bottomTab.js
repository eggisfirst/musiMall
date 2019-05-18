const app = getApp()
Component({
  properties: {
    queryData: Object,
    activityState: Number,
    regulation: String,
    onsaleStock: Number,
    showRules: Boolean
  },
  data: {
    leftHeight: '',
    rightHeight: ''
  },
  ready() {
    this.phoneSystem()
  },
  methods: {
    //判断手机机型
    phoneSystem() {
      if (app.globalData.isIphoneX)
        this.setData({
          leftHeight: '22',
          rightHeight: '37'
        })
    },
    //跳转到秒杀首页
    toActivity() {
      wx.switchTab({
        url: '/pages/activity/activity'
      })
    },
    //弹出规则提示框
    showRules() {
      // wx.showModal({
      //   title: '活动规则',
      //   content: this.properties.regulation,
      //   confirmText: '知道了',
      //   showCancel: false,
      //   confirmColor: '#1a1a1a'
      // })
      this.triggerEvent('clickRule', { rules: !this.properties.showRules });
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
