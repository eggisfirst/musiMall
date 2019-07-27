// components/lotteryCmp/recordBox/cmp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    recordList: [
      {
        imgUrl: "https://mobiletest.derucci.net/web/musiMall/images/lottery/record/500.png",
        type: 0,  //优惠券
        number: "0008898778",
        title: "500元代金券",
        status: "未核销",
        time: "07-06 09:47:02"
      },
      {
        imgUrl: "https://mobiletest.derucci.net/web/musiMall/images/lottery/record/399.png",
        type: 0,  //优惠券
        number: "0008891238",
        title: "399元代金券",
        status: "已核销",
        time: "07-06 09:47:02"
      },
      {
        imgUrl: "https://mobiletest.derucci.net/web/musiMall/images/lottery/record/gift.png",
        type: 1,  //
        title: "助眠四季精油礼盒套装",
        name: "Tina",
        phone: "15013999999",
        adress: "东莞市厚街镇双岗上环工业区艾慕工业园",
        time: "07-06 09:47:02"
      },
      {
        imgUrl: "https://mobiletest.derucci.net/web/musiMall/images/lottery/record/gift.png",
        type: 1,  //
        title: "助眠四季精油礼盒套装",
        name: "Tina",
        phone: "15013999999",
        adress: "东莞市厚街镇双岗上环工业区艾慕工业园",
        time: "07-06 09:47:02"
      }
    ]
  },

  /**
   * 组件的方法列表
   */
  methods: {
    handleCloseBtn() {
      this.triggerEvent("setShowRecord",true)
    }
  }
})
