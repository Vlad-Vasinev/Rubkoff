

// 1!!!
// описываем алгоритм:
// логику надо разделить на десктоп и мобильную, это можно сделать при помощи isMobile()
// на десктопе нам нужно инициализовать свайперы, если они есть и на этом все
// На мобильном нам нужно:
// повесить слушатель на клик чтобы показывать окно
// при открытии инициализировать свайпер и добавлять заголовки к блокам(это можно сделать один раз при инициализации нашего блока, не обязательно делать этом именно перед открытием)
// при закрытии вызвать swiper.destroy()

import initLazySlider from './sliders-lazyload';

let items = document.querySelectorAll(".two-side-to-grid__item");
let itemsPreview = document.querySelectorAll(".two-side-to-grid__preview");

function sliderInit(element) {
  new Swiper(element, {
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
}

items.forEach((element) => {
  let itemSwiper;
  const sliderEl = element.querySelector(".swiper");
  sliderInit(sliderEl);

  if (isMobile()) {

    let preview = element.querySelector(".two-side-to-grid__preview");
    let mobileContent = element.querySelector(".two-side-to-grid__content");

    let titleInner = mobileContent.querySelector('h2, .h2');

    let twoSideBlockTop = document.createElement("div");
    twoSideBlockTop.classList.add("two-side-block__top");

    twoSideBlockTop.innerHTML =
      `<div class="h2">${titleInner.innerHTML}</div> <button class="close-mobile"> <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg"> <rect x="5.39355" y="25.1924" width="28" height="2" transform="rotate(-45 5.39355 25.1924)" fill="#161616"/> <rect x="6.80762" y="5.39343" width="28" height="2" transform="rotate(45 6.80762 5.39343)" fill="#161616"/> </svg></button>`;
    element
      .querySelector(".two-side-to-grid__content")
      .prepend(twoSideBlockTop);

    let mobileClose = element.querySelector(".close-mobile");

    function open() {
      element.classList.add("_active");
      //mobileContent.classList.add('transform-active');
      disableScroll();
    }
    function close(e) {
      element.classList.remove("_active");
      //mobileContent.classList.remove('transform-active');
      itemSwiper?.destroy();
      enableScroll();
    }

    preview.addEventListener("click", open);
    mobileClose.addEventListener("click", close);

  }
});

