
import { onDocLoad, onWinLoad } from '../functions/onDocLoad';
import initLazySlider from './sliders-lazyload';

onWinLoad(initSliders);
window.APP.initGallerySliders = initGallerySliders;
function playVideo(videoEl) {
  const playPromise = videoEl.play();
  if (playPromise !== undefined) {
    playPromise
      .then(function () {
        videoEl.parentElement.classList?.remove("paused-video");
      })
      .catch(function (error) {
        videoEl.parentElement.classList?.add("paused-video");
      });
  }
}

function sortSlidesVideoFirst(sw) {
  // Сортировка чтобы видео всегда было первым
  const vid = sw.el.querySelector("video");
  if (vid) {
    const firstSlideVid = sw.el.querySelector(
      `.${sw.params.slideClass}:first-child video`
    );
    if (!(vid === firstSlideVid)) {
      const vidSlide = vid.parentNode;
      vidSlide.parentNode.insertBefore(
        vidSlide,
        vidSlide.parentNode.firstChild
      );
      vidSlide.classList.add("video-slide");
      return vidSlide;
    } else {
      firstSlideVid.parentNode.classList.add("video-slide");
      return firstSlideVid;
    }
  } else {
    return null;
  }
}

function initGallerySliders() {
  new Swiper(".product-card .card-gallery", {
    wrapperClass: "swiper-wrapper",
    slideClass: "swiper-slide",
    allowTouchMove: true,
    preloadImages: false,
    direction: "horizontal",
    loop: true,
    // lazyPreloadPrevNext: 0,
    navigation: {
      nextEl: ".card-gallery__navigation .slider-navigation-next",
      prevEl: ".card-gallery__navigation .slider-navigation-prev",
    },

    on: {
      beforeInit: (sw) => { sortSlidesVideoFirst(sw); initLazySlider(sw) },
    },
  });
}

