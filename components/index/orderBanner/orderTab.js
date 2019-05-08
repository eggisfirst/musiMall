Component({
  properties: {
    //从父组件接收
  
  },
  data: {
    tabList: [{
      name: '全部订单',
      imgUrl: '/images/index/all-order.png',
      color: 'background:rgba(255,45,85,0.6)'
    },{
      name: '待付款',
      imgUrl: '/images/index/unpay.png',
      color: 'background:rgba(0,122,255,0.6);'
    },{
      name: '待核销',
      imgUrl: '/images/index/weihexiao.png',
      color: 'background:rgba(255,204,0,0.6);'
    }, {
      name: '已核销',
      imgUrl: '/images/index/yihexiao.png',
      color: 'background:rgba(255,149,0,6);'
    }]
  },
  ready() {
    // console.log(this.properties.current)
  },
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  methods: {
    toDetails(e) {
      console.log(e.currentTarget.dataset.index)
    }
  }
})
