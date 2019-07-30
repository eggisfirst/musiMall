// pages/lottery/lottery.js


Page({
  data: {
    activeStatus: "", //抽奖的状态/时间/积分
    fixed: "",
    scrollTop: 0,
    showRules: false
  },
  onLoad (options) {
    
  },
  //监听页面滚动距离
  onPageScroll(e) { // 获取滚动条当前位置
    this.setData({
      scrollTop: e.scrollTop
    })
  },
  //设置背景是否固定
  sexFixStatus(e) {
    const status = e.detail.status
    const fixed = status? 'indexFixed' : ''
    const hasScroll = e.detail.type  //判断页面需不需要滚动
    this.setPageScroll(hasScroll,status)
    this.setData({
      fixed
    })
  },
  //页面滚动到指定位置
  setPageScroll(hasScroll,status) {
    if(!hasScroll) {
      return
    }
    if(!status) {
      this.setPageScroll()
    }else {
      wx.setStorageSync('srcollTop', this.data.scrollTop)
    }
    const scrollTop = wx.getStorageSync('srcollTop')
    setTimeout(() => {
      wx.pageScrollTo({
        scrollTop
      })
    }, 10);
  },
  //点击打开规则
  handleRuleBtn() {
    this.setData({
      showRules: true,
      fixed: 'indexFixed'
    })
  },
  //关闭规则
  setShowRules() {
    this.setData({
      showRules: false,
      fixed: ''
    })
  }

})