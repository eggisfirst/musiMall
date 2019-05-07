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

  /**
   * 组件的初始数据
   */
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

  }
})