// pages/game/geme.js
Page({

  /**
   * 页面的初始数据
   */
  data: {

  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.log(options)
  },
  
  onShareAppMessage(res) {
    return {
      title: '一起为慕思篮球王全国挑战赛打Call！点击参与>>',
      path: '/pages/home/home',
      imageUrl: "https://derucci-app.oss-cn-hangzhou.aliyuncs.com/musiMall/images/poster.png",
      success:() => {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })

      }
    }
  },
  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {
  
  },
  bindmessage() {
    console.log(1111)
  }
})