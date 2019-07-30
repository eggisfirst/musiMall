// components/lotteryCmp/recordBox/cmp.js
import { IndexModel } from '../../../request/index.js'
const indexModel = new IndexModel()
const app = getApp()
Component({
  /**
   * 组件的属性列表
   */
  properties: {

  },

  /**
   * 组件的初始数据
   */
  data: {
    recordList: [],
    status: false,
    currentPage: 1
  },
  ready() {
    this.getPrizeWinningList(1)
  },
  methods: {
    //请求中奖记录
    getPrizeWinningList(page) {
      this._setLoadMoreStatus(false)
      const userId = app.globalData.userId
      indexModel.getPrizeWinningList(page,userId).then(res => {
        if(res.status) {
          if(res.data.totalPage > res.data.currPage){
            this._setLoadMoreStatus(true)
          }
          const list = [...this.data.recordList,...res.data.list]
          this.setData({
            recordList: list,
            currentPage: res.data.currPage
          })
        }
      })
    },
    //触底加载数据
    bindscrolltolower() {
      if(this.data.status) {
        const page = this.data.currentPage + 1
        this.getPrizeWinningList(page)
      }
    },
    handleCloseBtn() {
      this.triggerEvent("setShowRecord",true)
    },
    _setLoadMoreStatus(status) {
      this.setData({
        status: status
      })
    }
  }
})
