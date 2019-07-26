// components/lotteryCmp/scoreBox/cmp.js
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
    optionsList:[
      {
        imgUrl: "../../../images/lottery/wx.png",
        title: "微信登陆",
        content: "仅首次登陆奖励积分",
        right: {
          status: 1,
          text: "已登陆"
        }
      },
      {
        imgUrl: "../../../images/lottery/friend.png",
        title: "邀请好友参加活动",
        content: "邀请好友登陆小程序30积分/人",
        right: {
          status: 0,
          text: "分享",
          score: "+30"
        }
      }, {
        imgUrl: "../../../images/lottery/poster.png",
        title: "生成保存助威海报",
        content: "仅首次生成保存奖励积分",
        right: {
          status: 0,
          text: "生成",
          score: "+50"
        }
      }, {
        imgUrl: "../../../images/lottery/ball.png",
        title: "参与趣味篮球小游戏",
        content: "仅首次游玩奖励积分",
        right: {
          status: 0,
          text: "参与",
          score: "+50"
        }
      }
    ],
    showRecord: false
  
  },

  /**
   * 组件的方法列表
   */
  methods: {
    //点击
    handleBtn(e) {
      console.log(e.currentTarget.dataset.index)
    },
    //点击中奖记录
    handleRecord() {
      this.setData({
        showRecord: true
      })
      console.log('record')
    }
  }
})
