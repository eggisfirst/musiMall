// components/lotteryCmp/awardTipsBox/cmp.js
Component({
  properties: {
    awardData: Object,
    productId: String,
  },
  data: {
    formStatus:false
  },
  methods: {
    //确认提交
    comfirmBtn() {
      this.setData({
        formStatus:true
      })
    },
      //重新确认
    resetFormStatus() {
      this.setData({
        formStatus:false
      })
    },
    //提交成功
    handleComfrim() {
      wx.showToast({
        title: '提交成功',
        icon: 'none',
        duration: 1500
      })
      this.triggerEvent('closeTipsBox',{status: false})
    },
    //关闭弹框
    closeBtn() {
      this.triggerEvent('closeTipsBox',{status: false})
    }
  }
})
