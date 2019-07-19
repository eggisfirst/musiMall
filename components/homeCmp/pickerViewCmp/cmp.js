// components/homeCmp/pickerViewCmp/cmp.js
Component({
  properties: {
    sexValue: {
      type: Array,
      value: [0],
      observer(newVal) {
        this.setData({
          value: newVal,
        })
      }
    },
    sexName:String
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
    drugChange (e) {
      const val = e.detail.value
      this.setData({
        val: this.data.sex[val],    //选中的值
        status: true,               //为true才能触发comfirm事件
        activeIndex: val            //选中的index
      })
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
      console.log(this.data.value,this.data.sexName)
      //change动画停止才触发
      // console.log(this.data.sex[this.data.value])
      // console.log(this.data.sexName)
      // if (this.data.sex[this.data.activeIndex] === this.data.sexName) {
      //   const val = {
      //     type: 'comfirm',
      //   }
      //   this.triggerEvent("setPickerStatus", val)
      //   return
      // }

      if (this.data.status && this.data.val !== '请选择性别' ) {
        const val = {
          val: this.data.val,
          type: 'comfirm',
          activeIndex: this.data.activeIndex
        }
        this.triggerEvent("setPickerStatus", val)
        this.setData({
          status: false
        })
      }else {
        // if (this.data.sex[this.data.value] === this.data.sexName) {
        //   const val = {
        //     type: 'comfirm',
        //   }
        //   this.triggerEvent("setPickerStatus", val)
        // }else {
          wx.showToast({
            title: '请选择性别',
            duration: 1000,
            icon: 'none',
            mask: true

          })
        // }
       
      }

    }
  }
})
