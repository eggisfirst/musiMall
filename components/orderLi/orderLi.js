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
    status: {
      type: String,
      value: ''
    }
  },
  data: {
   
  },
  ready() {
    // console.log(this.properties.current)
  },
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  methods: {
    
  }
})
