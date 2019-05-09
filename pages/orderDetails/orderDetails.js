// pages/orderDetails/orderDetails.js
Page({
  data: {
    list: [{
      name: '全部',
      tab: 0,
    }, {
      name: '待付款',
      tab: 1,
    }, {
      name: '待核销',
      tab: 2,
    }, {
      name: '已核销',
      tab: 3,
    }],
    contentlist: [
      {
        tab:0,
        orderList: [{
          no: 123123,
          status:1
        }, {
          no: 123123,
          status: 2
        }, {
          no: 123123,
          status: 3
        }, {
          no: 123123,
          status: 4
          }, {
            no: 123123,
            status: 4
          }]
      },{
        tab:1,
        orderList: [
          {
            no: 123123,
            status: 3
          }
        ]
      },{
        tab:2,
        orderList: [
          {
            no: 123123,
            status: 1
          }
        ]
      },{
        tab:3,
        orderList: [
          {
            no: 123123,
            status: 2
          }
        ]
      }
    ]
  },
  onLoad: function (options) {
    this.initQueryData(options.index)
  },
  //判断第几个tab
  initQueryData(index) {
    if(index) {
      this.setData({
        tabVal: index
      })
    }
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
  },
})