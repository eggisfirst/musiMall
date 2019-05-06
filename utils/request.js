class Request {
  baseUrl = 'http://10.11.8.207/'

  getData({ url, data = {}, method = "GET" }) {
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.baseUrl + url,
        method: method,
        data: data,
        dataType: 'json',
        responseType: 'text',
        success: res => {
          if (res.data.code == 0) {
            resolve(res)
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




