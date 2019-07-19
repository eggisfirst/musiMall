// pages/basketSignUp/basketSignUp.js
Page({
  data: {
    signUpStatus: false,
    pickerStatus: false,
    sex: "性别",
    areaStatus: false,
    value: [0,0,0],
    sexValue: [0]
  },
  onReady: function () {

  },
  //选择地区
  handleSelectArea() {
    console.log('selectarea')
    this._handleAreaPicker(true)
  },
  //关闭地区选择器
  setPickerArea() {
    console.log(123132)
    this._handleAreaPicker()
    // this.setData({
    //   value: [0, 2, 3]
    // })
  },
  //打开性别选择框
  handleSelectSex() {
    console.log('select sex')
    this._handleClickPicker(true)
  },
  //关闭性别选择框
  setPickerStatus(e) {
    this._handleClickPicker()
    if (e.detail.type === 'comfirm' && e.detail.val) {
      this.setData({
        sex: e.detail.val,
        sexValue: e.detail.activeIndex
      })
    }
  },
  //点击弹出报名成功
  handleSignUp() {
    this.setData({
      signUpStatus: true
    })
  },
  //关闭报名弹框
  setSignUpStatus(e) {
    console.log(e.detail.signUpStatus)
    this.setData({
      signUpStatus: false
    })
  },
  //
  _handleClickPicker(status = false) {
    this.setData({
      pickerStatus: status
    })
  },
  _handleAreaPicker(status = false) {
    this.setData({
      areaStatus: status
    })
  }
})