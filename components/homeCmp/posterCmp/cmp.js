// components/homeCmp/posterCmp/cmp.js
import { IndexModel } from '../../../request/index.js'
const indexModel = new IndexModel()
const app = getApp()

Component({
  properties: {

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
        filePath: "/images/basketball/bottom.png",
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
        
        }
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
