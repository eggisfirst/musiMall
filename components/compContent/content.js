Component({
  //从父组件接收
  properties: {
    tabVal: {
      type: String,//类型
      value: '0'//默认值
    }
  },
  data: {
    current: 0,
    list: [{
      name: 'tab1',
      tab:0,
      productList:[
        {
          name: '产品名称产品名称产品名称产品名称产品名称产品名称',
          productType:0,
          imgUrl: '',
          price: 500,
          slider: true,
          precent: 0,
          robbed: 0,
          priceSpike: 100,
          count: true,
          countHour: '01',
          countMin: '05',
          countSec: '30',
        }, {
          name: '优惠卷名称',
          productType: 1,
          imgUrl: '',
          price: 500,
          slider: true,
          precent: 0,
          robbed: 0,
          priceSpike: 100,
          count: true,
          countHour: '01',
          countMin: '05',
          countSec: '30',
        }
      ],
    },{
      name: 'tab2',
      tab: 1,
      productList: [
        {
          name: '产品名称产品名称产品名称产品名称产品名称产品名称',
          productType: 0,
          price: 500,
          slider: false,
          precent: 0,
          robbed: 0,
          priceSpike: 100,
          piece: 50,
          count: false,
          startDay: '3月30日',
          startTime: '09:00'
        }
      ],
    },{
      name: 'tab3',
      tab: 2,
      productList: [
        {
          name: '产品名称',
          productType: 0,
          price: 500,
          slider: true,
          precent: 10,
          robbed: 8,
          priceSpike: 100,
          piece: 50,
          count: false,
          endDay: true
        }
      ],
    }],
  }, 
  methods: {
    //滑动事件
    swiperChange(e) {
      this.setData({
        current: e.detail.current
      })
      //传给父组件
      this.triggerEvent('setCurrentTab', { current: this.data.current });
    },
    //先判断有没有登陆再跳转
    toProductDetails(e) {
      let tips = getApp().globalData.login
      this.triggerEvent('setLoginTips', { loginTips: tips});
      if(tips) {
        let type = e.currentTarget.dataset.type
        let id = e.currentTarget.dataset.index
        let productType = e.currentTarget.dataset.producttype
        wx.navigateTo({
          url: `../../pages/activityDetails/activityDetails?type=${type}&id=${id}&productType=${productType}`
        })
      }
    }
  }
})