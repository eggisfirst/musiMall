import {format} from '../../utils/index.js'
Component({
  properties: {
    productType: {
      type: Object,
      value:{},
      observer(newVal) {
        if(newVal) {
          this.initPercent(newVal)
          this.initStartTime(newVal)
        }
      }
    }
  },
  data: {
    progressWidth: 0
  },
  ready() {
    // console.log(this.properties.current)
  },
  methods: {
    //初始进度条的长度
    initPercent(newVal) {
      let percent;
      if (newVal.stock == newVal.onsaleStock) {
        percent = 0
      } else {
        percent = (((newVal.stock - newVal.onsaleStock) / newVal.stock) *100).toFixed(2)
      }
      this.setData({
        progressWidth: percent * 490,
        percent: percent
      })
    },
    //初始活动即将开始时间
    initStartTime(newVal) {
      let time = format(Number(newVal.startTime))
      this.setData({
        time
      })
    },
    timeTo(e) {
      if (e.detail.timeTo) {
        this.triggerEvent('timeTo', {timeTo: true})
      }
    }
  }
})
