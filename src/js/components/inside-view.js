var carouselLf = new Swiper(".inside-view", {
  breakpoints: {
    320: {
      slidesPerView: 1.2,
      //slidesPerView: 'auto',
      spaceBetween: 8
    },
    640: {
      // slidesPerView: 1.4,
      slidesPerView: 'auto',
      spaceBetween: 20
    },
  },
  slidesOffsetAfter: 0,
})

if(window.innerWidth >= 768) {
  if(document.querySelector('.inside-view')) {
  
    document.querySelectorAll('.inside-view__slide').forEach((el, index, array) => {
      el.addEventListener('click', (e) => {
        console.log(e.target)
        if(e.target === el.querySelector('.view-wrapp-left') && e.currentTarget.classList.contains('swiper-slide-next')) {
          carouselLf.slideNext()
        }
        else if(e.target === el.querySelector('.view-wrapp-left') && e.currentTarget.classList.contains('swiper-slide-active')) {
          carouselLf.slidePrev()
        }
        if(e.target === el.querySelector('.view-wrapp-right') && e.currentTarget.classList.contains('swiper-slide-active')) {
          carouselLf.slideNext()
        }
        else if(e.target === el.querySelector('.view-wrapp-right') && e.currentTarget.classList.contains('swiper-slide-prev')) {
          carouselLf.slidePrev()
        }
        if(index === 0 && e.currentTarget.classList.contains('swiper-slide-active')) {
          carouselLf.slideNext()
        }
        else if(index === 0 && e.currentTarget.classList.contains('swiper-slide-prev')) {
          carouselLf.slidePrev()
        }
        if(index === (array.length - 1)) {
          carouselLf.slidePrev()
        }
      })
    })
  }
}