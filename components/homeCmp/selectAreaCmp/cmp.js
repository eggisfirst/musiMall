Component({
  properties: {
    value: {
      type: Array,
      value: [0,0,0],
      observer(newVal) {
        this.setData({
          val: newVal
        })
      }
    },
  },
  data: {
    provinces: ['请选择省份','广东省', '广东省', '广东省'],
    citys: ['请选择市','惠州市', '惠州市', '惠州市'],
    areas: ['请选择地区','惠东县', '惠东县', '惠东县'],
    // value: [0,0,0],
    province: "",
    city:"",
    area: "",
    status: false
  },
  methods: {
    //选择框改变
    drugChange(e) {
      this.setData({
        status: true
      })
      console.log('change')
      const val = e.detail.value
      const province = e.detail.value[0]
      const city = e.detail.value[1]
      const area = e.detail.value[2]
      this.setData({
        province,
        city,
        area,
      })
    },
    //取消
    handleCancle() {
      this.triggerEvent("setPickerArea", false)
    },
    //确定
    handleComfirm() {
      this.triggerEvent("setPickerArea", false)
      // if (this.data.status) {
      //   const val = {
      //     val: this.data.val,
      //     type: 'comfirm'
      //   }
      //   this.triggerEvent("setPickerStatus", val)
      //   this.setData({
      //     status: false
      //   })
      // } else {
      //   wx.showToast({
      //     title: '请选择性别',
      //     duration: 1500,
      //     icon: 'none',
      //     mask: true
      //   })
      // }

    }
  }
})
