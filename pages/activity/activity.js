//index.js
//获取应用实例

Page({
  data: {
    tabVal: 0,
    current: 0
  },
  onLoad() {
    // console.log(123)
  },
  getCurrentTab(e) {
    this.setData({
      tabVal: e.detail.currentTab
    })
  },
  setCurrentTab(e) {
    this.setData({
      current: e.detail.current
    })
  }
})
