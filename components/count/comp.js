Component({
  properties: {
    endTime: {
      type: String,
      value: '15889990022',
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
    
  },
  ready() {
  },
  methods: {
    //倒计时  当开始时间大于等于现在的时间，开始倒计时。
    time(newVal) {
      // let endTime = new Date('2019/05/13 13:13:10').getTime() + 1000;
      let endTime = newVal*1000
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
          }else if(hour <= 0 && minute <= 0 && seconds <= 0) {
            seconds = 59
            minute = 59
            hour = 0
          }else {
            seconds -= 1
          }
          this.setData({
            seconds,
            minute,
            hour
          })
          // console.log(seconds,minute,hour)
        } else {
          clearInterval(interval);
          this.triggerEvent('timeTo',{timeTo: true})
        }
      }, 1000);
    },
    //支付倒计时
    countTime(newVal) {
      let time = newVal
      let interval = null,
          minute = Math.floor(time/60),
          seconds = time%60;
      interval = setInterval(() => {
        if(seconds <= 0) {
          minute -= 1;
          seconds = 59
        }else {
          seconds -= 1;
        }
        if (minute >= 0) {
          this.setData({
            minute,
            seconds
          })
        }else {
          clearInterval(interval);
        }
      },1000)
    }
  }
})
