import { IndexModel } from '../../request/index.js'
const indexModel = new IndexModel()

Page({
  data: {

  },
  onLoad: function (options) {
    this.getData(options.num)
  },
  getData(num) {
    indexModel.getOrderDetails(num).then(res => {
      this.setData({
        orderList:res.data
      })
    })
  }
})