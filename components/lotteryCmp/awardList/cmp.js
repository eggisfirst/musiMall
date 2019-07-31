// components/lotteryCmp/awardList/cmp.js
// components/lotteryCmp/formCmp/cmp.js
import { IndexModel } from '../../../request/index.js'
const indexModel = new IndexModel()
const app = getApp()

Component({
  properties: {
    getList: {
      type: Boolean,
      observer() {
        this.setData({
          awardList: []
        })
        this.getPrizeWinningList(1)
      }
    }
  },
  data: {
    awardList: [],
    status: false,
    currentPage: 1
  },
  ready() {
    // this.getPrizeWinningList(1)
  },
  methods: {
    getPrizeWinningList(page) {
      this._setLoadMoreStatus(false)
      const userId = app.globalData.userId
      indexModel.getPrizeWinningList(page).then(res => {
        if(res.status) {
          if(res.data.totalPage > res.data.currPage){
            this._setLoadMoreStatus(true)
          }
          const list = [...this.data.awardList,...res.data.list]
          this.setData({
            awardList: list,
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
    _setLoadMoreStatus(status) {
      this.setData({
        status: status
      })
    }
  }
})
