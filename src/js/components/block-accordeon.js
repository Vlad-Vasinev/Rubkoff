
document.querySelectorAll('.block-accordeon').forEach((el) => {

  el.querySelectorAll('.block-accordeon__el').forEach((item, id, array) => {
    item.addEventListener('click', (e) => {
      e.currentTarget.classList.toggle('block-accordeon_active')
      e.currentTarget.querySelector('.block-accordeon__icon').classList.toggle('block-accordeon__icon_active')
    })
  })

})