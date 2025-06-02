

document.querySelectorAll('.accordeon-control').forEach((item) => {
  item.querySelectorAll('.catalog-tags .toggle-tag').forEach((el, index, array) => {

    el.addEventListener('mouseenter', () => {

      array.forEach((item) => {
        item.classList.remove('toggle-tag_active')
      })
      el.classList.add('toggle-tag_active')

      el.parentElement.parentElement.parentElement.querySelectorAll('.accordeon-items .accordeon-items__el').forEach((element) => {
        element.classList.remove('accordeon-items__el_active')
        element.classList.add('accordeon-items__el_hidden')
      })
      el.parentElement.parentElement.parentElement.querySelectorAll('.accordeon-items .accordeon-items__el')[index].classList.remove('accordeon-items__el_hidden')
      el.parentElement.parentElement.parentElement.querySelectorAll('.accordeon-items .accordeon-items__el')[index].classList.add('accordeon-items__el_active')
    })

  })
})