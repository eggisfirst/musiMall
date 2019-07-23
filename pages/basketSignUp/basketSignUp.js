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
    multiIndex: [0, 0, 0],
    showRegion: false,
    showSex: false,
    region: '',
    sexVal: "",
    phone:"",
    nameVal:""
    
  },
  onLoad() {
    this.initAreaArr()
  },
  //分享
  onShareAppMessage:(res) => {
    if (res.from === 'button') {
      console.log(res.target)
    }
    return {
      title: '一起为慕思篮球王全国挑战赛打Call>>点击参与',
      path: '/page/basketSigbUp/basketSigbUp',
      imageUrl: "https://mobiletest.derucci.net/web/musiMall/images/basketball/poster.png",
      success:() => {
        wx.showToast({
          title: '成功',
          icon: 'success',
          duration: 2000
        })

      }
    }
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
  //选择地区
  bindMultiPickerChange (e) {
    console.log('picker发送选择改变，携带值为', e.detail.value)
    const region = this.data.multiArray[0][0] + this.data.multiArray[1][0] + (this.data.multiArray[2][0] || "")
    this.setData({
      region,
      showRegion: true
    })
  },
  //初始地区选择框
  initAreaArr() {
    let multiArray = this.data.multiArray
    this._getRegion(2).then(res => {
      let provinceArr = [],
          provinceIdArr = []
      res.forEach(item => {
        if (item.chooseStatus) {
          provinceArr.push(item.name)
          provinceIdArr.push(item.id)
        }
      })
      const id = provinceIdArr[0]
      this._getRegion(3 ,id).then(res => {
        let cityArr = []
        res.forEach(item => {
          if (item.chooseStatus) {
            cityArr.push(item.name)
          }
        })
        const cityId = res[0].id
        this._getRegion(4, cityId).then(res => {
          console.log(res)
          let areaArr = []
          res.forEach(item => {
            if (item.chooseStatus) {
              areaArr.push(item.name)
            }
          })
          multiArray[0] = provinceArr
          multiArray[1] = cityArr
          multiArray[2] = areaArr
          this.setData({
            multiArray,
            provinceIdArr
          })
        })
      })
    })
  },
  //获取地区
  _getRegion(type,id) {
    return new Promise((resolve, reject) => {
      indexModel.getRegionForBasketballActivities(type,id).then(res => {
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
          if (item.chooseStatus) {
            arr.push(item.name)
          }
          multiArray[1] = arr
          multiIndex[1] = 0;
        })
        this._getRegion(4,res[0].id).then(res => {
          let areaArr = []
          res.forEach(item => {
            if (item.chooseStatus) {
              areaArr.push(item.name)
            }
            multiArray[2] = areaArr
            multiIndex[2] = 0
          })
        })
        this.setData({
          multiArray,
          multiIndex
        })
      })
    }
    else if(e.detail.column === 1) {
      let id = this.data.cityIdArr[e.detail.value]
      this._getRegion(4, id).then(res => {
        let arr = []
        res.forEach(item => {
          if (item.chooseStatus) {
            arr.push(item.name)
          }
          multiArray[2] = arr;
          multiIndex[2] = 0;
          this.setData({
            multiArray,
            multiIndex
          })
        })
      })
    }
  
  },

  //输入姓名
  nameConfirm(e) {
    this.setData({
      nameVal: e.detail.value
    })
  },
  //输入手机号码
  phoneConfirm(e) {
    const val = e.detail.value
    const reg = new RegExp(/^1[3|4|5|8][0-9]\d{4,8}$/,'g')
    if(!reg.test(val)) {
      this.setData({
        phone: ""
      })
      wx.showToast({
        title: '请输入正确的手机号码',
        icon: 'none',
        duration: 1500
      })
    }else {
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
        msg: "请输入姓名"
      },
      phone: {
        value: this.data.phone,
        msg: "请输入手机号码"
      }
    }
    for(let key in data) {
      if(!data[key].value) {
        wx.showToast({
          title: data[key].msg,
          icon: 'none',
          duration: 1500
        })
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
          title: res.msg,
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
      area: this.data.multiArray[2][this.data.multiIndex[2]] || "",
    }
  },
  //关闭报名弹框
  setSignUpStatus(e) {
    this._handleSignStatus(false)
  },
  //报名
  _handleSignStatus(status=true) {
    this.setData({
      signUpStatus: status
    })
  },


})