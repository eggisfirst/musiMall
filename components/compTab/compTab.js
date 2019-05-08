Component({
  properties: {
    //从父组件接收
    current: {
      type: String,
      value: '0',
      observer(newVal) {
        this.setData({
          currentTab: newVal  //监听变化的时候
        })
      }
    }
  },
  data: {
    currentTab: 0,
    list: [{
      name: '正在疯抢',
      tab: 0,
    }, {
      name: '即将开抢',
      tab: 1,
    }, {
      name: '抢购结束',
      tab: 2,
    }]
  },
  ready() {
    // console.log(this.properties.current)
  },
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  methods: {
    //设置导航栏跳转索引
    swichNav(e) {
      if (this.data.currentTab === e.target.dataset.current) {
        return false;
      } else {
        this.setData({
          currentTab: e.target.dataset.current,
        })
        //传给父组件
        this.triggerEvent('getCurrentTab', { currentTab: this.data.currentTab })
      }
    }
  }
})