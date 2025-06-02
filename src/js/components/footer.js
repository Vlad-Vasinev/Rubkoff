
import { disableScroll } from "../functions/disable-scroll"
import { enableScroll } from "../functions/enable-scroll"

const appHeight = () => {
  const doc = document.documentElement
  doc.style.setProperty('--app-height', `${window.innerHeight}px`)
}
window.addEventListener('resize', appHeight)
appHeight()

// let btnMobile = document.querySelector('.btnMobile')
// let footerSideInfo = document.querySelector('.footer__right')
// let footerSideClose = document.querySelector('.footer__right-close')

// if(btnMobile) {
//   btnMobile.addEventListener('click', () => {
//     disableScroll()
//     footerSideInfo.classList.add('side-active')
//   })
// }

// footerSideClose.addEventListener('click', () => {
//   footerSideInfo.classList.remove('side-active')
//   enableScroll()
// })

