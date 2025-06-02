import { disableScroll } from '.././functions/disable-scroll';
import { enableScroll } from '.././functions/enable-scroll';
import { getHeaderHeight } from '../functions/header-height';
import { getScrollBarWidth } from '../functions/getScrollBarWidth';
import getChildIndex from '../functions/getChildIndex'
import miniGallery from './miniGallery';
import fsSlider from './fullScreenSlider';
import equipTableInit from './equipTable';
import { catalogStickyTagsInit, projectStickyTableInit } from './sticky';



window.startFunc = function () {
  // console.log('grecaptcha is ready')
}

// getHeaderHeight()
getScrollBarWidth()

if (!isMobile()) {
  slideEffectButton()
  navInit()
}
else {
  mobilePopup()
  // projectEquipMobile()
}

equipTableInit()

window.fsSlider = new fsSlider(document.querySelector('.fullscreen-slider'))
miniGallerySliderInit(window.fsSlider)
catalogFilterInit()
workStagesInit()
jsInputFocus()
catalogStickyTagsInit()
projectStickyTableInit()
// window.onload = (e) => { 
//   document.querySelector('[data-modal-open][data-modal-name="sale-modal"]').click()
//   const form = document.querySelector('.modal[data-modal-name="sale-modal"]')
//   setTimeout(() => { 
//     form.querySelector('input[type="tel"]').value = "+71111111112"
//     form.querySelector('input[name="name"]').value = 'Тест'
//   }, 1000)
//   setTimeout(() => { 
//     form.querySelector('button[type="submit"]').click()
//   }, 2000)
// }


function slideEffectButton() {
  document.querySelectorAll('.slide-button').forEach(
    (el) => {
      try {
        const innerSpan = el.querySelector('span')
        const container = document.createElement('div')
        container.className = 'slide-button-inner'
        container.appendChild(innerSpan.cloneNode(true))
        container.appendChild(innerSpan.cloneNode(true))
        innerSpan.remove()
        el.insertBefore(container, el.firstChild);

      } catch (error) {
        // console.log('slide effect error on', el, error);
      }
    }
  )
}

function catalogFilterInit() {
  const catalogFilter = document.querySelector('.catalog-filter')
  if (catalogFilter) {
    catalogFilter.querySelectorAll('.toggle-tag').forEach((el) => {
      el.addEventListener('click', (e) => {
        e.currentTarget.classList.toggle('toggle-tag_active')
      })
    })
    catalogFilter.querySelectorAll('.filter-dropdown .filter-dropdown__trigger').forEach((trigger) => {
      function closeDropdownF(e) {
        if (e.target.closest('.filter-dropdown')) {
          setTimeout(() => {
            window.addEventListener('click', closeDropdownF, { once: true })
          }, 100);
          return
        }
        else {
          const active = catalogFilter.querySelector('.filter-dropdown._active')
          window.removeEventListener('click', closeDropdownF, false)
          active?.classList.remove('_active')
        }
      }
      trigger.addEventListener('click', (e) => {
        const active = catalogFilter.querySelector('.filter-dropdown._active')

        if (active) {
          const activeTrigger = active.querySelector('.filter-dropdown__trigger')
          if (activeTrigger === trigger) {

            active.classList.remove('_active')
            window.removeEventListener('click', closeDropdownF, false)
          }
          else {
            window.removeEventListener('click', closeDropdownF, false)
            active.classList.remove('_active')
            trigger.parentNode.classList.add('_active')

            setTimeout(() => {
              window.addEventListener('click', closeDropdownF, { once: true })
            }, 100);

          }
        }
        else {
          window.removeEventListener('click', closeDropdownF, false)
          trigger.parentNode.classList.add('_active')
          setTimeout(() => {
            window.addEventListener('click', closeDropdownF, { once: true })
          }, 100);

        }
      })
    })

    if (!isMobile()) {
      catalogFilter.querySelectorAll('.checkbox-list__item:not(.disabled)').forEach((el) => {
        el.querySelector('input').addEventListener('click', (e) => { e.stopPropagation() })
        el.addEventListener('click', (e) => {
          el.querySelector('.radio')?.classList.toggle('active-box')
          el.querySelector('input')?.click()

        })
      })
    }
    if (isMobile()) {
      const sidebar = document.querySelector('.filter-sidebar')
      document.querySelectorAll('[data-filter-sidebar-open]').forEach((el) => {
        el.addEventListener('click', (e) => {
          sidebar.classList.add('_opened')
          disableScroll()
        })
      })
      document.querySelectorAll('[data-filter-sidebar-close]').forEach((el) => {
        el.addEventListener('click', (e) => {
          sidebar.classList.remove('_opened')
          enableScroll()
        })
      })
      document.querySelectorAll('.mobile-filter-item__top').forEach((el) => {
        el.addEventListener('click', (e) => {
          el.closest('.mobile-filter-item')?.classList.toggle('_opened')
        })
      })
      document.querySelectorAll('.mobile-filter-item__bot-list-item:not(.disabled)').forEach((el) => {
        el.querySelector('input').addEventListener('click', (e) => { e.stopPropagation() })
        el.addEventListener('click', (e) => {
          el.querySelector('.radio')?.classList.toggle('active-box')
          el.querySelector('input')?.click()
        })
      })
    }
    // .toggle-tag_active
  }
}

