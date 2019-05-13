class Request {
  baseUrl = 'http://10.11.8.228:8088/'

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
          if (res.data.code == 0) {
            resolve(res.data)
          } else {
            this._showError()
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




