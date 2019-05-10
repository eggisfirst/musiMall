Component({
  //从父组件接收
  properties: {
    tabVal: {
      type: String,//类型
      value: '0'//默认值
    },
    contentlist: {
      type: Array,
      value: [],
      observer(newVal) {
        this.initHeight(newVal)
      }
    }
  },
  data: {
    current: 0,
    orderHeight: ''
  }, 
  ready() {
    // this.initHeight()
  },
  methods: {
    //初始化页面高度
    initHeight(newVal) {
      let activity = newVal[0].productList
      let order = newVal[0].orderList
      console.log(order)
      if(activity && activity.length > 0) {
        this.setData({
          orderHeight: 'height: 774rpx'
        })
      }else if(order) {
        if (order.length > 0) {
          this.setData({
            orderHeight: 'height: 100vh'
          })
        }else {
          this.setData({
            orderHeight: 'height: 774rpx'
          })
        }
      }
    },
    //滑动事件
    swiperChange(e) {
      this.setData({
        current: e.detail.current
      })
      //传给父组件
      this.triggerEvent('setCurrentTab', { current: this.data.current });
    },
    //先判断有没有登陆再跳转
    toProductDetails(e) {
      let tips = getApp().globalData.login
      this.triggerEvent('setLoginTips', { loginTips: tips});
      if(tips) {
        let type = e.currentTarget.dataset.type
        let id = e.currentTarget.dataset.index
        let maxlength = e.currentTarget.dataset.maxlength
        // let productType = e.currentTarget.dataset.producttype
        wx.navigateTo({
          url: `../../pages/activityDetails/activityDetails?type=${type}&id=${id}&maxlength=${maxlength}`
        })
      }
    },
    //跳转订单详情页面
    toOrderStatus(e) {
      let status = e.currentTarget.dataset.status
      let no = e.currentTarget.dataset.no
      wx.navigateTo({
        url: `/pages/orderStatus/orderStatus?status=${status}&no=${no}`,
      })
    },
    //活动到时
    timeTo(e) {
      if(e.detail.timeTo) {
      }
    }
  }
})
