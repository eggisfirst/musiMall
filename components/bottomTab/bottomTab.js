Component({
  properties: {
    //从父组件接收
    queryData: {
      type: Object,
      value: ""
    }
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
      wx.showModal({
        title: '活动规则',
        content: '规则',
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
      wx.navigateTo({
        url: `/pages/order/order?id=${this.properties.queryData.id}`
      })
    }
  }
})
