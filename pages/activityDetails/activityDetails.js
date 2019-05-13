import { IndexModel } from '../../request/index.js'
const indexModel = new IndexModel()
var WxParse = require('../../wxParse/wxParse.js');
// var Html2wxml = require('../../html2wxml-template/html2wxml.js');
import { b64DecodeUnicode } from '../../utils/index.js'
Page({
  data: {
    imgUrls: [
      '/images/activityDetails/bed.png',
      '/images/activityDetails/bed1.png'
    ],
    swiperType: {
      height: '573',
      indicatorDots: true,
      indicatorCcolor: "rgba(54,54,54,0.3)",
      indicatorActiveColor: 'rgba(54,54,54,0.6)',
      autoplay: false,
      interval: 3000,
      duration: 1000,
      circular: true,
      html: ''
    },
    // showRules: true,
    showTips: true,
    tipsText: '活动尚未开始',
    showSelect: true,
    endTime: '1557399093826'
  },
  onLoad(options) {
    this.getData(options.id)
    this.setQueryData(options)
    this.initData(options)
  },
  //获取活动详情数据
  getData(id) {
    indexModel.getArtivityProductDetails(id).then(res => {
      // console.log(res)
      if(res.status == 1) {
        let html = b64DecodeUnicode(res.data.productDetails)
        this.setData({
          productDetails: res.data,
          html: html
        })
        this.initData(res.data.activityState)
        // console.log(html)
        // Html2wxml.html2wxml('article', html, this, 5);
        WxParse.wxParse('article', 'html', html, this, 5);
      }
    })
  },
  //设置路由参数
  setQueryData(options) {
    // console.log(options.id)
    let data = {
      id: options.id,
      type: options.type,
      productType: options.productType,
      maxlength: options.maxlength
    }
    this.setData({
      queryData: data
    })
  },
  //判断是哪个类型的页面
  initData(status) {
    if (status == 0) {
      this.setData({
        priceText: '即将开始'
      })
    } else if (status == 1) {
      this.setData({
        priceText: '限时秒杀'
      })
    } else if (status == 2) {
      this.setData({
        priceText: '活动已结束'
      })
    }
  },
  //关闭提交订单弹框
  closeSelectNum(e) {
    this.setData({
      showSelect: e.detail.status
    })
  },
  //打开提交订单弹框
  openSelectNum(e) {
    this.setData({
      showSelect: e.detail.status
    })
  },
  //关闭提示
  closeTips(e) {
    this.setData({
      showTips: e.detail.tips
    })
  },
  //弹出提示
  clickBeginBtn(e) {
    this.setData({
      showTips: e.detail.tips
    })
  }
    //关闭规则
  // setRulesTips(e){
  //   this.setData({
  //     showRules: e.detail.isShowRules
  //   })
  // },
  //弹出规则
  // clickRule(e) {
  //   this.setData({
  //     showRules: e.detail.rules
  //   })
  // },
})