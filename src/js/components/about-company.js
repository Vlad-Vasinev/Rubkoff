
const aboutCompany =  new Swiper(".about__slider", {
  loop: true,
  speed: 900, 
  autoplay: {
    disableOnInteraction: false,
    pauseOnMouseEnter: false,
    delay: 2000,
},
  slidesPerGroup: 1,
  spaceBetween: 40,
  slidesPerView: 4,
  pagination: {
    el: ".swiper-pagination",
    clickable: true,
  },
  navigation: {
    nextEl:
      ".slider-navigation-next",
    prevEl:
      ".slider-navigation-prev",
  },
  breakpoints: {
    320: {
      slidesPerView: 1.5,
      spaceBetween: 9
    },
    390: {
      slidesPerView: 1.75,
      spaceBetween: 9
    },
    640: {
      slidesPerView: 4,
      spaceBetween: aPixels(40)
    }
  }
});

