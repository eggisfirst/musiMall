// components/homeCmp/rules/cmp.js
Component({
  properties: {
  },
  data: {
  },
  ready() {

  },
  // 生命周期函数，可以为函数，或一个在methods段中定义的方法名
  methods: {
    closeTips() {
      this.triggerEvent('setRulesTips', false);
    }
  }
})