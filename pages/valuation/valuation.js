
const app = getApp();
Page({
    data: {
        saleregion: ["", "", "武汉市"],
        regregion: ["", "", "武汉市"],
        time: "请选择上牌时间",
        array: ["美国", "中国", "巴西", "日本"],
        index:0
    },

    bindRegionChangeSaleCity: function(e) {
        this.setData({ saleregion: e.detail.value });
    },
    bindRegionChangeRegCity: function(e) {
        this.setData({ regregion: e.detail.value });
    },
    bindDateChange: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value);
        this.setData({
            time: e.detail.value
        });
    },
    bindPickerChange: function(e) {
        console.log("picker发送选择改变，携带值为", e.detail.value);
        this.setData({
            index: e.detail.value
        });
    }
});
