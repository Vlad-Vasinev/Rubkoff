// document.querySelectorAll(".our-partners").forEach((el) => {
//   let imgArray = [];
//   let imgArrayOld = [];

//   let oldArr = [];
//   let currentArr = el.querySelectorAll(".our-partners__item img");
//   let currentArrLength = currentArr.length;

//   let linksArray = [];

//   let originalImgArr = [];

//   const url = el.querySelector(".our-partners__block").dataset.action;
//   let checkArr = [];

//   fetch(url)
//     .then((res) => {
//       return res.json();
//     })
//     .then((result) => {
//       let srcArr = result.map((item) => item.src);
//       let linkArr = result.map((item) => item.link);
//       linksArray = linkArr.slice();
//       console.log(linksArray);

//       imgArray = srcArr;
//       imgArrayOld = srcArr.slice();
//       currentArr.forEach((el) => {
//         setImage(el);
//       });
//     });

//   function getRandomUniqueImage(arr, oldArr) {
//     if (arr.length === 0) {
//       arr = oldArr.slice();
//       const index = Math.floor(Math.random() * arr.length);
//       const selectedImage = arr[index];
//       arr.splice(index, 1);
//       return selectedImage;
//     } else {
//       const index = Math.floor(Math.random() * arr.length);
//       const selectedImage = arr[index];
//       arr.splice(index, 1);
//       return selectedImage;
//     }
//   }

//   function setImage(element) {
//     var delay = 5200;

//     setInterval(function () {
//       let randomImgPath = getRandomUniqueImage(imgArray, imgArrayOld);

//       checkArr = [];

//       currentArr.forEach((el) => {
//         checkArr.push(el.getAttribute("src"));
//       });

//       if (!checkArr.includes(randomImgPath)) {
//         element.setAttribute("src", randomImgPath);

//         imgArrayOld.forEach((item, index) => {
//           console.log(index);
//           if (item === randomImgPath) {
//             console.log(linksArray[index]);
//             element.parentElement.setAttribute("href", linksArray[index]);
//           }
//         });
//       }
//     }, delay);
//   }
// });
