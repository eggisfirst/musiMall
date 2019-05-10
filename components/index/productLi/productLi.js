// components/index/productLi/productLi.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    orderDetails: {
      type: Object,
      value: {},
      observer(newVal){
        console.log(newVal)
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
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
