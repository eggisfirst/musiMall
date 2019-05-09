Component({
  properties: {
    //从父组件接收
    num: {
      type: String,
      value: '1'
    },
    type: {
      type: String,
      value: ''
    },
    orderList: {
      type: Object,
      value: {}
    }
  },
  data: {
   
  },
  ready() {
    // console.log(this.properties.orderList)
  },
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  methods: {
    payBtn() {
      console.log('付款')
    }
  }
})
