// components/homeCmp/activeCmp/activeCmp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    activeData:Object
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
    navigateTo(e) {
      const url = this.data.activeData.linkTo
      if (url === 'lottery' || url === "activity") {
        wx.switchTab({
          url: `../${url}/${url}`,
        })
      }else {
        wx.navigateTo({
          url: `../${url}/${url}`,
        })
      }
    }
  }
})
