// work_list.js
let app = getApp();
Page({

  /**
   * 页面的初始数据
   */
  data: {
    dates: '',
    dates_end: '',
    com: '',
    position: '',
    worklist: '',
    userinfo: null,
    xueli: '',
    id: null
  },

  /**
   * 生命周期函数--监听页面加载
   */
  onLoad: function (options) {
    console.info(options)
    this.setData({
      com: options.school,
      position: options.major,
      xueli: options.education,
      id: options.id
    })
    let that = this;
    wx.request({
      url: app.globalData.javahost + '/user/base/get/selfInfo',
      method: 'POST',
      data: {

      },
      header: {
        'content-type': 'application/json',
        'cookie': 'JSESSIONID=' + app.globalData.session
      },
      success: function (res) {
        if (res.data.success) {
          console.info(res.data)
          that.setData({
            userinfo: res.data.data
          })
          // that.setData({
          //   pinlunList: res.data.data
          // })

        }
      }

    })
  },

  /**
   * 生命周期函数--监听页面初次渲染完成
   */
  onReady: function () {

  },

  /**
   * 生命周期函数--监听页面显示
   */
  onShow: function () {

  },

  /**
   * 生命周期函数--监听页面隐藏
   */
  onHide: function () {

  },

  /**
   * 生命周期函数--监听页面卸载
   */
  onUnload: function () {

  },

  /**
   * 页面相关事件处理函数--监听用户下拉动作
   */
  onPullDownRefresh: function () {

  },

  /**
   * 页面上拉触底事件的处理函数
   */
  onReachBottom: function () {

  },

  /**
   * 用户点击右上角分享
   */
  onShareAppMessage: function () {

  },
  /**
   * 日期组件
   */
  bindDateChange: function (e) {
    console.log(e.detail.value)
    this.setData({
      dates: e.detail.value
    })
  },
  bindDateChange_end: function (e) {
    console.log(e.detail.value)
    this.setData({
      dates_end: e.detail.value
    })
  },
  /**
   * 保存
   */

  // 文本框事件
  bindTextAreaBlur: function (e) {
    this.setData({
      worklist: e.detail.value
    })

  },
  formSubmit: function (e) {
    let that = this;
    var com = e.detail.value.com;         //获取input初始值
    var position = e.detail.value.position;         //获取input初始值
    var worklist = e.detail.value.worklist;         //获取input初始值
    var xueli = e.detail.value.xueli;         //获取input初始值
    console.info(com)
    console.info(position)
    console.info(worklist)
    console.info(that.data.dates)
    console.info(that.data.dates_end)
    // var ID_num2 = e.detail.value.ID_num2; 
    // let that = this;
    // console.info(that.data.worklist)
    wx.request({
      url: app.globalData.javahost + '/user/verify/edit/education',
      method: 'POST',
      data: {
        "education": xueli,
        "endTime": that.data.dates_end,
        "experience": worklist,
        "id": that.data.id,
        "major": position,
        "school": com,
        "startTime": that.data.dates
        // "education": "string",
        // "endTime": "2018-01-17T11:46:48.821Z",
        // "experience": "string",
        // "id": that.data.id,
        // "major": "string",
        // "school": "string",
        // "startTime": "2018-01-17T11:46:48.821Z"
      },
      header: {
        'content-type': 'application/json',
        'cookie': 'JSESSIONID=' + app.globalData.session
      },
      success: function (res) {
        if (res.data.success) {
          console.info(res.data)
          // that.setData({
          //   pinlunList: res.data.data
          // })
          wx.navigateTo({
            url: '/pages/mine/detail/detail',
          })
        }
      }

    })
  },
  /**
   * 删除
   */
  del () {
    let that = this;
    
    wx.request({
      url: app.globalData.javahost + '/user/verify/delete/exp',
      method: 'POST',
      data: {
        "userInfoId": that.data.id
      },
      header: {
        'content-type': 'application/json',
        'cookie': 'JSESSIONID=' + app.globalData.session
      },
      success: function (res) {
        if (res.data.success) {
          console.info(res.data)
         
          wx.navigateBack({
            delta: 1
          })
        }
      }

    })
  }
})