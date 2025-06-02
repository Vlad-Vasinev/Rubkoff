import { isDesktop } from '../../functions/check-viewport';

let NedHeader = document.querySelector('.n-header')
let NewHeaderDrop = document.querySelector('.n-header-drop')

let modalTpl = undefined
let modalBg = undefined
let modal = undefined

const headerScrolled = () => {

  if(isDesktop()) {

    NewHeaderDrop.classList.add('_scrolled')
    NewHeaderDrop.classList.remove('_bg-transparent')

    document.querySelector('.header').style.zIndex = "191"

    modalTpl = document.getElementById('modal-template').content.firstElementChild.cloneNode(true)
    modalBg = document.querySelector('.modal-background')
    modal = modalBg.parentNode.insertBefore(modalTpl, modalBg)
    modal.querySelector('.modal__inner').classList.add("_hided")

    modal.dataset.modalName = 'modal-empty'
    modal.classList.add('_inited')
    modal.classList.add('opened')
    modal.classList.add('_empty')
    window.openModalContent = true
    modalBg.classList.add('_empty')
  }

}
const headerFixed = () => {
  if(NewHeaderDrop.classList.contains('_scrolled')) {
    if(isDesktop()) {  
      NewHeaderDrop.classList.remove('_scrolled')
    
      if(modal.classList.contains('opened')) {
        modal.classList.remove('opened')
        window.openModalContent = false
        document.body.removeChild(modal)
        document.querySelector('.header').style.zIndex = "100"
      }
    }
  }
}

if(NedHeader && NewHeaderDrop && !NewHeaderDrop.classList.contains('_bg-transparent')) {
  if(isDesktop()) {
    NedHeader.addEventListener('mouseenter', headerScrolled)
    NewHeaderDrop.addEventListener('mouseenter', headerScrolled)
  
    NedHeader.addEventListener('mouseleave', headerFixed)
    NewHeaderDrop.addEventListener('mouseleave', headerFixed)
  }
}

