// components/index/productLi/productLi.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

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
      wx.navigateTo({
        url: '../../pages/activityDetails/activityDetails?type=0&id=1&maxlength=1'
      })
    }
  }
})
