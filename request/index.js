import { Request } from '../utils/request'
class IndexModel extends Request {
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
  

  //小程序第二次迭代
  //获取篮球活动报名地区
  getRegionForBasketballActivities(obj) {
    return this.getSecretData({
      url: "v1/api/useraddress/getRegionForBasketballActivities",
      data: obj
    })
  }

  //篮球报名
  signUp(obj) {
    return this.getSecretData({
      url: "v1/api/useraddress/add",
      data: obj
    })
  }
 
 //生成海报
  getPoster(userId) {
   return this.getSecretData({
     url: "v1/api/spactivity/generatePoster",
     data: {
       userId
     }
   })
 }

//领取积分
  authorizationGiveIntegral(userId) {
    return this.getSecretData({
      url: "v1/api/integral/authorizationGiveIntegral",
      data: {
        userId
      }
    })
  }

//判断有没有报名
hasSignUp(userId) {
  return this.getSecretData({
    url: "v1/api/useraddress/getListByUserId",
    data: {
      userId,
      type: 2
    }

  })
}
//玩游戏获得积分
playGame(userId) {
  return this.getSecretData({
    url: "v1/api/spactivity/playGame",
    data: {
      userId
    }
  })
}
//抽奖

//获取用户积分
getUserIntegral(userId) {
  return this.getSecretData({
    url: "v1/api/integral/getUserIntegral",
    data: {
      userId
    }
  })
}

//获取九宫格奖项
getPrizeList(userId) {
  return this.getSecretData({
    url: "v1/api/spactivity/getPrizeList",
    data: {
      userId
    }
  })
}

//抽奖
luckDraw(userId) {
  return this.getSecretData({
    url: "v1/api/prizewinning/luckDraw",
    data: {
      userId
    }
  })
}

//获取中奖记录
getPrizeWinningList(page,userId) {
  return this.getSecretData({
    url: "v1/api/prizewinning/getPrizeWinningList",
    data: {
      userId,
      winning: 1,
      page: page,
      limit: 10
    }
  })
}

//获取其他活动以及状态
getOtherActivity(userId) {
  return this.getSecretData({
    url: "v1/api/spactivity/getOtherActivity",
    data: {
      userId
    }
  })
}


}

export { IndexModel }