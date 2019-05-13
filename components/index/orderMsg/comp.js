// components/index/orderMsg/comp.js
Component({
  properties: {
    orderDetails: Object
  },
  data: {

  },
  ready() {
    this.initTemplate()
  },
  methods: {
    initTemplate() {
      console.log(111,this.properties.orderDetails)
      let status = this.properties.orderDetails.orderState
      this.setData({
        status
      })
    }
  }
})
