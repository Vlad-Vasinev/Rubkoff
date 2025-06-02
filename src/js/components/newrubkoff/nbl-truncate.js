
let blockTexts = document.querySelectorAll('.nbl-textTruncate')

function createBtn () {
  let btn = document.createElement('div')
  btn.className = "n-button1 read-more _desktop"
  btn.innerHTML = "Read all"
  return btn
}

if(blockTexts.length !== 0) {

  blockTexts.forEach((el, index) => {

    let truncateEl = el.querySelector('.truncate')
    let btn = el.querySelector('.truncate .n-p1 .end-marker-first .n-button1')

    if(!el.classList.contains('_alignCenter')) {
      const truncateInnerEl = truncateEl.querySelector('.n-p1');
      const truncateRect = truncateEl.getBoundingClientRect();
      let truncateInnerRect = truncateInnerEl.getBoundingClientRect();
    
      truncateEl.style.setProperty("--truncate-height", `${truncateRect.height}px`);
  
      if(truncateEl) {
  
        btn.addEventListener('click', () => {
  
          btn.style.display = "none"
          truncateEl.classList.remove('truncate--line-clamped'); 
  
          window.requestAnimationFrame(() => {
  
            let newBtn = createBtn()
            newBtn.innerHTML = "close"
            truncateEl.querySelector('.n-p1').appendChild(newBtn)
  
            truncateInnerRect = truncateInnerEl.getBoundingClientRect();
            truncateEl.style.setProperty("--truncate-height-expanded", `${truncateInnerRect.height}px`);
            truncateEl.classList.add('truncate--expanded');
  
            newBtn.addEventListener('click', () => {
  
              truncateEl.classList.remove('truncate--expanded');
  
              setTimeout(() => {
  
                truncateEl.classList.add('truncate--line-clamped');
                btn.style.display = "inline"
                truncateEl.querySelector('.n-p1').removeChild(newBtn)
  
              }, 300);
            })
          });
        })
      }
    }

  })

}

