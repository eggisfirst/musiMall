Component({
  properties: {
    tipsText: {
      type: String,
      value: '暂无内容'
    }
  },
  data: {
  },
  ready() {

  },
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  methods: {
    closeTips() {
      this.triggerEvent('closeTips', {tips: true})
    }
  }
})