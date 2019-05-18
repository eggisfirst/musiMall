import { IndexModel } from '../../request/index.js'
const indexModel = new IndexModel()
var WxParse = require('../../wxParse/wxParse.js');
// var Html2wxml = require('../../html2wxml-template/html2wxml.js');
import { b64DecodeUnicode, base64_decode } from '../../utils/index.js'

Page({
  data: {
    swiperType: {
      height: '573',
      indicatorDots: true,
      indicatorCcolor: "rgba(54,54,54,0.3)",
      indicatorActiveColor: 'rgba(54,54,54,0.6)',
      autoplay: false,
      interval: 3000,
      duration: 1000,
      circular: true
    },
    // showRules: true,
    showTips: true,
    tipsText: '活动尚未开始',
    showSelect: true,
    html: '',
    percent: 0,
    progressLeft: 0,
    productDetails: {}
  },
  onLoad(options) {
    this.getData(options.id)
    this.setBackData(options)
  },
  //设置后退返回的数据
  setBackData(options) {
    var pages = getCurrentPages(); //获取页面栈
    var prevPage = pages[pages.length - 2];  //上一个页面
    prevPage.setData({		//设置上一个页面的数据
      status: options.current
    })
  },
  //获取活动详情数据
  getData(id) {
    indexModel.getArtivityProductDetails(id).then(res => {
      if(res.status == 1) {
        this.initPercent(res.data)
        let imgArr = this.changeImg(res.data.productImgs)
        if (res.data.productDetails) {
          let html = base64_decode(res.data.productDetails)
          this.setData({
            productDetails: res.data,
            html: html,
            imgArr
          })
          WxParse.wxParse('article', 'html', html, this, 5);
        }else {
          this.setData({
            productDetails: res.data,
            imgArr
          })
        }
        this.initData(res.data.activityState)
        // Html2wxml.html2wxml('article', html, this, 5);
      }
    })
  },
  changeImg(imgs) {
    let arr = []
    if(imgs.indexOf(';') === -1) {
      arr.push(imgs)
      return arr
    }else {
      return imgs.split(";")
    }
  },
  //初始化进度条
  initPercent(data) {
    if(!data) {
      return
    }
    let sell = data.stock - data.onsaleStock
    if(sell <= 0) {
      this.setData({
        progressLeft: 100
      })
      return
    }else {
      let percent = (sell / data.stock)*100
      let progressLeft = percent*5 + 100
      this.setData({
        percent,
        progressLeft
      })
    }

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
      showTips: true
    })
  },
  //弹出提示
  clickBeginBtn(e) {
    this.setData({
      showTips: e.detail.tips
    })
  },
    //关闭规则
  setRulesTips(e){
    this.setData({
      showRules: e.detail.isShowRules
    })
  },
  //弹出规则
  clickRule(e) {
    this.setData({
      showRules: e.detail.rules
    })
  },
})