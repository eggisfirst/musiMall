// components/homeCmp/posterCmp/cmp.js
import { IndexModel } from '../../../request/index.js'
const indexModel = new IndexModel()
const app = getApp()

Component({
  properties: {
    imgUrl: String
  },
  data: {
    tmpPath: '',
    saveStatus: false
  },
  methods: {
    //取消保存
    handleCancle() {
      console.log('cancle')
      this.triggerEvent("handleSavePoster",{cancle: true})
    },
    handleSave() {
      let that = this
      wx.saveImageToPhotosAlbum({
        filePath: "/images/poster.png",
        success(res) { 
          that.savePoster()
          wx.switchTab({
            url: '/pages/home/home'
          })
          wx.showToast({
            title: '保存成功',
            icon: 'none',
            duration: 2000
          })
        
        },
        //如果保存失败则要重新手动授权相册访问
        fail: function (err) {
          if (err.errMsg === "saveImageToPhotosAlbum:fail:auth denied" || err.errMsg === "saveImageToPhotosAlbum:fail auth deny") {
            // 这边微信做过调整，必须要在按钮中触发，因此需要在弹框回调中进行调用
            wx.showModal({
              title: '提示',
              content: '需要您授权保存相册',
              showCancel: false,
              success: modalSuccess => {
                wx.openSetting({
                  success(settingdata) {
                    console.log("settingdata", settingdata)
                    if (settingdata.authSetting['scope.writePhotosAlbum']) {
                      wx.showModal({
                        title: '提示',
                        content: '获取权限成功,再次点击图片即可保存',
                        showCancel: false,
                      })
                    } else {
                      wx.showModal({
                        title: '提示',
                        content: '获取权限失败，将无法保存到相册哦~',
                        showCancel: false,
                      })
                    }
                  },
                  fail(failData) {
                    console.log("failData", failData)
                  },
                  complete(finishData) {
                    console.log("finishData", finishData)
                  }
                })
              }
            })
          }
        },
      })
    },
    //保存成功获得积分
    savePoster() {
      const userId = app.globalData.userId
      indexModel.getPoster(userId).then(res => {
        console.log(res)
      })
    }
  }
})
