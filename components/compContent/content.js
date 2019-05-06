Component({
  properties: {
    tabVal: {
      type: String,//类型
      value: '0'//默认值
    }
  },
  data: {
    current: 0,
    list: [{
      name: 'tab1',
      id:1
    },{
      name: 'tab2',
      id: 1
    },{
      name: 'tab3',
      id: 1
    }]
  }, 
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  attached: function () { },
  moved: function () { },
  detached: function () { },
  methods: {
    swiperChange(e) {
      this.setData({
        current: e.detail.current
      })
      this.triggerEvent('setCurrentTab', { current: this.data.current });
    }
  }
})
