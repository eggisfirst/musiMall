// components/homeCmp/hasSignUp/cmp.js
Component({
  /**
   * 组件的属性列表
   */
  properties: {
    posterBtn:Boolean,
  },

  /**
   * 组件的初始数据
   */
  data: {

  },

  /**
   * 组件的方法列表
   */
  methods: {
    handlePosterBtn() {
      this.triggerEvent("setPosterBtn",true)
    }
  }
})
