// components/homeCmp/posterCmp/cmp.js
Component({
  properties: {

  },
  data: {
    tmpPath: ''
  },
  methods: {
    //取消保存
    handleCancle() {
      console.log('cancle')
      this.triggerEvent("handleSavePoster",{cancle: true})
    },
    handleSave() {
      console.log('save')
      const ctx = wx.createCanvasContext('myCanvas');
      wx.getImageInfo({
        src: 'https://ss2.bdstatic.com/70cFvnSh_Q1YnxGkpoWK1HF6hhy/it/u=1395765958,3377106680&fm=27&gp=0.jpg',
        success: function (res) {
          console.log(res.width)
          console.log(res.path)
        }
      })
      ctx.draw(true, setTimeout(() => {
        wx.canvasToTempFilePath({
          canvasId: 'myCanvas',
          success: function (res) {
            console.log(111111)
            this.data.tmpPath = res.tempFilePath
          },
        })
      }, 1000));

      wx.saveImageToPhotosAlbum({
        success(res) { 
          console.log(res)
        }
      })
    }
  }
})
