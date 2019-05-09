Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgUrls: {
      type: Array,
      value: [
        'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640',
        'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
        'https://images.unsplash.com/photo-1551446591-142875a901a1?w=640'
      ]
    },
    swiperType: {
      type: Object,
      value: ''
    }
  },
  data: {
    // indicatorDots: true,
    // indicatorCcolor: "rgba(54,54,54,0.2)",
    // indicatorActiveColor: 'rgba(54,54,54,0.6)',
    // autoplay: true,
    // interval: 3000,
    // duration: 1000,
    // circular: true
  },
  /**
   * 组件的方法列表
   */
  methods: {
    setImg() {
      // wx.previewImage({
      //   current: this.properties.imgUrls[0], // 当前显示图片的http链接
      //   urls: this.properties.imgUrls // 需要预览的图片http链接列表
      // })
    },
  }
})