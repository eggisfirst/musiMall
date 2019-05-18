Component({
  properties: {
    endTime: {
      type: String,
      value: '',
      observer(newVal){
        // this.activityCountTime(newVal)
        // this.getMySec(newVal)
        // this.time(newVal)
      }
    },
    startTime: String,
    defaultCancelTime:{
      type: Number,
      value: 0,
      observer(newVal){
        this.countTime(newVal)
      }
    },
    status: {
      type: String,
      value: '',
      observer(newVal) {
        if (newVal == 1) {
          this.time(this.properties.endTime)
        }else if(newVal == 0) {
          this.time(this.properties.startTime)
        }
      }
    }
  },
  data: {
    seconds: 0,
    minute: 0,
    hour: 0,
    key: true
  },
  ready() {
  },
  methods: {
    //倒计时  当开始时间大于等于现在的时间，开始倒计时。
    time(newVal) {
      var subStr = new RegExp('-','g');  //全局匹配/
      newVal = newVal.replace(subStr, "/");//把'-'替换为空字符串
      let endTime = new Date(newVal).getTime() + 1000;
      // console.log(endTime)
      let interval = null;
      let remainingTime = endTime - Date.now(); // 剩余毫秒
      let day = Math.floor(remainingTime / 1000 / 60 / 60 / 24)
      let hour = Math.floor(remainingTime / 1000 / 60 / 60 % 24) + day*24
      let minute = Math.floor(remainingTime / 1000 / 60 % 60)
      let seconds = Math.floor(remainingTime / 1000 % 60)
      interval = setInterval(() => {
        // console.log(123, remainingTime)
        if (remainingTime >= 0) {
          if (hour > 0 && minute > 0 && seconds > 0) {
            seconds -=1
          }else if(hour > 0 && minute > 0 && seconds <= 0) {
            seconds = 59
            minute -=1
          }else if(hour > 0 && minute <= 0 && seconds <= 0) {
            seconds = 59 
            minute = 59
            hour -=1
          }else if(hour <= 0 && minute > 0 && seconds <= 0) {
            seconds = 59
            minute -= 1
            hour = 0
          } else if (hour <= 0 && minute <= 0 && seconds <= 0){
            hour = 0
            minute = 0 
            seconds = 0
            clearInterval(interval);
          }else {
            seconds -=1
          }
          this.setData({
            seconds,
            minute,
            hour
          })
          // console.log(seconds,minute,hour)
        } else {
          clearInterval(interval);
          // this.timeTo()
        }
      }, 1000);
    },
    //支付倒计时
    countTime(newVal) {
      let time = newVal
      let interval = null,
          minute = Math.floor(time/60),
          seconds = time%60;
          console.log(minute, seconds)
      interval = setInterval(() => {
        if (minute <= 0 && seconds <= 0) {
          seconds = 0
          minute = 0
          clearInterval(interval);
          this.triggerEvent('timeTo', { timeTo: true })
          // console.log(0)          
        } else if (minute >0 && seconds > 0) {
          seconds -= 1
        } else if(minute <= 0 && seconds > 0){
          seconds -= 1
        } else if (minute > 0 && seconds <= 0){
          minute -= 1;
          seconds = 59
        }
        this.setData({
          minute,
          seconds,
          hour: -1
        })
      },1000)
    },
    //倒计时完成
    timeTo() {
      this.triggerEvent('timeTo', { timeTo: true })
    }
  }
})