function initSliders() {
  
  initProjectSlider()
  initGallerySliders();
  initPartnerStripSlider()

  new Swiper("[data-project-plan-slider]", {
    wrapperClass: "swiper-wrapper",
    slideClass: "swiper-slide",
    allowTouchMove: true,
    preloadImages: false,
    direction: "horizontal",
    loop: true,
    navigation: {
      nextEl: ".slider-navigation-next",
      prevEl: ".slider-navigation-prev",
    },
    on: {
      beforeInit: function (sw) {
        initLazySlider(sw)
        if (!isMobile()) {
          const pagination = sw.el.querySelector(".swiper-pagination");

          if (pagination) {
            sw.params.pagination = {
              ...sw.params.pagination,
              el: pagination,
              type: "bullets",
              clickable: "true",
            };
          }
        }
      },
    },
  });

  if (isMobile()) {
    new Swiper(".three-column-slider, .four-column-slider, .n-column-slider", {
      wrapperClass: "swiper-wrapper",
      slideClass: "swiper-slide",
      allowTouchMove: true,
      preloadImages: false,
      direction: "horizontal",
      slidesPerView: 1.1667,
      spaceBetween: 10,
      on: {
        beforeInit: function (sw) {
          initLazySlider(sw)
        }
      }
    });
  }
  function initMeshSliders() {
    new Swiper(".mesh-block-slider", {
      wrapperClass: "swiper-wrapper",
      slideClass: "swiper-slide",
      spaceBetween: 2,
      breakpoints: {
        200: {
          slidesPerView: 1.45
        },
        768: {
          slidesPerView: 4.15
        },
      },
    });
  }
  initMeshSliders()

  let nblBgSliders = new Swiper(".nbl-bigSlider", {
    wrapperClass: "swiper-wrapper",
    slideClass: "swiper-slide",
    centeredSlides: true,
    loop: true,
    breakpoints: {
      200: {
        slidesPerView: 1.07,
        spaceBetween: 4,
      },
      768: {
        slidesPerView: 1.25,
        spaceBetween: 19,
      },
    },
    navigation: {
      nextEl: ".swiper-button-next",
      prevEl: ".swiper-button-prev",
    },
    on: {
      slideChange: function () {
        const videos = document.querySelectorAll('.nbl-bigSlider video');
        videos.forEach(video => {
            video.pause();
            video.currentTime = 0;
        });

        const activeSlide = this.slides[this.activeIndex].querySelector('video');
        if (activeSlide) {
          activeSlide.play();
        }
      },
    },
  });

  const swiper = new Swiper(".main-thumb", {
    direction: 'vertical',
    spaceBetween: 10,
    slidesPerView: 'auto',
    freeMode: true,
    watchSlidesProgress: true,
  });

  const swiper2 = new Swiper(".thumbs-block", {
    // slidesPerView: 'auto',
    loop: true,
    breakpoints: {
      200: {
        slidesPerView: 1.05,
        spaceBetween: 4,
      },
      768: {
        slidesPerView: "auto",
        spaceBetween: 0,
      },
    },
    //speed: 800,
    on: {
      afterInit: (swiper) => {
        swiper.update();
      },
      slideChange: (s) => {
        if(swiper.slides[s.previousIndex]) {
          swiper.slides[s.previousIndex].classList.remove('swiper-slide-active');
          swiper.slides[s.activeIndex].classList.add('swiper-slide-active');
        }
      }
    }
  });

  document.querySelectorAll('.main-thumb .swiper-slide').forEach((slide, index) => {
    slide.addEventListener("click", function (event) {
      swiper2.slideTo(index);
    })
  });

  function accordeonSliders() {
    new Swiper(".accordeon-slider", {
      wrapperClass: "swiper-wrapper",
      slideClass: "swiper-slide",
      slidesPerView: 2.05,
      spaceBetween: 6,
    });
  }

  if (isMobile()) {
    accordeonSliders()
  }
  
  let arrNumber = ['0.1670998632010944', '3.0549110807113546', '6.683980848153215', '10.331176470588236', '13.94361149110807', '17.605827633378933', '21.218030095759232', '24.85073871409029', '28.487072503419974', '32.133132694938446', '35.76154582763338', '39.39850889192886', '43.03541723666211', '46.67235294117647', '50.29957592339262', '53.930820793433654', '57.548358413132696', '61.189233926128594', '64.82492476060192', '68.46362517099864', '72.08880984952121', '76.3070998632011', '81.02043775649796', '84.47250341997264', '88.1281805745554', '91.72690834473325', '95.3567852257182', '99.03080711354309']
  let arrNumberLength = arrNumber.length
  let interval 

  function bgContentSliders() {
    let bgSwiper = new Swiper(".bg-ContentSlider", {
      wrapperClass: "swiper-wrapper",
      slideClass: "swiper-slide",
      slidesPerView: 1,
      spaceBetween: 0,
      // autoplay: {
      //   delay: 6000, slideChange
      //   disableOnInteraction: false, slideChangeTransitionEnd
      // },
      loop: true,
      pagination: {
        el: ".project-slider__pagination",
        type: "bullets",
        clickable: "false",
      },
      on: {
        afterInit: function () {
          console.log('afterInit')
          let activeSlide = this.slides[this.activeIndex].querySelector('video');
          let activeSlideImg = this.slides[this.activeIndex].querySelector('img.notCover');

          if (activeSlide) {
            clearInterval(interval) 
            activeSlide.play();

            activeSlide.addEventListener('timeupdate', () => {
              let percent = ((activeSlide.currentTime / 7.31) * 100) + "%"
              document.querySelector('.bg-ContentSlider').style.setProperty('--currentTime', `${percent}`);
              
              if(activeSlide.currentTime >= 7.35) {
                bgSwiper.slideNext()
              } 
            })
          }
          else if(activeSlideImg) { 
            
            if(count > 0) {
              interval = setInterval(() => {

                if(count > 0) {
                  let percent = parseInt(arrNumber[countArr]) + "%"
                  document.querySelector('.bg-ContentSlider').style.setProperty('--currentTime', `${percent}`);
                  
                  count--
                  countArr++
                }
                else {  
                  clearInterval(interval)
                  count = arrNumberLength
                  countArr = 0
                  bgSwiper.slideNext()
                }

              }, 230)
            }
            else {
              clearInterval(interval)
            }
          }
        },
        slideChangeTransitionStart: function () {

          let count = arrNumber.length
          let countArr = 0

          const videos = document.querySelectorAll('.bg-ContentSlider video');
          videos.forEach(video => {
            video.pause();
            video.currentTime = 0;
          });
  
          let activeSlide = this.slides[this.activeIndex].querySelector('video');
          let activeSlideImg = this.slides[this.activeIndex].querySelector('img.notCover');

          if (activeSlide) {
            clearInterval(interval) 
            activeSlide.play();

            activeSlide.addEventListener('timeupdate', () => {
              let percent = ((activeSlide.currentTime / 7.31) * 100) + "%"
              document.querySelector('.bg-ContentSlider').style.setProperty('--currentTime', `${percent}`);
              
              if(activeSlide.currentTime >= 7.35) {
                bgSwiper.slideNext()
              } 
            })
          }
          else if(activeSlideImg) { 
            
            if(count > 0) {
              interval = setInterval(() => {

                if(count > 0) {
                  let percent = parseInt(arrNumber[countArr]) + "%"
                  document.querySelector('.bg-ContentSlider').style.setProperty('--currentTime', `${percent}`);
                  
                  count--
                  countArr++
                }
                else {  
                  clearInterval(interval)
                  count = arrNumberLength
                  countArr = 0
                  bgSwiper.slideNext()
                }

              }, 230)
            }
            else {
              clearInterval(interval)
            }
          }
        },
      },
    });
  }

  bgContentSliders()

}

