import { disableScroll } from '../functions/disable-scroll';
import { enableScroll } from '../functions/enable-scroll';

function playVideo(videoEl) {
  const playPromise = videoEl.play()
  if (playPromise !== undefined) {
    playPromise.then(function () {
      videoEl.parentElement.classList?.remove('paused-video')
    }).catch(function (error) {
      videoEl.parentElement.classList?.add('paused-video')
    });
  }

}

function storiesOpen(e) {

  const slider = window.Stories.data.fullscreenSlider

  slider.slideTo(e.currentTarget.dataset.slideIndex, 0)
  document.querySelector('.stories-container').classList.add('is-active')
  disableScroll()
  playVideo(slider.slides[slider.activeIndex].querySelector('.fullscreen-stories-item-video video'))


}
function fullscreenSliderInit() {
  const previewsArr = document.querySelectorAll('.stories-inner .stories-item')
  previewsArr.forEach(function (item, index, array) {
    item.dataset.slideIndex = index
    const slide = document.createElement('div')
    slide.className = "fullscreen-stories-item swiper-slide"
    // <video 
    // src="${item.dataset.videoSrc}" 
    // data-slide-index=${index} preload="none" ${isMobile() ? "muted" : ""}  playsinline ></video>
    slide.innerHTML =
      `<div class="fullscreen-stories-item-video" data-video-src="${item.dataset.videoSrc}">
      <div class='preview-img' style='background-image: url(${item.dataset.imgSrc})' ></div>
      </div>
      <div class="fullscreen-stories-item-description">
      <div class="h4">${item.querySelector('.stories-item-desc span').textContent}</div>
      <button class="button_medium slide-button slide-button_biege" data-modal-open data-modal-name="form-modal"><div class="slide-button-inner"><span>Обсудить&nbsp;проект</span><span>Обсудить&nbsp;проект</span></div></button>
    </div>
    ${isMobile() ? "<button class='mute-button button_small'>Включить звук</button>" : ""}
    `
    const mounted = document.querySelector('.fullscreen-stories.swiper-wrapper').appendChild(slide)
    if (isMobile() && mounted) {
      mounted?.querySelector('.mute-button')?.addEventListener('click', (e) => {
        e.currentTarget.closest('.fullscreen-stories.swiper-wrapper').querySelectorAll('video').forEach(function (vid) {
          e.currentTarget.closest('.fullscreen-stories.swiper-wrapper').querySelectorAll('.mute-button').forEach((bt) => {
            vid.muted ? bt.innerText = 'Выключить звук' : bt.innerText = 'Включить звук'
          })
          window.videoWasUnmute ? window.videoWasUnmute = false : window.videoWasUnmute = true
          if (vid.muted) {
            vid.muted = false
          }
          else {
            vid.muted = true
          }
        })
      })
    }
  });
}
function initPagination(container, videos) {

  if (container && videos?.length) {

    const barsContainer = document.querySelector(`${container}`)
    videos.forEach((item) => {
      const bar = document.createElementNS('http://www.w3.org/2000/svg', 'svg');


      bar.setAttribute("class", 'progressbar-item')
      bar.setAttribute("viewBox", "0 0 34 2")
      bar.setAttribute('fill', "none")
      bar.setAttribute('preserveAspectRatio', "none")


      bar.innerHTML =
        `<rect opacity="0.4" width="34" height="1.5" rx="0.736239" fill=" white"></rect>
        <rect class='bar-rect' width="0" height="1.5" rx="0.736239" fill=" white">
        </rect>`
      barsContainer.append(bar)
      item.addEventListener('loadedmetadata', (e) => {

        const videoIndex = e.target.dataset.slideIndex
        document.querySelectorAll('svg rect.bar-rect')[videoIndex].style.animationDuration = `${e.target.duration}s`
      }, { once: true })
    })

    const paginationBars = document.querySelectorAll('svg rect.bar-rect')
    document.querySelectorAll('.fullscreen-stories-item-video video').forEach(el => {
      el.addEventListener('pause',
        (e) => {
          const bar = paginationBars[e.target.dataset.slideIndex]
          bar.classList.add('paused')

        })
      el.addEventListener('playing',
        (e) => {

          const bar = paginationBars[e.target.dataset.slideIndex]
          bar.classList.remove('paused')
          bar.classList.add('running')
        })
      el.addEventListener('ended',
        (e) => {
          const bar = paginationBars[e.target.dataset.slideIndex]
          bar.classList.remove('paused')
          bar.classList.add('running')

        })
    }
    )

  }
}