// function projectEquip() {
//   const container = document.querySelector('.project-equip')
//   if (container) {
//     const equipItems = container.querySelectorAll('.equip-item')
//     let foldersColumns = []

//     equipItems.forEach((el, i, parent) => {
//       foldersColumns[i] = el.querySelectorAll('.equip-item__folder')

//     })
//     let sortedFolders = []
//     const rowAm = Math.max.apply(null, foldersColumns.map(e => e.length));
//     // console.log(rowAm);

//     for (let i = 0; i < rowAm; i++) {
//       sortedFolders[i] = [];
//     }
//     for (let columnIndx = 0; columnIndx < foldersColumns.length; columnIndx++) {
//       const folderColumn = foldersColumns[columnIndx];

//       for (let folderRawIndx = 0; folderRawIndx < folderColumn.length; folderRawIndx++) {
//         sortedFolders[folderRawIndx][columnIndx] = folderColumn[folderRawIndx];
//       }
//     }

//     for (let i = 0; i < sortedFolders.length; i++) {
//       const foldersRow = sortedFolders[i]
//       // console.log('folderRow: ', foldersRow)
//       let paramsRows = []

//       for (let foldersCol = 0; foldersCol < foldersRow.length; foldersCol++) {
//         const folder = foldersRow[foldersCol];
//         folder.querySelectorAll('.equip-item__param').forEach((e, i, p) => {
//           if (paramsRows[i]) {
//             paramsRows[i][foldersCol] = e
//           }
//           else {
//             paramsRows[i] = []
//             paramsRows[i][foldersCol] = e
//           }
//         })
//         folder.style.setProperty('grid-template-rows', 'var(--folderRows-' + i + ')')
//       }
//       // console.log(paramsRows);
//       let paramsRowHs = []
//       let paramsRowHsString
//       for (let rowI = 0; rowI < paramsRows.length; rowI++) {
//         const paramsRow = paramsRows[rowI];
//         // console.log([...paramsRow]);
//         // paramsHs = [...row].map(el => el.offsetHeight)

//         paramsRowHs.push(Math.max.apply(null, [...paramsRow].map(el => el?.offsetHeight || 0)))
//         paramsRow.forEach((el, i, arr) => {

//           el.addEventListener('mouseover', (ev) => { arr.forEach(arrEl => { arrEl.classList.add('_hgl') }) });
//           el.addEventListener('mouseout', (ev) => { arr.forEach(arrEl => arrEl.classList.remove('_hgl')) });

//         })
//       }
//       paramsRowHsString = paramsRowHs.map(it => it + 'px').join(' ')
//       // console.log('высоты в папке: ', i);
//       // console.log(paramsRowHs);
//       container.style.setProperty('--folderRows-' + i, paramsRowHsString)


//     }
//   }
// }

// function projectEquipMobile() {
//   // disableScroll()
//   let timeout
//   document.querySelectorAll('.equip-item__head').forEach((el) => {
//     el.addEventListener('click', (e) => {
//       // e.currentTarget.parentElement.querySelector('.equip-item__body').classList.add()
//       e.currentTarget.parentElement.classList.add('_open-inner')
//       timeout = setTimeout(disableScroll, 310);
//     })
//   })
//   document.querySelectorAll('.equip-item__close-btn').forEach((el) => {
//     el.addEventListener('click', (e) => {
//       clearTimeout(timeout)
//       enableScroll()
//       document.querySelector('.equip-item._open-inner .equip-item__body').scrollTo(0, 0)
      
//       document.querySelector('.equip-item._open-inner').classList.remove('_open-inner')
//     })
//   })
// }

