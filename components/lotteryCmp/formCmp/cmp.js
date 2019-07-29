// components/lotteryCmp/formCmp/cmp.js
Component({
  properties: {
    formStatus: {
      type:Boolean,
      observer(newval) {
        this.setComfirm()
      }
    }
  },
  data: {
    formData: [{key:'name',value: ""},{key:'phone',value:""},{key:"address",value:""}],
    error: {
      name: false,
      phone: false,
      address: false,
      text: ""
    }
  },
  methods: {
    //获取输入框的值
    getVal(e) {
      if(e.currentTarget.dataset.input === 'name') {
        this._getval(0,e.detail.value)
      }else if(e.currentTarget.dataset.input === 'phone') {
        this._getval(1,e.detail.value)
      }else if(e.currentTarget.dataset.input === 'address') {
        this._getval(2,e.detail.value)
      }
    },
    _getval(index,value) {
      let arr = this.data.formData
      arr[index].value = value
      this.setData({
        formData:arr
      })
    },
    //验证表单
    verifyForm() {
      const data = this.data.formData
      for(const itemData of data) {
        const errorMsg = this.verifyRules(itemData)
        if(errorMsg) {
          return {errorMsg,key:itemData['key']}
        }
      }
    },
    //验证规则
    verifyRules(data) {
      const config =  {
        errorClass: "error",
        rules: {
            name: [
                { rule: "required", message: "请输入姓名" },
                { rule: /^[\u4E00-\u9FA5\uf900-\ufa2d·s]{2,15}$/, message: "姓名必须是2-15位中文字符" },
            ],
            phone: [
                { rule: "required", message: "请输入联系电话" },
                { rule:  /(^1[3|4|5|7|8]\d{9}$)|(^09\d{8}$)/, message: "电话格式错误，请重新输入" },
            ],
            address: [
                { rule: "required", message: "请输入确认地址" },
                { rule: /^[\S]{5,50}$/, message: "地址必须是5-50位字符" },
            ],
        }
      }
      const rules = config.rules[data.key]
      for(const rule of rules) {
        if (rule.rule === "required") {
          if (!data.value) {
              return rule.message;
          }
        }
        else{
          if (!rule.rule.test(data.value)) {
              return rule.message;
          }
        }
      }
    },
    //显示错误信息//提交
    setComfirm() {
      const error = this.verifyForm()
      const errorData = {
        name: false,
        phone: false,
        address: false,
        text: ""
      }
      if(error) {
        this.setErrorMsg(errorData,error)
      }else {
        this.setData({
          error: errorData
        })
        //请求
        console.log('comfirm')
      }
    },
    setErrorMsg(errorData,error) {
      for(let key in errorData) {
        if(error.key === key) {
          errorData[key] = true
          errorData.text = error.errorMsg
          this.setData({
            error: errorData
          })
          this.triggerEvent("resetFormStatus",{status: false})
          return
        }
      }
    }
  }
})
