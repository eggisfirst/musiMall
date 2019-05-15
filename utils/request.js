class Request {
  // baseUrl = 'http://10.11.8.228:8088/'
  baseUrl = 'https://mobiletest.derucci.net/consumer-admin/'

  getData({ url, data = {}, method = "post" }) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.baseUrl + url,
        method: method,
        data: data,
        header: method == 'post'? { 'content-type': 'application/x-www-form-urlencoded' } : {},
        dataType: 'json',
        responseType: 'text',
        success: res => {
          wx.showLoading({
            title: '加载中',
            mask: true,
          })
          if (res.data) {
            wx.hideLoading()
            resolve(res.data)
          }
        },
        fail: err => {
          reject(err)
          this._showError()
        }
      })
    })
  }

  _showError() {
    wx.showToast({
      title: '请求错误',
      icon: 'none'
    })
  }
}

export { Request }




