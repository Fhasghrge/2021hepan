import {
  login,
  request,
  setStorageSync,
  getStorageSync
} from "@tarojs/taro";

const HOST = 'https://starstudio.uestc.edu.cn/kb/qshpchoujiang-776/production'

const getURL = (path) => (HOST + path)

// path
export function myRequest(config) {
  return new Promise((resolve, reject) => {
    request({
      url: getURL(config.path),
      method: 'GET',
      header: {
        Cookie: getStorageSync('Set-Cookie').split(';')[0]
      },
      success: resolve,
      fail: reject,
      ...config
    })
  })
}

export function Login(){
  return new Promise((resolve, reject) => {
    login({
      success: function ({code, errMsg} ) {
        if (code) {
          request({
            url: getURL('/WXlogin1'),
            method: 'POST',
            data: {
              code
            },
            success: (res) => {
              if (res.header['Set-Cookie'] != '') {
                setStorageSync('Set-Cookie', res.header['Set-Cookie'])
              }
              resolve(res)
            }
          })
        } else {
          console.log('登录失败！' + errMsg)
        }
      },
      fail: reject
    })

  })
}

export function getQrCode(place) {
  return new Promise((resolve, reject) => {
    request({
      url: getURL('/GiftQRcode'),
      method: 'GET',
      header: {
        cookie: getStorageSync('Set-Cookie')
      },
      data: {
        place
      },
      success: resolve,
      fail: reject
    })
  })
}

export function getTimes(token) {
  return new Promise((resolve, reject) => {
    request({
      url: getURL('/User/GetTheTimes'),
      method: 'POST',
      header: {
        cookie: getStorageSync('Set-Cookie')
      },
      data: {
        token
      },
      success: resolve,
      fail: reject
    })
  })
}

export function getMyTime() {
  return new Promise((resolve, reject) => {
    request({
      url: getURL('/User/ChouTimes'),
      method: 'GET',
      header: {
        cookie: getStorageSync('Set-Cookie')
      },
      success: resolve,
      fail: reject
    })
  })
}

export function getFra() {
  return myRequest({
    path: '/User/GetTheFra'
  })
}

export function getMyFraList() {
  return myRequest({
    path: '/User/GetMyFra'
  })
}

export function getRevealTime() {
  return myRequest({
    path: '/GiftTime'
  })
}

export function getAwardInfo() {
  return myRequest({
    path: '/User/gift'
  })
}

export function participate(picurl, nickname) {
  return myRequest({
    path: '/User/ComeToDraw',
    method: 'POST',
    data: {
      picurl,
      nickname
    }
  })
}

export function hasParticipate() {
  return myRequest({
    path: '/User/EverDraw'
  })
}

export function subInfo(data) {
  return myRequest({
    path: '/User/GiftInform',
    method: 'POST',
    data
  })
}
