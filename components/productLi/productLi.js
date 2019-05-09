Component({
  properties: {
    productType: {
      type: Object,
      value:{},
      observer(newVal) {
        let precent = newVal.precent
        this.setData({
          progressWidth: precent*4.9
        })
      }
    }
  },
  data: {
    progressWidth: 0,
    endTime: '1557399093826'
  },
  ready() {
    // console.log(this.properties.current)
  },
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  methods: {
   
  }
})
