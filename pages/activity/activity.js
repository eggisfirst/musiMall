//index.js
//获取应用实例

Page({
  data: {
    tabVal: 0,    //传给content
    current: 0    //传给tab
  },
  onLoad() {
   
  },
  //tab组件触发
  getCurrentTab(e) {
    this.setData({
      tabVal: e.detail.currentTab
    })
  },
  //content组件触发
  setCurrentTab(e) {
    this.setData({
      current: e.detail.current
    })
  }
})
