export default class Lazy {
  constructor(options) {
    this._options = {
      threshold: 200,
      delay: 300,
      placeholder:
        'data:image/png;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAAAXNSR0IArs4c6QAAAARnQU1BAACxjwv8YQUAAAAJcEhZcwAADsQAAA7EAZUrDhsAAAANSURBVBhXYzh8+PB/AAffA0nNPuCLAAAAAElFTkSuQmCC',
      class: 'lazy',
      el: null,
      callback: null
    }
    for (let item in options) {
      if (this._options.hasOwnProperty(item)) {
        this._options[item] = options[item]
      }
    }
    this._imgs = document.querySelectorAll('.' + this._options.class)
    this._elements = document.querySelectorAll("[data-loaded='0']")
    this.replaceImageOnScroll = this.replaceImageOnScroll.bind(this)
    this.replaceImageOnTouch = this.replaceImageOnTouch.bind(this)
  }
  showOptions() {
    console.log('options:' + this._options)
  }
  getElements() {
    return document.querySelectorAll("[data-loaded='0']")
  }
  throttle(method, delay) {
    let timer = null
    return function() {
      let context = this
      let args = arguments
      clearTimeout(timer)
      timer = setTimeout(function() {
        method.apply(context, args)
      }, delay)
    }
  }
  setImage() {
    console.log(this)
    console.log('setImage')
    let imgs = this._imgs
    console.log(imgs)
    for (let item in imgs) {
      if (imgs.hasOwnProperty(item)) {
        // 必须用hasOwnProperty
        if (imgs[item].nodeName === 'IMG') {
          imgs[item].src = this._options.placeholder
          imgs[item].setAttribute('data-loaded', 0)
        } else {
          imgs[item].style.backgroundImage =
            'url(' + this._options.placeholder + ')'
          imgs[item].setAttribute('data-loaded', 0)
        }
      }
    }
  }
  replaceImageOnScroll() {
    console.log('scroll', this)
    const pageHeight = window.innerHeight
    const pageWidth = window.innerWidth
    console.log(pageHeight, pageWidth)
    let elements = document.querySelectorAll("[data-loaded='0']")
    console.log(this, elements)
    console.log('listening')
    if (elements.length === 1) {
      window.onscroll = null
    }
    for (let i = 0; i < elements.length; i++) {
      var o = elements[i].getBoundingClientRect()
      if (elements[i].getAttribute('data-loaded') == 1) {
        return
      }
      if (
        o.left < pageWidth + this._options.threshold &&
        o.top < pageHeight + this._options.threshold
      ) {
        if (elements[i].nodeName === 'IMG') {
          elements[i].src = elements[i].getAttribute('data-original')
        } else {
          elements[i].style.backgroundImage =
            'url(' + elements[i].getAttribute('data-original') + ')'
        }
        elements[i].setAttribute('data-loaded', 1)
        console.log(elements.length)
      }
    }
  }
  replaceImageOnTouch() {
    var pageHeight = window.innerHeight
    let elements = document.querySelectorAll("[data-loaded='0']")
    if (elements.length === 1) {
      window.onscroll = null
    }
    for (var i = 0; i < elements.length; i++) {
      var o = elements[i].getBoundingClientRect()
      if (elements[i].getAttribute('data-loaded') == 1) {
        return
      }
      // console.log(o.top, o.height)
      // console.log(pageHeight)
      // if (elements[i].offsetTop < scrollTop + winTop + t.options.threshold) {
      if (o.top + o.height < pageHeight + this._options.threshold) {
        if (elements[i].nodeName === 'IMG') {
          elements[i].src = elements[i].getAttribute('data-original')
        } else {
          elements[i].style.backgroundImage =
            'url(' + elements[i].getAttribute('data-original') + ')'
        }
        elements[i].setAttribute('data-loaded', 1)
        console.log(elements.length)
      }
    }
  }
  bindScrollEvent() {
    var that = this
    console.log('bind', this)
    window.onscroll = this.throttle(
      that.replaceImageOnScroll,
      that._options.delay
    )
  }
  bindLoadEvent() {
    var that = this
    window.onload = function() {
      that.replaceImageOnScroll()
      that.replaceImageOnTouch()
    }
    console.log('loaded')
  }
  bindTransitionEvent() {
    var that = this
    window.addEventListener(TRANSITIONEND_EV, function() {
      that.replaceImageOnScroll()
      console.log(TRANSITIONEND_EV)
    })
  }
  bindTouchEvent() {
    var that = this
    window.addEventListener('touchend', function() {
      console.log('touchend')
      that.replaceImageOnTouch()
    })
  }
  init() {
    this.setImage()
    this.bindScrollEvent()
    this.bindLoadEvent()
  }
}
