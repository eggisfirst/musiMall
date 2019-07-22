// components/homeCmp/pickerViewCmp/cmp.js
Component({
  properties: {
    //设置选中的选项
    sexValue: {
      type: Array,
      value: [0],
      observer(newVal,oldVal) {
        this.setData({
          value: newVal,
        })
      }
    }
  },
  data: {
    sex:['请选择性别','男','女'],
    value: [0],
    val: '请选择性别',
    status: false,
    activeIndex: [0]
  },
  methods: {
    //选择框改变
    bindChange (e) {
      console.log(e)
      const val = e.detail.value
      this.setData({
        val: this.data.sex[val],    //选中的值
        status: true,               //为true才能触发comfirm事件
        activeIndex: val            //选中的index
      })
    },
    bindpickend(e) {
      console.log('end')
    },
    bindpickstart(e) {
      console.log('start')
    },
    //取消
    handleCancle() {
      const val = {
        type: 'cancle'
      }
      this.triggerEvent("setPickerStatus",val)
    },
    //确定
    handleComfirm() {
      // if (this.data.status) {
        const val = {
          val: this.data.val,
          type: 'comfirm',
          activeIndex: this.data.activeIndex
        }
        this.triggerEvent("setPickerStatus", val)
        this.setData({
          status: false
        })
      // }else {
      //     wx.showToast({
      //       title: '请选择性别',
      //       duration: 1000,
      //       icon: 'none',
      //       mask: true

      //     })
      // }

    }
  }
})
