Component({
  properties: {
    orderDetails: Object
  },
  data: {

  },
  methods: {
    //参数问题
    toProductDetails() {
      let id = this.properties.orderDetails.activityId
      wx.navigateTo({
        url: `../../pages/activityDetails/activityDetails?type=0&id=${id}&maxlength=1`
      })
    }
  }
})
