var Lazy = function(params) {
  var t = this
  t.options = {
    threshold: 200,
    delay: 250,
    placeholder:
      'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC',
    class: 'lazy'
  }
  for (var i in t.options) {
    if (params.hasOwnProperty(i)) {
      // 防止默认参数变成undefined
      t.options[i] = params[i]
    }
  }
  var nav = navigator
  var isTouchPad = /hp-tablet/gi.test(navigator.appVersion)
  var hasTouch = 'ontouchstart' in window && !isTouchPad
  var vendor = /webkit/i.test(nav.appVersion)
    ? 'webkit'
    : /firefox/i.test(nav.userAgent)
    ? 'Moz'
    : 'opera' in window
    ? 'O'
    : /MSIE/i.test(nav.userAgent)
    ? 'ms'
    : ''
  var TRANSITIONEND_EV = 'webkitTransitionEnd'
  if (vendor === 'Moz') {
    TRANSITIONEND_EV = 'transitionend'
  } else {
    if (vendor === 'O') {
      TRANSITIONEND_EV = 'oTransitionEnd'
    } else {
      if (vendor === 'ms') {
        TRANSITIONEND_EV = 'MSTransitionEnd'
      }
    }
  }
  //将nodelist转换成array
  var imgs = Array.prototype.slice.call(
    document.querySelectorAll('.' + t.options.class)
  )
  // var imgs = document.querySelectorAll('.' + t.options.class)
  function elements() {
    return document.querySelectorAll("[data-loaded='0']")
  }
  console.log(params, t.options)
  Lazy.prototype = {
    setImage: function() {
      for (var item in imgs) {
        if (imgs.hasOwnProperty(item)) {
          // 必须用hasOwnProperty
          if (imgs[item].nodeName === 'IMG') {
            imgs[item].src = t.options.placeholder
            imgs[item].setAttribute('data-loaded', 0)
          } else {
            imgs[item].style.backgroundImage =
              'url(' + t.options.placeholder + ')'
            imgs[item].setAttribute('data-loaded', 0)
          }
        }
      }
    },
    throttle: function(method, delay) {
      var timer = null
      return function() {
        var context = this,
          args = arguments
        clearTimeout(timer)
        timer = setTimeout(function() {
          method.apply(context, args)
        }, delay)
      }
    },
    replaceImageOnScroll: function() {
      // var scrollTop = document.body.scrollTop || document.documentElement.scrollTop // 浏览器滚动条高度
      // var winTop = window.innerHeight // 窗口可视范围高度
      // console.log('scrollTop:', scrollTop)
      // console.log('winTop:', winTop)
      // imgs[i].offsetTop图片离document顶部距离
      var pageHeight = window.innerHeight
      var pageWidth = window.innerWidth
      console.log('listening')
      if (elements().length === 1) {
        window.onscroll = null
      }
      for (var i = 0; i < elements().length; i++) {
        ;(function(i) {
          var o = elements()[i].getBoundingClientRect()
          if (elements()[i].getAttribute('data-loaded') == 1) {
            return
          }
          // if (elements()[i].offsetTop < scrollTop + winTop + t.options.threshold) {
          if (
            o.left < pageWidth + t.options.threshold &&
            o.top < pageHeight + t.options.threshold
          ) {
            if (elements()[i].nodeName === 'IMG') {
              elements()[i].src = elements()[i].getAttribute('data-original')
            } else {
              elements()[i].style.backgroundImage =
                'url(' + elements()[i].getAttribute('data-original') + ')'
            }
            elements()[i].setAttribute('data-loaded', 1)
            console.log(elements().length)
          }
        })(i)
      }
    },
    replaceImageOnTouch: function() {
      var pageHeight = window.innerHeight
      if (elements().length === 1) {
        window.onscroll = null
      }
      for (var i = 0; i < elements().length; i++) {
        ;(function(i) {
          var o = elements()[i].getBoundingClientRect()
          if (elements()[i].getAttribute('data-loaded') == 1) {
            return
          }
          // console.log(o.top, o.height)
          // console.log(pageHeight)
          // if (elements()[i].offsetTop < scrollTop + winTop + t.options.threshold) {
          if (o.top + o.height < pageHeight + t.options.threshold) {
            if (elements()[i].nodeName === 'IMG') {
              elements()[i].src = elements()[i].getAttribute('data-original')
            } else {
              elements()[i].style.backgroundImage =
                'url(' + elements()[i].getAttribute('data-original') + ')'
            }
            elements()[i].setAttribute('data-loaded', 1)
            console.log(elements().length)
          }
        })(i)
      }
    },
    bindScrollEvent: function() {
      var that = this
      window.onscroll = that.throttle(
        that.replaceImageOnScroll,
        t.options.delay
      )
      console.log('scroll')
    },
    bindLoadEvent: function() {
      var that = this
      window.onload = function() {
        that.replaceImageOnScroll()
        that.replaceImageOnTouch()
      }
      console.log('loaded')
    },
    bindTransitionEvent: function() {
      var that = this
      window.addEventListener(TRANSITIONEND_EV, function() {
        that.replaceImageOnScroll()
        console.log(TRANSITIONEND_EV)
      })
    },
    bindTouchEvent: function() {
      var that = this
      window.addEventListener('touchend', function() {
        console.log('touchend')
        that.replaceImageOnTouch()
      })
    },
    init: function() {
      this.setImage()
      this.bindScrollEvent()
      this.bindLoadEvent()
      this.bindTransitionEvent()
      this.bindTouchEvent()
    }
  }
  Lazy.prototype.init()
}
export default Lazy
// var lazy = new Lazy({
//   threshold: 300,
//   delay: 300
// })
// var mySwiper = new Swiper('.swiper-container', {
//   loop: true,
//   autoHeight: true
// })
