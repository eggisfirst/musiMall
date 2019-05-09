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
        userMobileNumber: '18392001478',
        status: status
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
}

export { IndexModel }