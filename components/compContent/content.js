
Component({
  //从父组件接收
  properties: {
    contenList: null,
    type:String,
    current: String,
    key: Boolean,
    hasMoreData: Boolean,
    noData: {
      type:Boolean,
      value: '',
      observer(newVal) {
        console.log(22,newVal)
      }
    }
  },
  data: {
    orderHeight: ''
  }, 
  ready() {
    // console.log(111,this.properties.noData)
  },
  methods: {
    //先判断有没有登陆再跳转
    toProductDetails(e) {
      let tips = getApp().globalData.login
      this.triggerEvent('setLoginTips', { loginTips: tips});
      if(tips) {
        let id = e.currentTarget.dataset.id
        let current = this.properties.current
        wx.navigateTo({
          url: `../../pages/activityDetails/activityDetails?id=${id}&current=${current}`
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
