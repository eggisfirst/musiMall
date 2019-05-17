
Component({
  //从父组件接收
  properties: {
    contenList: null,
    type:String,
    current: String,
    key: Boolean
  },
  data: {
    orderHeight: ''
  }, 
  ready() {
  },
  methods: {
    //先判断有没有登陆再跳转
    toProductDetails(e) {
      let tips = getApp().globalData.login
      this.triggerEvent('setLoginTips', { loginTips: tips});
      if(tips) {
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
          url: `../../pages/activityDetails/activityDetails?id=${id}`
        })
      }
    },
    //跳转订单详情页面
    toOrderStatus(e) {
      let no = e.currentTarget.dataset.no
      wx.navigateTo({
        url: `/pages/orderStatus/orderStatus?no=${no}&status=${this.properties.current}`,
      })
    },
    //活动到时
    timeTo(e) {
      
    }
  }
})
