import { Request } from '../utils/request'

class IndexModel extends Request {
  // getTitleList(value) {
  //   return this.getData({
  //     url: 'api/voteInfo/list',
  //     data: {
  //       title: value
  //     }
  //   })
  // }
  //活动首页轮播图
  getAdvertisement() {
    return this.getData({
      url: 'smallprogram/getAdvertisement'
    })
  }
  //订单列表
  getOrderList(status) {
    return this.getData({
      url: 'smallprogram/getOrder',
      data: {
        'userMobileNumber': '15626199257',
        'orderState': status,
        page: 1,
        limit: 10
      }
    })
  }
  //订单详情
  getOrderDetails(number) {
    return this.getData({
      url: 'smallprogram/getOrderDetailsListByOrderNuber',
      data: {
        orderNumber: number
      }
    })
  }
  //获取活动商品列表  -1全部 0未开始 1进行中 2结束
  getArtivityProductList(status) {
    return this.getData({
      url: 'smallprogram/getSecKill',
      data: {
        activityState: status
      }
    })
  }
  //获取活动商品详情
  getArtivityProductDetails(id) {
    return this.getData({
      url: 'smallprogram/getSecKillAndProductByID',
      data: {
        id: id
      }
    })
  }
}

export { IndexModel }