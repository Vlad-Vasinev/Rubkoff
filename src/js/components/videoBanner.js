import { disableScroll } from '.././functions/disable-scroll';
import { enableScroll } from '.././functions/enable-scroll';

videoBannerInit()

function videoBannerInit() {
  const articles = document.querySelectorAll('.article-block[href]')
  if (articles.length) {
    const modalTpl = document.getElementById('modal-template').content.firstElementChild.cloneNode(true)
    const modalBg = document.querySelector('.modal-background')
    const modal = modalBg.parentNode.insertBefore(modalTpl, modalBg)
    modal.dataset.modalName = 'mini-gallery'
    modal.classList.add('_inited')

    articles.forEach((el) => {
      el.addEventListener('click', (e) => {
        e.preventDefault()


        modal.querySelector('.modal__body').innerHTML = '';
        let videoCode
        try {
          let url = new URL(el.getAttribute('href'))
          url.href.includes('embed')
            ? videoCode = url.pathname.replace('/embed/', '')
            : videoCode = url.searchParams.get('v')

        } catch (err) {

          console.error(err)
          return
        }
        if (videoCode) {
          modal.querySelector('.modal__body').innerHTML = `
        <iframe
          width="560"
          height="315"
          src="https://www.youtube.com/embed/${videoCode}"
          title="YouTube video player"
          frameborder="0"
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
          allowfullscreen
        ></iframe>
        `
          disableScroll()
          modal.classList.add('opened')
        }

      })
    })
  }




  // new Swiper('[js-video-banner]', {
  //   wrapperClass: 'swiper-wrapper',
  //   slideClass: 'video-banner-slider__slide',
  //   autoplay: {
  //     delay: 5000,
  //     disableOnInteraction: false
  //   },
  //   slidesPerView: 1,
  //   effect: 'fade',
  //   runCallbacksOnInit: false,
  //   fadeEffect: {
  //     crossFade: false
  //   },
  //   // preventClicks: false,
  //   // preventClicksPropagation: false,
  //   // shortSwipes: false,


  //   _loop: true,
  //   get loop() {
  //     return this._loop;
  //   },
  //   set loop(value) {
  //     this._loop = value;
  //   },
  //   // navigation: {
  //   //   nextEl: '.swiper-button-next',
  //   //   prevEl: '.swiper-button-prev',
  //   // },
  //   pagination: {
  //     el: '.video-banner-slider .swiper-pagination',
  //     clickable: 'true'
  //   },
  //   on: {
  //     slideChangeTransitionEnd: function () {
  //       const prevSlide = this.slides[this.previousIndex]
  //       prevSlide.querySelector('.fullscreen-stories-item-pagination .progress')?.classList.remove('playing', 'ended')
  //       prevSlide.querySelector('video')?.remove()
  //     },
  //     init: function () {
  //       this.el.querySelectorAll('.swiper-pagination-bullet').forEach((el) => {
  //         el.innerHTML = '<div class="progress"></div>'
  //       });
  //     },
  //     afterInit: onChange,
  //     slideChange: onChange,

  //   },
  // });


}