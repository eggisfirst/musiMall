// components/index/orderMsg/comp.js
Component({
  properties: {
    queryData: {
      type: Object,
      value: {}
    },
    orderDetails: {
      type: Object,
      value: {}
    }
  },
  data: {

  },
  ready() {
    this.initTemplate()
  },
  methods: {
    initTemplate() {
      let status = this.properties.queryData.status
      this.setData({
        status
      })
    }
  }
})
