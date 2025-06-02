
let nbgContent = document.querySelectorAll('.n-bgContent')
let numbInside
let animationStart

let count
let interval
let linkUrl

function countDown (animationStart, numbInside, count, linkUrl) {
  animationStart.classList.add('_animate')

  interval = setInterval(() => {
    if(count > 0) {
      count--
      numbInside.textContent = count
      //console.log('timer' + ' ' + `${count}` + 'sec')
    }
    else {
      window.location.href = linkUrl
      count = 5
      numbInside.textContent = count
      //console.log('reset timer' + ' ' + `${count}` + 'sec')
    }
  }, 1000)
}

function stopCountDown (animationStart, numbInside, count) {
  numbInside.textContent = 5
  count = 5
  clearInterval(interval) 
  animationStart.classList.remove('_animate')
}

const observer = new IntersectionObserver((entries) => {

  let animationStart
  let numbInside
  let count

  entries.forEach(entry => {
    if (entry.isIntersecting) {

      const {linkUrl} = entry.target.dataset

      animationStart = entry.target.querySelector('.nbl-timer .timer .timer__wrapper .circle')
      numbInside = entry.target.querySelector('.nbl-timer .timer .timer__wrapper p span.n-h3._number')
      count = numbInside.textContent

      countDown(animationStart, numbInside, count, linkUrl)
    }
    else {

      animationStart = entry.target.querySelector('.nbl-timer .timer .timer__wrapper .circle')
      numbInside = entry.target.querySelector('.nbl-timer .timer .timer__wrapper p span.n-h3._number')
      if(numbInside) {
        count = parseInt(numbInside.textContent)
      }
      
      stopCountDown(animationStart, numbInside, count)
    }
  });
}, {
  threshold: 0.9
});

if(nbgContent.length > 0) {
  nbgContent.forEach((el) => {
    if(el.querySelector('.nbl-timer')) {
      linkUrl = el.dataset.url
      el.dataset.url = linkUrl
      observer.observe(el)
    }
  })
}