const storiesConstructor = () => {return  {
  data: {
    fullscreenSlider: undefined,
    bars: []
  },
  init: function () {

    if (document.querySelector('.stories')) {
      fullscreenSliderInit()
      // if (window.innerWidth < 1024) {
      //   initPagination(
      //     '.pagination-container',
      //     document.querySelectorAll('.fullscreen-stories-item-video video')
      //   )
      // }

      this.data.fullscreenSlider = new Swiper('.stories-container-inner', {
        wrapperClass: 'swiper-wrapper',
        slideClass: 'swiper-slide',

        spaceBetween: 0,
        centeredSlides: true,
        pagination: {
          el: '.slider-navigation .slider-navigation__pagination',
          type: 'bullets'
        },
        navigation: {
          prevEl: '.slider-navigation .slider-navigation__prev',
          nextEl: '.slider-navigation .slider-navigation__next',
        },
        allowTouchMove: false,
        breakpoints: {
          200: {
            spaceBetween: 0,
            slidesPerView: 1,
            allowTouchMove: true,

          },
          768: {
            slidesPerView: 2.72,
            allowTouchMove: false,
            spaceBetween: aPixels(338)
          },
        },
        on: {
          init: function () {

            document.querySelectorAll('.stories-container video').forEach((item) => {
              item.addEventListener('ended', () => {
                // PROD 
                // window.Stories.data.fullscreenSlider.slideNext()
              })
            })
          },
          afterInit: function (sw) {
            const activeSlide = sw.slides[sw.activeIndex]
            if (activeSlide.querySelector('video') == null) {
              const aVideoCtr = activeSlide.querySelector('.fullscreen-stories-item-video')
              const activeVideo = mountVideo(aVideoCtr, aVideoCtr.dataset.videoSrc)
              
            }

          },
          slideChange: function (sw) {
            // console.log('slideTS')
            const activeSlide = sw.slides[sw.activeIndex]
            const prevSlide = sw.slides[sw.previousIndex]


            document.querySelectorAll('.stories-container video').forEach((item) => {
              item.currentTime = 0
              item.pause()
            })

            if (window.innerWidth < 1024) {
              const paginationBars = document.querySelectorAll('svg rect.bar-rect')

              Array.from(paginationBars).slice(0, this.activeIndex).forEach(el => {
                el.classList.remove('running', 'paused')
                el.classList.add('ended')
              })
              Array.from(paginationBars).slice(this.activeIndex).forEach(el => {
                el.classList.remove('running', 'paused', 'ended')
              })
            }
          },

          slideChangeTransitionStart: function (sw) {
            // console.log('slideTS')
            const vid = this.slides[this.activeIndex].querySelector('.fullscreen-stories-item-video video')
            if(isMobile()){
              
            }
          },
          slideChangeTransitionEnd: function (sw) {
            // console.log('slideTE')
            const activeSlide = sw.slides[sw.activeIndex]
            const prevSlide = sw.slides[sw.previousIndex]
            if (prevSlide) {
              prevSlide.querySelector('.fullscreen-stories-item-video')?.classList?.remove('paused-video')
              prevSlide.querySelector('video')?.pause()
              prevSlide.querySelector('video')?.remove()
            }
            const aVideoCtr = activeSlide.querySelector('.fullscreen-stories-item-video')
            if (aVideoCtr) {
              const activeVideo = mountVideo(aVideoCtr, aVideoCtr.dataset.videoSrc)
              playVideo(activeVideo)

            }
            // const video = this.slides[this.activeIndex].querySelector('.fullscreen-stories-item-video video')
            // video?.play()

          },
        },
      });
      function mountVideo(ctr, source) {
        const video = document.createElement('video');
        // video.autoplay = false

        if (isMobile()) {
          video.setAttribute('muted', "")
          video.muted = true
        }


        video.setAttribute('playsinline', "true")
        video.setAttribute('webkit-playsinline', "webkit-playsinline")
        video.setAttribute('disablepictureinpicture', "true")
        video.src = source
        return ctr.appendChild(video)
      }
      

      document.querySelectorAll('.stories .stories-item').forEach(el => el.addEventListener('click', storiesOpen))
      document.querySelectorAll('.fullscreen-stories-item-video video').forEach(el => el.addEventListener('click',
        (e) => {
          if (e.currentTarget.closest('.swiper-slide').classList.contains('swiper-slide-active')) {
            const video = e.currentTarget.querySelector('video')
            if (video) {
              video.paused ? video.play() : video.pause()
            }
          }
        }))


      function closeSlider() {
        document.querySelectorAll('.stories-container video').forEach((item) => {
          item.currentTime = 0
          item.pause()
        })
        enableScroll()
        document.querySelector('.stories-container').classList.remove('is-active')
      }
      if (window.innerWidth > 1023) {
        document.querySelector('.stories-container .stories-bg').addEventListener('click', closeSlider)
      }
      document.querySelectorAll('.stories-container .close-btn, [data-modal-open]').forEach((el) => { el.addEventListener('click', closeSlider) })
    }
  }
}}




function storiesInit () {
  const stories = document.querySelector('.stories')
  if (!stories) return

  const items = stories.querySelectorAll('.stories-item')
  items.length && Array.from(items).slice(14).forEach((el) => { el.remove() })
  const firstOpen = (event) => { 
    
    const sItem = event.target.closest('.stories-item')
    if(!sItem) return
    window.Stories.init()
    stories.removeEventListener('click', firstOpen)  
    storiesOpen(event)
   }

  window.Stories = storiesConstructor()
  stories.addEventListener("click", firstOpen)
  
  
}
storiesInit();


