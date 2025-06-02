import { disableScroll } from '../../functions/disable-scroll';
import { enableScroll } from '../../functions/enable-scroll';


let newBurger = document.querySelector('.nbl-burger.n-burger_mob')
let headerSidebar = document.querySelector('.header-sidebar')

newBurger.addEventListener('click', function() {

  if(!this.querySelector('div').classList.contains('burger-item_active')) {
    this.querySelectorAll('div').forEach(el => {
      el.classList.add('burger-item_active')
    });
    this.classList.add('_active')
    disableScroll()
    headerSidebar.classList.add("_opened")
  }
  else {
    this.querySelectorAll('div').forEach(el => {
      el.classList.remove('burger-item_active')
    });
    this.classList.remove('_active')
    enableScroll()
    headerSidebar.classList.remove("_opened")
  }
})