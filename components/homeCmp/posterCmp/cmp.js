// components/homeCmp/posterCmp/cmp.js
import { IndexModel } from '../../../request/index.js'
const indexModel = new IndexModel()
const app = getApp()

Component({
  properties: {
    imgUrl: String,
    name: String
  },
  data: {
    tmpPath: '',
    saveStatus: false,
    via: "https://wx.qlogo.cn/mmopen/vi_32/Q0j4TwGTfTK9yeom1bMibtfgcTFV2AV2tickQgib6rwzxmibFibWpHYxPMBn1T6RfE5o7HenfuXEBb1w2ibDSFeCMibow/132",
    cardCreateImgUrl: "https://derucci-app.oss-cn-hangzhou.aliyuncs.com/musiMall/images/poster.png",
    width:'',
    height: "",
    canvasW: "",
    canvasH: "",
    btnHeight: ""
  },
  ready() {
    this.openAndDraw()
    this.getSize()
  },
  methods: {
    //获取宽高
    getSize() {
      wx.getSystemInfo({
        success: res => {
          const w = 334/750 * res.windowWidth*2
          // const h = 500/1334 * res.windowHeight*2
          const h = w*1.52
          const btnH = res.windowHeight - h - 78
          this.setData({
            width: res.windowWidth,
            // height: res.windowWidth*1.5,
            canvasH: h + 'px',
            canvasW: w + 'px',
            btnHeight: btnH + 'px'
          })
        }
      })
    },
    //转化设计图的单位
    toPx(x,y) {
      return {
        x: x/750 * this.data.width*2,
        // y: y/1334 * this.data.height*2,
        y: x/750 * this.data.width*2*1.5
      }
    },
    openAndDraw() {
      var ctx = wx.createCanvasContext('canvasIn',this)
      const that = this
      wx.showLoading({
        title: '生成中',
      })
      wx.downloadFile({
        url: that.data.cardCreateImgUrl,
        success: function (sres) {
          // that.data.mysrc = sres.tempFilePath
          wx.downloadFile({
            url: that.data.imgUrl,
            success(res) {
              that.setBg(ctx,sres.tempFilePath,res.tempFilePath)
            }
          })

        }
      })
    },
    // 第一步绘制背景图片
    setBg (context,path,viaPath) {
      const that = this;
      wx.getImageInfo({
        src: path,
        success: function (res) {
          var path = res.path;
          const size = that.toPx(334,500)
          // console.log(123,w)
          context.drawImage(path, 0, 0, size.x, size.y);
          //添加文字
          var text = `${that.data.name}邀请你一起来为慕思篮球王全国挑战赛打CALL !`;//这是要绘制的文本
          that.setText(context,text)
          //绘制完背景图之后绘制头像
          that.setHandle(context,viaPath)
        }
      })
    },
    //第三个绘制头像图片
    setHandle (context,HandleUrl) {
      var that = this;
      // var HandleUrl = this.data.imgUrl;
      wx.getImageInfo({
        src: HandleUrl,
        success: function (res) {
          var path = res.path;
          const size = that.toPx(294,487)  //裁剪区域x坐标
          const size2 = that.toPx(269,480)  //图片的x坐标
          const size3 = that.toPx(276,0)    //图片的y坐标
          // context.drawImage(path, 280, 500, 50, 50);
          context.save();
          context.beginPath()//开始创建一个路径
          context.arc(size.x, size.y,25, 0, 2 * Math.PI, false)//画一个圆形裁剪区域
          context.clip()//裁剪
          context.drawImage(path, size2.x, size3.y, 54, 54)//绘制图片
  
          context.restore();
          context.stroke();

          context.draw()
          //绘制的最后一张图片绘制完之后回调生成图片
          wx.canvasToTempFilePath({
            canvasId: 'canvasIn',
            success: (res) => {
             
              console.log('suc',res)
              wx.hideLoading()

            },
            fail: (res) => {
              console.log('err',res);
            }
          },that);
  
          // context.draw(false, wx.canvasToTempFilePath({
          //   canvasId: 'canvasIn',
          //   success: function (res) {
          //     var tempFilePath = res.tempFilePath;
          //     console.log(tempFilePath);
          //     that.setData({
          //       newImage: tempFilePath,
          //     });
          //   },
          //   fail: function (res) {
          //     console.log(res);
          //   }
          // }),this);
        },
        fail: function (res) {
          console.log(res);
        }
      })
    },
    //文字
    setText(context,text) {
      context.save();
      var chr = text.split("");//这个方法是将一个字符串分割成字符串数组
      var temp = "";
      var row = [];
      context.setFontSize(14)
      context.setFillStyle("#fff")
      for (var a = 0; a < chr.length; a++) {
        if (context.measureText(temp).width < this.toPx(135,0).x) {
          temp += chr[a];
        }
        else {
          a--; //这里添加了a-- 是为了防止字符丢失，效果图中有对比
          row.push(temp);
          temp = "";
        }
      }
      row.push(temp);
      for (var b = 0; b < row.length; b++) {
        // context.fillText(row[b], 110, 430 + b * 20, 135);
        //文字x坐标/y坐标
        context.fillText(row[b], this.toPx(110,0).x, this.toPx(430,0).x + b * 20, this.toPx(435,0).x);
      }
      context.restore();
      context.stroke();
    },
    //取消保存
    handleCancle() {
      wx.hideLoading()
      console.log('cancle')  
      this.triggerEvent("handleSavePoster",{cancle: true})
      this.triggerEvent("closePoster",true)
    },
    handleSave() {
      var that = this
      wx.canvasToTempFilePath({
        canvasId: 'canvasIn',
        success: (res) => {
          wx.saveImageToPhotosAlbum({
            filePath: res.tempFilePath,
            success(res) { 
              that.savePoster()
              // wx.showToast({
              //   title: '保存成功',
              //   icon: 'none',
              //   duration: 2000
              // })
              wx.showModal({
                title: '提示',
                content: '图片已保存',
                showCancel: false,
                success (res) {
                  if (res.confirm) {
                    console.log('用户点击确定')
                  } else if (res.cancel) {
                    console.log('用户点击取消')
                  }
                }
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
        fail: (err) => {
          console.error(err)
        }
      }, this)
    },
    //保存成功获得积分
    savePoster() {
      const userId = app.globalData.userId
      indexModel.getPoster(userId).then(res => {
        if(res.status) {
          this.triggerEvent('savePoster',true)
        }
      })
    }
  }
})
