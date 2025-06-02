

if(document.querySelector('.nbl-mapSelect')) {
  document.querySelectorAll('.nbl-mapSelect .nbl-mapSelect__item').forEach((el, index, arr) => {
    el.addEventListener('click', (e) => {

      arr.forEach((item) => {
        if(item.querySelector('div')) {
          item.classList.remove('_active')
          item.querySelector('div').classList.remove('_active')   
          item.querySelector('span').classList.remove('_active')
        }
        else {
          item.classList.remove('_active')
          item.querySelector('span').classList.remove('_active')
        }
      })

      if(e.currentTarget.querySelector('div')) {
        e.currentTarget.classList.add('_active')
        e.currentTarget.querySelector('div').classList.add('_active')   
        e.currentTarget.querySelector('span').classList.add('_active')
      }
      else {
        e.currentTarget.classList.add('_active')
        e.currentTarget.querySelector('span').classList.add('_active')
      }
  
    })
  })
}