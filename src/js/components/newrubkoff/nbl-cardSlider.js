
window.newCardSlider = new Swiper(".n-cardSlider", {
  wrapperClass: "swiper-wrapper",
  slideClass: "swiper-slide",
  slidesPerView: 1,
  allowTouchMove: true,
  direction: "horizontal",
  navigation: {
    nextEl: ".swiper-button-next",
    prevEl: ".swiper-button-prev",
  },
  breakpoints: {
    200: {
      allowTouchMove: true,
      spaceBetween: 4,
      slidesPerView: 1.05
    },
    768: {
      spaceBetween: 2,
      slidesPerView: 1.3
    }
  },
})

if(document.querySelectorAll('.n-cardSlider').length > 1) {
  document.querySelectorAll('.n-cardSlider').forEach((item) => {
    item.addEventListener('mouseenter', () => {
      item.querySelectorAll('.n-cardSlider__button').forEach((item) => {
        item.classList.add('_active')
      })
    })
    item.addEventListener('mouseleave', () => {
      item.querySelectorAll('.n-cardSlider__button').forEach((item) => {
        item.classList.remove('_active')
      })
    })
  })
}
