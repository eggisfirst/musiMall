// pages/home/home.js
import { IndexModel } from '../../request/index.js'
const indexModel = new IndexModel()
const app = getApp()
Page({
  data: {
    activeList: [
      {
        activeName: "篮球王全国挑战赛",
        linkTo: "basketSignUp",
        activeIconName: "马上报名",
        id:1,
        type:'page',
        activeImage: "https://mobiletest.derucci.net/web/musiMall/images/home/basket.png"
      },
      {
        activeName: "幸运抽奖",
        linkTo: "lottery",
        activeIconName: "点击抽奖",
        id:2,
        activeImage: "https://mobiletest.derucci.net/web/musiMall/images/home/choujiang.png"

      },
      {
        activeName: "限时秒杀",
        linkTo: "activity",
        activeIconName: "立即抢购",
        id:3,
        activeImage: "https://mobiletest.derucci.net/web/musiMall/images/home/miaosha.png"

      },
      {
        activeName: "趣味篮球游戏",
        linkTo: "basketSignUp",
        activeIconName: "开始游戏",
        id:4,
        activeImage: "https://mobiletest.derucci.net/web/musiMall/images/home/bollbg.png"

      },
      {
        activeName: "慕思满额抽奖",
        linkTo: "basketSignUp",
        activeIconName: "查看中奖名单",
        id:5,
        activeImage: "https://mobiletest.derucci.net/web/musiMall/images/home/award.png"

      }
    ],
    btnStatus: false
  },
  onLoad () {
    //判断onLaunch是否执行完毕
    // if (app.globalData.userId) {
    //   this.getUserIntegral(app.globalData.userId)
    // } else {
    //   app.checkLoginReadyCallback = res => {
    //     this.getOtherActivity(res.data.id)
    //   };
    // }
  },
  getOtherActivity(userId) {
    indexModel.getOtherActivity(userId).then(res => {
      console.log(res)
    })
  },
  handleBtnStatus(e) {
    this.setData({
      btnStatus: false
    })
  }
})