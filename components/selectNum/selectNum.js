Component({
  properties: {
    queryData: {
      type: Object,
      value: ''
    }
  },
  data: {
    num: 1,
    cutColor: 'background: #efeff4',
    addColor: 'background: #fff'
  },
  ready() {
    if (this.properties.queryData.maxlength == 1) {
      this.setData({
        addColor: 'background: #efeff4'
      })
    }
  },
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  methods: {
    //提交订单
    comfirm() {
      this.triggerEvent('closeSelectNum', { status: true });
      let id = this.properties.queryData.id
      let num = this.data.num
      wx.navigateTo({
        url: `/pages/order/order?id=${id}&num=${num}`
      })
    },
    //关闭弹框
    closeBtn() {
      this.triggerEvent('closeSelectNum', { status: true });
    },
    //减少
    cutNumber() {
      let num = this.data.num - 1
      if(num < 1) {
        return
      }
      this.setCutColor(num)
      this.setAddColor(num)
      this.setData({
        num
      })
    },
    //添加
    addNumber() {
      let num = this.data.num + 1
      if (num > this.properties.queryData.maxlength) {
        return
      }
      this.setCutColor(num)
      this.setAddColor(num)
      this.setData({
        num
      })
    },
    //设置减号背景颜色
    setCutColor(num) {
      if(num > 1) {
        this.setData({
          cutColor: 'background: #fff'
        })
      }else {
        this.setData({
          cutColor: 'background: #efeff4'
        })
      }
    },
    //设置加号背景颜色
    setAddColor(num) {
      if (num >= this.properties.queryData.maxlength) {
        this.setData({
          addColor: 'background: #efeff4'
        })
      } else {
        this.setData({
          addColor: 'background: #fff'
        })
      }
    }
  }
})
