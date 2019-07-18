// components/homeCmp/alertBoxCmp/cmp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    signUpStatus: Boolean
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
    //分享活动
    handleShare() {
      console.log('share')
    },
    //生产海报
    handlePoster() {
    },
    //关闭弹框
    handleClose() {
      this.triggerEvent('setSignUpStatus', { signUpStatus: false });
    }
  }
})
