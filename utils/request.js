class Request {
  // baseUrl = 'http://10.11.8.228:8088/'
  baseUrl = 'https://mobiletest.derucci.net/consumer-admin/'
  // baseUrl = 'https://op.derucci.com/'
  // baseUrl = 'https://qiang.derucci.com/'

  refreshToken = ''
  getData({ url, data = {}, method = "post" }) {
    return new Promise((resolve, reject) => {
      // wx.showLoading({
      //   title: '加载中',
      //   mask: true
      // })
      wx.request({
        url: this.baseUrl + url,
        method: method,
        data: data,
        header: method == 'post'? { 'content-type': 'application/x-www-form-urlencoded' } : {},
        dataType: 'json',
        responseType: 'text',
        success: res => {
          if (res.data) {
            // wx.hideLoading()
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
  //有token
  getSecretData({ url, data = {}}) {
    return new Promise((resolve, reject) => {
      this._getToken().then(res => {
        if (res.access_token) {
          wx.setStorage({
            key: "token",
            data: res.refresh_token
          })

          wx.request({
            url: this.baseUrl + url,
            method: "post",
            data: data,
            header: {
              'content-type': 'application/x-www-form-urlencoded',
              "Authorization": `Bearer ${res.access_token}`,
              // 'sign': sign
            },
            dataType: 'json',
            responseType: 'text',
            success: res => {
              if (res.data) {
                resolve(res.data)
              }
            },
            fail: err => {
              reject(err)
              this._showError()
            }
          })
        }else {
          this._refreshToken().then(res => {
            if (res.access_token) {
              this.getSecretData()
            }
          })
        }
      })
    })
  }

_getToken() {
  return new Promise((resolve, reject) => {
    wx.request({
      url: this.baseUrl + "/oauth/token",
      method: "POST",
      data: {
        grant_type: 'client_credentials',
        client_id: '20190425670723',
        client_secret: '5964cf66364926afa2bf8523730465g8'
      },
      header: { 'content-type': 'application/x-www-form-urlencoded' },
      dataType: 'json',
      responseType: 'text',
      success: res => {
        if(res.data) {
          resolve(res.data)
        }
      },
      fail: err => {
        reject(err)
      }
    })
  })
  
}

  _refreshToken() {
    wx.getStorage({
      key: 'token',
      success(res) {
        this.refreshToken = res.data
      }
    })
    return new Promise((resolve, reject) => {
      wx.request({
        url: this.baseUrl + "/oauth/token",
        method: "POST",
        data: {
          grant_type: 'refresh_token',
          refresh_token: this.refreshToken,
        },
        header: { 'content-type': 'application/x-www-form-urlencoded' },
        dataType: 'json',
        responseType: 'text',
        success: res => {
          if (res.data) {
            resolve(res.data)
          }
        },
        fail: err => {
          reject(err)
        }
      })
    })
}

  _showError() {
    wx.showToast({
      title: '网络异常',
      icon: 'none'
    })
  }
}

export { Request }




