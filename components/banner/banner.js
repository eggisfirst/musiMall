Component({
  /**
   * 组件的属性列表
   */
  properties: {
    imgUrls: {
      type: Array,
      value: [{
        img:'https://images.unsplash.com/photo-1551334787-21e6bd3ab135?w=640'
      },{
        img:'https://images.unsplash.com/photo-1551214012-84f95e060dee?w=640',
      }
      ]
    },
    swiperType: {
      type: Object,
      value: ''
    }
  },
  data: {

  },
  methods: {
    // setImg() {
    //   wx.previewImage({
    //     current: this.properties.imgUrls[0].img, // 当前显示图片的http链接
    //     urls: this.properties.imgUrls // 需要预览的图片http链接列表
    //   })
    // },
  }
})