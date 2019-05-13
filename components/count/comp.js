// components/count/comp.js
Component({
  properties: {
    endTime: String,
    startTime: String
  },
  data: {
    
  },
  ready() {
    // this.time()
  },
  methods: {
    //倒计时  当开始时间大于等于现在的时间，开始倒计时。
    time() {
      // let endTime = new Date('2019/05/13 13:13:10').getTime() + 1000;
      let endTime = this.properties.endTime*1000
      let interval = null;
      interval = setInterval(() => {
        let remainingTime = endTime - Date.now(); // 剩余毫秒
        // console.log(123, remainingTime)
        if (remainingTime >= 0) {
          this.setData({
            day: Math.floor(remainingTime / 1000 / 60 / 60 / 24),
            hour: Math.floor(remainingTime / 1000 / 60 / 60 % 24),
            minute: Math.floor(remainingTime / 1000 / 60 % 60),
            seconds: Math.floor(remainingTime / 1000 % 60)
          })
        } else {
          clearInterval(interval);
          this.triggerEvent('timeTo',{timeTo: true})
        }
      }, 0);
    },
    countTime() {
      let time = 1 - 1
      let interval = null,
          minute = time,
          seconds = 60;
      interval = setInterval(() => {
        if(seconds <= 0) {
          time -= 1;
          minute = time;
          seconds = 59
        }else {
          seconds -= 1;
          minute = time
        }
        if (time >= 0) {
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
