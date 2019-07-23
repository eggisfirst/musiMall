// components/homeCmp/getScoreCmp/cmp.js
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
  methods: {
    //关闭弹框
    handleClose() {
      this.triggerEvent("handleBtnStatus", false)
    },
    //领取积分
    handleGetScore() {
      console.log('get')
    }
  }
})