function mobilePopup() {
  // disableScroll()
  let timeout
  document.querySelectorAll('.mobile-popup__head').forEach((el) => {
    el.addEventListener('click', (e) => {
      // e.currentTarget.parentElement.querySelector('.mobile-popup__body').classList.add()
      e.currentTarget.parentElement.classList.add('_open-inner')
      timeout = setTimeout(disableScroll, 310);
    })
  })
  document.querySelectorAll('.mobile-popup__close-btn').forEach((el) => {
    el.addEventListener('click', (e) => {
      clearTimeout(timeout)
      enableScroll()
      document.querySelector('.mobile-popup._open-inner .mobile-popup__body').scrollTo(0, 0)
      document.querySelector('.mobile-popup._open-inner').classList.remove('_open-inner')
    })
  })
}

function navInit() {
  const nav = document.querySelector('.project-nav')
  if (nav) {
    const navHeadings = document.querySelectorAll('.page__block [data-navbar-name]')
    if(!navHeadings.length){
      return
    }
    const navCtr = nav.querySelector('.project-nav__container')
    const navBlocks = []
    navHeadings.forEach((el, i, prnt) => {
      const anchor = 'navbar-' + i
      const pageBlock = el.closest('.page__block')
      pageBlock.setAttribute('id', anchor)
      navBlocks.push(pageBlock)

      const navItem = document.createElement('a')
      navItem.href = '#' + anchor
      navItem.innerHTML = `<div class="project-nav__item">${el.textContent}</div>`
      navCtr.appendChild(navItem)
    }

    )
    // const hrefs = nav.querySelectorAll('a[href^="#"]')
    // hrefs.forEach((el) => {
    //   navItems.push(document.querySelector(el.hash));
    //   // console.log(document.querySelector(el.hash) );
    // })
    if (navBlocks.length) {

      const observer = new IntersectionObserver(
        ([e]) => {
          if (e.isIntersecting) {
            nav.querySelector('.project-nav__item._active')?.classList.remove('_active')
            nav.querySelector('a[href*="' + e.target.id + '"] .project-nav__item')?.classList.add('_active')
            // nav.querySelector('#' + e.target.id)?.classList.add('_active');
          }
          // hrefs.querySelector()
        },
        {
          root: null,
          rootMargin: `0px 0px -${aPixels(144)}px 0px`,
          threshold: [0]
        }
      );
      navBlocks.forEach(el => {
        try {
          observer.observe(el);
        } catch (error) {
          console.error(error)
        }
      });
      nav.querySelectorAll('.project-nav__item').forEach((el) => {
        el.addEventListener('click', (e) => {
          nav.querySelector('.project-nav__item._active')?.classList.remove('_active')
          e.currentTarget?.classList.add('_active')
        })
      })
      nav.classList.add('_inited')
    }
  }
}


function miniGallerySliderInit() {
  const gallery = document.querySelector('[data-mini-gallery]')
  if (gallery) {
    window.miniGallery = new miniGallery(gallery)
    window.fsSlider.init()
  }
}

function workStagesInit() {
  const workStages = document.querySelector('.work-stages')
  if (!workStages) {
    return
  }
  const isMob = isMobile()
  const items = workStages.querySelectorAll('.work-stages__item')
  const arrow = workStages.querySelector('.work-stages__item .work-stages__arrow svg')
  items.forEach((el) => {
    const itemArrow = el.querySelector('.work-stages__item .work-stages__arrow')
    itemArrow.innerHTML
      ? null
      : itemArrow.appendChild(arrow?.cloneNode(true))

    el.addEventListener(!isMob ? 'mouseover' : 'click', (e) => {
      workStages.querySelector('.work-stages__item._active')?.classList.remove("_active")
      workStages.querySelector('.work-stages__sign._active')?.classList.remove("_active")
      e.currentTarget.classList.add('_active')
      workStages.querySelector('.work-stages__signs-ctr div:nth-child(' + (getChildIndex(e.currentTarget, el => el.nodeType != 3) + 1) + ')')?.classList.add('_active')
      if (isMob) {
        // workStages.querySelector('.work-stages__list').scrollTo(e.currentTarget.offsetLeft - 16, 0)

        workStages.querySelector('.work-stages__list').scrollTo({ left: e.currentTarget.offsetLeft - 16, top: 0, behavior: 'smooth' })

      }
    })
  })
}
function jsInputFocus() {
  const elements = document.querySelectorAll('.ui-input');
  if (elements.length !== 0) {
    elements.forEach((el) => {
      const input = el.querySelector('input, textarea, .textarea[contenteditable]')

      if (input.value) {
        el.classList.add('is-focused');
      }
      input.addEventListener('focus', function () {
        el.classList.add('is-focused');
      });
      input.addEventListener('blur', function () {
        if (input.value?.trim() || input.textContent !== '') {
          el.classList.add('is-focused');
        } else {
          el.classList.remove('is-focused');
        }
      });
    })
  }
}

