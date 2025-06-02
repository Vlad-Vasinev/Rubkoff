export default class miniGallery {
  constructor(galleryEl, fsObj) {
    this.miniGallerySlider = galleryEl
    
    let srcArr = undefined
    let bgSrcArr = undefined
    let fsSrcArr = undefined
    try {
      srcArr = this.miniGallerySlider?.dataset.gallerySrcset.split(',')
      bgSrcArr = this.miniGallerySlider?.dataset.galleryBgset.split(',')
      fsSrcArr = this.miniGallerySlider?.dataset.galleryFsset.split(',')
    } catch (error) {
      console.error(error)
    }

    if (!srcArr) {
      console.error('data-gallery-srcset заполнен неверно')
      return
    }
    const modalTpl = document.getElementById('modal-template').content.firstElementChild.cloneNode(true)
    const modalBg = document.querySelector('.modal-background')
    const modalEl = modalBg.parentNode.insertBefore(modalTpl, modalBg)
    modalEl.dataset.modalName = 'mini-gallery'


    let modalMiniGallery = document.createElement('div');
    modalMiniGallery.classList.add('modal-mini-gallery');
    if(fsSrcArr){
      modalMiniGallery.setAttribute('data-fs-ctr', '')
    }

    // this.miniGallerySlider.querySelectorAll('.mini-gallery-block__wrapper .mini-gallery-block__item img').forEach((el) => {
    //   modalMiniGallery.innerHTML += `<div class='modal-mini-gallery__item' style='background-image: ${el.style.backgroundImage};' data-lazy><img  data-src="${el.scr || el.dataset.src}"></div>`
    // })

    srcArr.forEach(
      (item, i) => {
        modalMiniGallery.innerHTML += `<div class='modal-mini-gallery__item' data-lazy style='${bgSrcArr[i] ? 'background-image: url(' + bgSrcArr[i] + ');' : 'background-color: #C4C4C4;'}'${fsSrcArr[i] ? 'data-fs-full="' + fsSrcArr[i] + '"' : ''} ><img data-src="${item}"></div>`
      }
    )
    // console.log(fsObj.init)
    
    modalEl.querySelector('.modal__top > span').innerText = "Галерея"
    modalMiniGallery = modalEl.querySelector('.modal__body').appendChild(modalMiniGallery)
    modalEl.classList.add('_inited')
    
  }
}