Component({
  properties: {
    productDetails: Object
  },
  data: {
    cutColor: 'background: #efeff4',
    addColor: 'background: #fff',
    buyNum: 1
  },
  ready() {
    this.initNumColor()
  },
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  methods: {
    //初始化加号的颜色
    initNumColor() {
      let details = this.properties.productDetails
      if (details && details.everybodyNum == 1) {
        this.setData({
          addColor: 'background: #efeff4'
        })
      }
    },
    //提交订单
    comfirm() {
      this.triggerEvent('closeSelectNum', { status: true });
      let id = this.properties.productDetails.id
      let num = this.data.buyNum
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
      let num = this.properties.productDetails.everybodyNum 
      let buyNum = this.data.buyNum - 1
      if (buyNum < 1) {
        return
      }
      this.setCutColor(buyNum)
      this.setAddColor(buyNum)
      this.setData({
        buyNum
      })
    },
    //添加
    addNumber() {
      let num = this.properties.productDetails.everybodyNum
      let buyNum = this.data.buyNum + 1
      if (buyNum > this.properties.productDetails.everybodyNum) {
        return
      }
      this.setCutColor(buyNum)
      this.setAddColor(buyNum)
      this.setData({
        buyNum
      })
    },
    //设置减号背景颜色
    setCutColor(num) {
      if(num > 1) {
        this.setData({
          cutColor: 'background: #fff'
        })
      }else if(num <= 1){
        this.setData({
          cutColor: 'background: #efeff4'
        })
      }
    },
    //设置加号背景颜色
    setAddColor(num) {
      if (num >= this.properties.productDetails.everybodyNum) {
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
