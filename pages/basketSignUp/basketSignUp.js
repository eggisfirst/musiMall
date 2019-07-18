// pages/basketSignUp/basketSignUp.js
Page({
  data: {
    list: [
      {
        text: "选择您的所在地区",
        select: true
      },
      {
        text: "性别",
        select: true
      },
      {
        text: "请输入您的姓名",
        select: false
      },
      {
        text: "请输入您的个人手机号",
        select: false
      },
    ],
    signUpStatus: false
  },
  onReady: function () {

  },
  //点击弹出报名成功
  handleSignUp() {
    this.setData({
      signUpStatus: true
    })
  },
  //弹框的状态
  setSignUpStatus(e) {
    console.log(e.detail.signUpStatus)
    this.setData({
      signUpStatus: false
    })
  }
})