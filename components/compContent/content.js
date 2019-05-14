Component({
  //从父组件接收
  properties: {
    tabVal: {
      type: String,//类型
      value: '0',//默认值,
      observer(newVal) {
        this.setData({
          index: newVal
        })
      }
    },
    contenList: {
      type: null,
      value: [],
      observer(newVal) {
        // this.initHeight(newVal)
      }
    },
    list: Array,
    type:String
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
      let activity = this.properties.type
      let order;
      if (activity == 'activity') { //活动首页
        this.setData({
          orderHeight: 'height: 70vh'
        })
      } else if(activity == 'order'){ //订单页面
        if (this.properties.contenList && this.properties.contenList.length > 0) {
          this.setData({
            orderHeight: 'height: 100vh'
          })
        }else {
          this.setData({
            orderHeight: 'height: 94vh'
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
        let id = e.currentTarget.dataset.id
        wx.navigateTo({
          url: `../../pages/activityDetails/activityDetails?id=${id}`
        })
      }
    },
    //跳转订单详情页面
    toOrderStatus(e) {
      // let status = e.currentTarget.dataset.status
      let no = e.currentTarget.dataset.no
      wx.navigateTo({
        url: `/pages/orderStatus/orderStatus?no=${no}`,
      })
    },
    //活动到时
    timeTo(e) {
      if(e.detail.timeTo) {
      }
    }
  }
})
