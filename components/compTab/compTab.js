Page({
  data: {
    currentTab: 0,
    list: [{
      name: '正在疯抢',
      tab: 0,
    },{
      name: '即将开抢',
      tab: 1,
    },{
      name: '抢购结束',
      tab: 2,
    }]
  },
  //设置导航栏跳转索引
  swichNav(e) {
    if (this.data.currentTab === e.target.dataset.current) {
      return false;
    } else {
      this.setData({
        currentTab: e.target.dataset.current,
      })
    }
  },
  setCurrentTab(e) {
    this.setData({
      currentTab: e.detail.current
    })
  }
})