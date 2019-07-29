// components/lotteryCmp/awardTipsBox/cmp.js
Component({
  properties: {
    awardData: Object
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
    //关闭弹框
    closeBtn() {
      this.triggerEvent('closeTipsBox',{status: false})
    }
  }
})
