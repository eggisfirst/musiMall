// components/homeCmp/alertBoxCmp/cmp.js
Component({
  properties: {
    signUpStatus: Boolean
  },
  data: {
    showPoster: false
  },
  
  /**
   * 组件的方法列表
   */
  methods: {
    //分享活动
    handleShare() {
      console.log('share')
      // this.handlePoster(false)
    },
    //生成海报
    handlePoster(status=true) {
      this.setData({
        showPoster: status
      })
    },
    //关闭弹框
    handleClose() {
      this.triggerEvent('setSignUpStatus', { signUpStatus: false });
    },
    //取消海报
    handleSavePoster(e) {
      if(e.detail.cancle) {
        this.handlePoster(false)
      }
    }
  }
})
