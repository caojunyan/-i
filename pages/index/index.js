//index.js
//获取应用实例
const app = getApp();

Page({
    data: {
        imgUrls: [],
        indicatorDots: false,
        autoplay: false,
        interval: 5000,
        duration: 1000,
        loading: true,
        usedList: [],
        page: 1
    },
    onLoad: function(params) {
        var _this = this;
        // banner https://api.miaoche168.com/api/home/wx/banner
        wx.request({
            url: "https://api.miaoche168.com/api/home/wx/banner", //仅为示例，并非真实的接口地址
            header: {
                "content-type": "application/json" // 默认值
            },
            success: function(res) {
                let imgUrl = [];
                for (let i = 0; i < res.data.data.length; i++) {
                    imgUrl.push(
                        "https://api.miaoche168.com/" + res.data.data[i].url
                    );
                }
                _this.setData({
                    imgUrls: imgUrl
                });
            }
        });
        //首页列表（二手车） https://api.miaoche168.com/api/home/cars/used
        wx.request({
            url:
                "https://api.miaoche168.com/api/home/cars/used?include=images,basic&page=" +
                1, //仅为示例，并非真实的接口地址
            header: {
                "content-type": "application/json" // 默认值
            },
            success: function(res) {
                _this.setData({
                    usedList: res.data.data
                });
            }
        });
    },

    onPullDownRefresh: function() {},

    /**
     * 页面上拉触底事件的处理函数
     */
    onReachBottom: function() {
        var that = this;
        // 显示加载图标
        wx.showLoading({
            title: "玩命加载中~~!"
        });
        // 页数+1
        var page = ++this.data.page;
        wx.request({
            url:
                "https://api.miaoche168.com/api/home/cars/used?include=images,basic&page=" +
                page,
            method: "GET",
            // 请求头部
            header: {
                "content-type": "application/text"
            },
            success: function(res) {
                // 回调函数
                var moment_list = that.data.usedList;
                for (var i = 0; i < res.data.data.length; i++) {
                    moment_list.push(res.data.data[i]);
                }
                // 设置数据
                that.setData({ usedList: that.data.usedList });
                // 隐藏加载框
                wx.hideLoading();
            }
        });
    },
    // 拨打电话
    calling: function() {
        wx.makePhoneCall({
            phoneNumber: "000",
            success: function() {
                console.log("拨打电话成功！");
            },
            fail: function() {
                console.log("拨打电话失败！");
            }
        });
    }
});
