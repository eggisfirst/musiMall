// components/count/comp.js
Component({
  properties: {
    endTime: {
      type: String,
      value: '',
      observer(newVal){
        // this.time(newVal)
      }
    },
    startTime: String,
    defaultCancelTime:{
      type: Number,
      value: 0,
      observer(newVal){
        // this.countTime(newVal)
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
      interval = setInterval(() => {
        let remainingTime = endTime - Date.now(); // 剩余毫秒
        // console.log(123, remainingTime)
        if (remainingTime >= 0) {
          this.setData({
            day: Math.floor(remainingTime / 1000 / 60 / 60 / 24),
            hour: Math.floor(remainingTime / 1000 / 60 / 60 % 24) + Math.floor(remainingTime / 1000 / 60 / 60),
            minute: Math.floor(remainingTime / 1000 / 60 % 60),
            seconds: Math.floor(remainingTime / 1000 % 60)
          })
        } else {
          clearInterval(interval);
          this.triggerEvent('timeTo',{timeTo: true})
        }
      }, 0);
    },
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