function initProjectSlider() {
  let autoplay = true;
  const autoplaySpeed = 6625;
  let projectVideo;
  let currentTimeout;

  
  window.ProjSlider = new Swiper(".project-slider .project-slider__slider", {
    wrapperClass: "swiper-wrapper",
    slideClass: "swiper-slide",
    speed: 500,
    slidesPerView: 1,
    runCallbacksOnInit: false,
    allowTouchMove: true,
    preloadImages: false,
    direction: "horizontal",
    loop: true,
    pagination: {
      el: ".project-slider__pagination",
      type: "bullets",
      clickable: "true",
    },
    breakpoints: {
      200: {
        allowTouchMove: true,
      }
    },
    on: {
      beforeInit: function (sw) {

        projectVideo = sortSlidesVideoFirst(this);
        initLazySlider(sw)
      },
      init: function (sw) {
        this.el
          .querySelector(".project-slider__pagination")
          .style.setProperty("--duration", autoplaySpeed + "ms");
        this.el.querySelectorAll(".swiper-pagination-bullet").forEach((el) => {
          el.innerHTML = '<div class="progress"></div>';
        });
        if (projectVideo) {
          // this.autoplay.stop()
        }

      },
      afterInit: function (sw) {

        if (projectVideo) {
          projectVideo.addEventListener(
            "loadeddata",
            (event) => {

              this.el
                .querySelector(".swiper-pagination-bullet:first-child")
                .style.setProperty(
                  "--duration",
                  (projectVideo.duration
                    ? projectVideo.duration * 1000
                    : autoplaySpeed) + "ms"
                );

              playVideoSlide(sw);
            },
            { once: true }
          );
        }

      },
      touchStart: () => {
        if (autoplay) {
          clearTimeout(currentTimeout);
          autoplay = false
        }
      },
      slideChange: function (sw) {
        
        clearTimeout(currentTimeout);

        if (sw.slides[sw.activeIndex].querySelector("video")) {
          playVideoSlide(sw);
          activateBullet.call(this);
        } else {
          if (autoplay) {
            currentTimeout = setTimeout(() => {
              sw.slideNext();
            }, autoplaySpeed);
          }

          activateBullet.call(this);
        }
      },
    },
  });
  function playVideoSlide(sw) {
    const play = () => {
      playVideo(projectVideo);
      currentTimeout = setTimeout(() => {
        if (autoplay) {
          sw.slideNext();
        }
        projectVideo.pause();
        projectVideo.currentTime = 0;
      }, projectVideo.duration * 990);
      activateBullet.call(sw);
    }
    if (projectVideo.readyState === 4) {
      play()
    }
    else {
      projectVideo.addEventListener(
        "loadeddata",
        play,
        { once: true }
      );
    }

  }
  function activateBullet() {
    this.el
      .querySelectorAll(
        `.swiper-pagination-bullet:nth-child(1n+${this.realIndex}) .progress`
      )
      .forEach((el) => {
        el.classList.remove("playing", "ended");
      });
    this.el
      .querySelectorAll(
        `.swiper-pagination-bullet:nth-child(-n+${this.realIndex}) .progress`
      )
      .forEach((el) => {
        el.classList.add("ended");
        el.classList.remove("playing");
      });
    this.el
      .querySelector(`.swiper-pagination-bullet-active .progress`)
      ?.classList.add("playing");
  }
}
function initPartnerStripSlider() {
  new Swiper(".partner-strip.partner-strip_slider", {
    wrapperClass: "swiper-wrapper",
    slideClass: "swiper-slide",
    allowTouchMove: true,
    preloadImages: false,
    navigation: {
      nextEl: ".slider-navigation-next",
      prevEl: ".slider-navigation-prev",
    },
    pagination: {
      el: '.swiper-pagination',
      type: "bullets",
      clickable: "true",
    },
    spaceBetween: 0,
    breakpoints: {
      200: {
        slidesPerView: 2
      },
      768: {
        slidesPerView: 6
      },
    },
  });
}
