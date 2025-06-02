

// if(document.querySelector('.video-block')) {

//   const container = document.querySelector('.video-block');
//   let elementFirst = document.querySelector(".video-block .mission-block__el.mission-block__el-first")
//   let elementSecond = document.querySelector(".video-block .mission-block__el.mission-block__el-second")
//   let elementThird = document.querySelector(".video-block .mission-block__el.mission-block__el-third")
//   let elementFourth = document.querySelector(".video-block .mission-block__el.mission-block__el-fourth")

//   window.addEventListener('scroll', () => {
//     let block = document.querySelector('.video-block'); 
//     let windowHeight = window.innerHeight;

//     if (block.getBoundingClientRect().bottom < 0 || block.getBoundingClientRect().top > windowHeight) {
//         elementFirst.style.top = "150px"
//         elementSecond.style.top = "250px"
//         elementThird.style.top = "350px"
//         elementFourth.style.top = "450px"
//     } else {

//     }
//   })

//   function handleScroll(event) {

//       const delta = Math.max(-1, Math.min(1, (event.wheelDelta || -event.detail)));
      
//       if (delta < 0) {

//         if (elementFirst.getBoundingClientRect().bottom >= container.getBoundingClientRect().bottom && elementFirst.getBoundingClientRect().bottom - elementFirst.getBoundingClientRect().height <= container.getBoundingClientRect().bottom) {
//           elementFirst.style.top = "auto"
//           elementFirst.style.bottom = "0"
//         }
//         else {
//           let currentTopFirst = elementFirst.getBoundingClientRect().top - container.getBoundingClientRect().top
//           currentTopFirst += 70
//           elementFirst.style.top = currentTopFirst + 'px'
//         }

//         if (elementSecond.getBoundingClientRect().bottom >= container.getBoundingClientRect().bottom && elementSecond.getBoundingClientRect().bottom - elementSecond.getBoundingClientRect().height <= container.getBoundingClientRect().bottom) {
//           elementSecond.style.top = "auto"
//           elementSecond.style.bottom = "0"
//         }
//         else {
//           let currentTopSecond = elementSecond.getBoundingClientRect().top - container.getBoundingClientRect().top
//           currentTopSecond += 65
//           elementSecond.style.top = currentTopSecond + 'px'
//         }

//         if (elementThird.getBoundingClientRect().bottom >= container.getBoundingClientRect().bottom && elementThird.getBoundingClientRect().bottom - elementThird.getBoundingClientRect().height <= container.getBoundingClientRect().bottom) {
//           elementThird.style.top = "auto"
//           elementThird.style.bottom = "0"
//         }
//         else {
//           let currentTopThird = elementThird.getBoundingClientRect().top - container.getBoundingClientRect().top
//           currentTopThird += 55
//           elementThird.style.top = currentTopThird + 'px'
//         }

//         if (elementFourth.getBoundingClientRect().bottom >= container.getBoundingClientRect().bottom && elementFourth.getBoundingClientRect().bottom - elementFourth.getBoundingClientRect().height <= container.getBoundingClientRect().bottom) {
//           elementFourth.style.top = "auto"
//           elementFourth.style.bottom = "0"
//         }
//         else {
//           let currentTopFourth = elementFourth.getBoundingClientRect().top - container.getBoundingClientRect().top
//           currentTopFourth += 45
//           elementFourth.style.top = currentTopFourth + 'px'
//         }
        
//         console.log('Прокрутка вниз');
//       } 
//       else {

//         if (elementFirst.getBoundingClientRect().top <= container.getBoundingClientRect().top && elementFirst.getBoundingClientRect().top + elementFirst.getBoundingClientRect().height >= container.getBoundingClientRect().top) {
//           elementFirst.style.top = "0px"
//         }
//         else {
//           let currentTopFirst = elementFirst.getBoundingClientRect().top - container.getBoundingClientRect().top
//           currentTopFirst -= 60
//           elementFirst.style.top = currentTopFirst + 'px'
//         }

//         if (elementSecond.getBoundingClientRect().top <= container.getBoundingClientRect().top && elementSecond.getBoundingClientRect().top + elementSecond.getBoundingClientRect().height >= container.getBoundingClientRect().top) {
//           elementSecond.style.top = "0px"
//         }
//         else {
//           let currentTopSecond = elementSecond.getBoundingClientRect().top - container.getBoundingClientRect().top
//           currentTopSecond -= 55
//           elementSecond.style.top = currentTopSecond + 'px'
//         }

//         if (elementThird.getBoundingClientRect().top <= container.getBoundingClientRect().top && elementThird.getBoundingClientRect().top + elementThird.getBoundingClientRect().height >= container.getBoundingClientRect().top) {
//           elementThird.style.top = "0px"
//         }
//         else {
//           let currentTopThird = elementThird.getBoundingClientRect().top - container.getBoundingClientRect().top
//           currentTopThird -= 45
//           elementThird.style.top = currentTopThird + 'px'
//         }

//         if (elementFourth.getBoundingClientRect().top <= container.getBoundingClientRect().top && elementFourth.getBoundingClientRect().top + elementFourth.getBoundingClientRect().height >= container.getBoundingClientRect().top) {
//           elementFourth.style.top = "0px"
//         }
//         else {
//           let currentTopFourth = elementFourth.getBoundingClientRect().top - container.getBoundingClientRect().top
//           currentTopFourth -= 35
//           elementFourth.style.top = currentTopFourth + 'px'
//         }
//       }
//   }

//   container.addEventListener('wheel', handleScroll);

// }
