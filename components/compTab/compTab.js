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
    },
    list: Array
  },
  data: {
    currentTab: 0
  },
  ready() {
  },
  methods: {
    //设置导航栏跳转索引
    swichNav(e) {
      if (this.data.currentTab === e.target.dataset.index) {
        return false;
      } else {
        this.setData({
          currentTab: e.target.dataset.index,
        })
        //传给父组件
        this.triggerEvent('getCurrentTab', { currentTab: this.data.currentTab })
      }
    }
  }
})
