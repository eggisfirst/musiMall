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
  //获取openid
  getOpenId(code) {
    return this.getData({
      url: 'smallprogram/userInfo/getOpenId',
      data: {
        code
      }
    })
  }
  //验证客户绑定
  decodeUserInfo(obj) {
    return this.getData({
      url: 'smallprogram/userInfo/decodeUserInfo',
      data: obj
    })
  }
  //后台手机绑定
  getPhoneNumber(obj) {
    return this.getData({
      url: 'smallprogram/userInfo/getPhoneNumber',
      data: obj
    })
  }
  //绑定手机号
  wxRegister(phone, id) {
    return this.getData({
      url: 'smallprogram/userInfo/wxRegister',
      data: {
        mobileNumber: phone,
        openId: id
      }
    })
  }
  //查询用户信息
  getUserInfoByMap(id) {
    return this.getData({
      url: 'smallprogram/userInfo/getUserInfoByMap',
      data: {
        openId: id
      }
    })
  }
  //活动首页轮播图
  getAdvertisement() {
    return this.getData({
      url: 'smallprogram/getAdvertisement'
    })
  }
  //订单列表
  getOrderList(phone,status,page) {
    return this.getData({
      url: 'smallprogram/getOrder',
      data: {
        userMobileNumber: phone,
        orderState: status,
        page: page,
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
  getArtivityProductList(status,page) {
    return this.getData({
      url: 'smallprogram/getSecKill',
      data: {
        activityState: status,
        page: page,
        limit: 10
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
  //提交订单
  comfirmOrder(phone,id,num) {
    return this.getData({
      url: 'smallprogram/saveOrderAndDetails',
      data: {
        userMobileNumber: phone,
        activityId: id,
        quantity: num
      }
    })
  }
  //取消订单
  cancleOrder(number) {
    return this.getData({
      url: 'smallprogram/closeOrder',
      data: {
        orderNumber:number
      }
    })
  }
  //支付
  orderPay(obj) {
    return this.getData({
      url: 'smallprogram/pushOrder',
      data: obj
    })
  }
}

export { IndexModel }