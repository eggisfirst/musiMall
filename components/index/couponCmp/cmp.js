// components/index/couponCmp/cmp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    couponList: Array,
    status: {
      type: Boolean,
      observer() {
        this.setData({
          currentIndex: -1
        })
      }
    }
  },

  /**
   * 组件的初始数据
   */
  data: {
    currentIndex: -1
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //切换使用规则
    handleShowRules(e) {
      const currentIndex = e.currentTarget.dataset.index
      if(this.data.currentIndex === currentIndex) {
        this.setData({
          currentIndex: -1
        })
      }else {
        this.setData({
          currentIndex
        })
      }
     
    }
  }
})
