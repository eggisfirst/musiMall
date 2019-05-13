import {format} from '../../utils/index.js'
Component({
  properties: {
    productType: {
      type: Object,
      value:{},
      observer(newVal) {
        this.initPercent(newVal)
        this.initStartTime(newVal)
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
    initPercent(newVal) {
      let percent;
      if (newVal.stock == newVal.onsaleStock) {
        percent = 0
      } else {
        percent = ((newVal.stock - newVal.onsaleStock) / newVal.stock).toFixed()
      }
      this.setData({
        progressWidth: percent * 490,
        percent: percent * 100
      })
    },
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
