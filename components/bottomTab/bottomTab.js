Component({
  properties: {
    //从父组件接收
    // current: {
    //   type: String,
    //   value: '0',
    //   observer(newVal) {
    //     this.setData({
    //       currentTab: newVal  //监听变化的时候
    //     })
    //   }
    // }
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
    showRules() {
      this.triggerEvent('clickRule', { rules: false });
    },
    clickBeginBtn() {
      this.triggerEvent('clickBeginBtn', { tips: false });
    }
  }
})
