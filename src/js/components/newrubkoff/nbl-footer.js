

document.querySelectorAll('.n-footer__open').forEach((el) => {
  el.addEventListener('click', () => {
    el.parentElement.classList.toggle('_active')
    el.querySelector('svg').classList.toggle('transform')
  })
})