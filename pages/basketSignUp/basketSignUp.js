// pages/basketSignUp/basketSignUp.js
import { IndexModel } from '../../request/index.js'
const indexModel = new IndexModel()
const app = getApp()

Page({
  data: {
    signUpStatus: false,
    sexArr: ['男','女'],
    sexIndex: [0],
    multiArray: [],
    // 1.multiIndex: [0, 0, 0],
    multiIndex: [0, 0],
    showRegion: false,
    showSex: false,
    region: '',
    sexVal: "",
    phone:"",
    nameVal:"",
    posterBtn: true,
    hasSignUp: false,
    imgUrl: "",
    name: "",
    posterStatus:false
  },
  onLoad(options) {
    // console.log(1122,options)
    this.hasSignUp(options)
    this.hasGetInfo()
  },
   //打开海报
   setPosterStatus(e) {
    this.setData({
      posterStatus: true
    })
  },
  //关闭海报
  closePoster() {
    this.setData({
      posterStatus: false
    })
  },
  //获取个人头像
  setViaImage(e) {
    this.setData({
      imgUrl:e.detail.user.avatarUrl,
      name: e.detail.user.nickName
    })
  },
  //判断有没有报名
  hasSignUp(options) {
    if (options.type) {
      this.setData({
        hasSignUp: true
      })
    }else {
      this.initAreaArr()
    }
  },

  //判断有没有授权个人信息
  hasGetInfo() {
    if (!app.globalData.userInfo) {
      this.setData({
        posterBtn: false
      })
    }
  },
  //授权登录后
  setPosterBtn() {
    this.setData({
      posterBtn: true
    })
  },
  //分享
  onShareAppMessage:(res) => {
    const userId = app.globalData.userId 
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: '一起为慕思篮球王全国挑战赛打Call！点击参与>>',
      path: '/pages/home/home?userId=' + userId,
      imageUrl: "https://mobiletest.derucci.net/web/musiMall/images/poster.png",
      success:() => {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })

      }
    }
  },
  //跳转规则页面
  navigateToRule() {
    wx.navigateTo({
      url: '/pages/basketRule/basketRule',
    })
  },
 
  //选择性别
  sexPickerChange (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    const sexVal = this.data.sexArr[e.detail.value]
    this.setData({
      sexIndex: e.detail.value,
      sexVal,
      showSex: true
    })
  },

  //初始地区选择框
  initAreaArr() {
    let multiArray = this.data.multiArray
    this._getRegion(2).then(res => {
      let provinceArr = [],
          provinceIdArr = []
      res.forEach(item => {
        if (!item.chooseStatus) {
          provinceArr.push(item.name)
          provinceIdArr.push(item.id)
        }
      })
      //如果没有省的话返回空
      // console.log(1111,provinceArr)
      if (!provinceArr.length) {
        return
      }
      const id = provinceIdArr[0]
      let cityIdArr = []
      this._getRegion(3 ,id).then(res => {
        let cityArr = []
        res.forEach(item => {
          if (!item.chooseStatus) {
            cityArr.push(item.name)
            cityIdArr.push(item.id)
          }
        })
          multiArray[0] = provinceArr
          multiArray[1] = cityArr
        this.setData({
          multiArray,
          provinceIdArr
        })
        // 5.const cityId = res[0].id
        // this._getRegion(4, cityId).then(res => {
        //   console.log(res)
        //   let areaArr = []
        //   res.forEach(item => {
        //     if (!item.chooseStatus) {
        //       areaArr.push(item.name)
        //     }
        //   })
        //   multiArray[0] = provinceArr
        //   multiArray[1] = cityArr
        //   multiArray[2] = areaArr
        //   this.setData({
        //     multiArray,
        //     provinceIdArr,
        //     cityIdArr
        //   })
        // })
      })
    })
  },
  //选择地区
  bindMultiPickerChange(e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    if (!this.data.multiArray[1][0]) {
      this.setData({
        region: "",
        showRegion: false
      })
      return
    }
    
    //2. const region = this.data.multiArray[0][this.data.multiIndex[0]] + this.data.multiArray[1][this.data.multiIndex[1]] + (this.data.multiArray[2][this.data.multiIndex[2]] || "")
    const region = this.data.multiArray[0][this.data.multiIndex[0]] + this.data.multiArray[1][this.data.multiIndex[1]] 
    this.setData({
      region,
      showRegion: true
    })
  },
  //获取地区
  _getRegion(type, parentId) {
    return new Promise((resolve, reject) => {
      let obj = {}
      obj.type = type
      if(parentId) {
        obj.parentId = parentId
      }
      indexModel.getRegionForBasketballActivities(obj).then(res => {
        if(res.data) {
          resolve(res.data)
        }
      })
    })
  },
  //多选
  bindMultiPickerColumnChange: function (e) {
    console.log('修改的列为', e.detail.column, '，值为', e.detail.value);
    let multiArray = this.data.multiArray
    let multiIndex = this.data.multiIndex
    multiIndex[e.detail.column] = e.detail.value;
    if (e.detail.column === 0) {
      let id = this.data.provinceIdArr[e.detail.value]
      this._getRegion(3,id).then(res => {
        let arr = []
        res.forEach(item => {
          if (!item.chooseStatus) {
            arr.push(item.name)
          }
          multiArray[1] = arr
          multiIndex[1] = 0;
        })
        // 3.this._getRegion(4,res[0].id).then(res => {
        //   let areaArr = []
        //   res.forEach(item => {
        //     if (!item.chooseStatus) {
        //       areaArr.push(item.name)
        //     }
        //     multiArray[2] = areaArr
        //     multiIndex[2] = 0
        //   })
        // })
        this.setData({
          multiArray,
          multiIndex
        })
      })
    }
    else if(e.detail.column === 1) {
      // let id = this.data.cityIdArr[e.detail.value]
      this.setData({
        multiArray,
        multiIndex
      })
      // 4.this._getRegion(4, id).then(res => {
      //   let arr = []
      //   res.forEach(item => {
      //     if (!item.chooseStatus) {
      //       arr.push(item.name)
      //     }
      //     multiArray[2] = arr;
      //     multiIndex[2] = 0;
      //     this.setData({
      //       multiArray,
      //       multiIndex
      //     })
      //   })
      // })
    }
  
  },

  //输入姓名
  nameConfirm(e) {
    const val = e.detail.value
    const reg = new RegExp(/^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,15}$/, 'g')
    // const reg = /^([\\u4e00-\\u9fa5]{2,20}|[a-zA-Z\\.\\s]{2,20})$/gi
    if (reg.test(val)) {
      this.setData({
        nameVal: e.detail.value
      })
    }
  },
  //输入手机号码
  phoneConfirm(e) {
    const val = e.detail.value
    const reg = /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/
    if(reg.test(val)) {
      this.setData({
        phone: e.detail.value
      })
    }
  },
  //点击弹出报名成功
  handleSignUp() {
    // this._handleSignStatus()
    const data = {
      region: {
        value: this.data.region,
        msg: "请选择地区"
      },
      sexVal: {
        value: this.data.sexVal,
        msg: "请选择性别"
      },
      nameVal: {
        value: this.data.nameVal,
        msg: "请输入正确的姓名"
      },
      phone: {
        value: this.data.phone,
        msg: "请输入正确的手机号码"
      }
    }
    
    for(let key in data) {
      if(!data[key].value) {
        console.log(data[key])
        wx.showToast({
          title: data[key].msg,
          icon: 'none',
          duration: 1500
        })
        console.log('no')
        return
      }
    }
    const obj = this._getParmas()
    this._signUp(obj)
  },
  _signUp(obj) {
    indexModel.signUp(obj).then(res => {
      if (res.data) {
        this._handleSignStatus()
      } else {
        wx.showToast({
          title: '您已报名成功，请勿重复报名！',
          icon: 'none',
          duration: 1500
        })
      }
    })
  },
  //报名的参数
  _getParmas() {
    return {
      userId: app.globalData.userId,
      type: 2,
      realName: this.data.nameVal,
      phone: this.data.phone,
      sex: this.data.sexVal,
      province: this.data.multiArray[0][this.data.multiIndex[0]],
      city: this.data.multiArray[1][this.data.multiIndex[1]],
      // area: this.data.multiArray[2][this.data.multiIndex[2]] || "",
    }
  },
  //关闭报名弹框
  setSignUpStatus(e) {
    this._handleSignStatus(false)
    this.setData({
      hasSignUp:true
    })
  },
  //报名
  _handleSignStatus(status=true) {
    this.setData({
      signUpStatus: status
    })
  },


})