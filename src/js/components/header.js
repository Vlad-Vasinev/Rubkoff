import { disableScroll } from '.././functions/disable-scroll';
import { enableScroll } from '.././functions/enable-scroll';

import { isDesktop, isMobile } from '../functions/check-viewport';

// import { changeHeaderOnScroll } from '.././functions/changeHeaderOnScroll';

const header = document.querySelector('.header')
// homePageHeader()
// stickyHeader()
if (isMobile()) {
  sidebarOpenInit()
  // sidebarNavigationInit()
}
else {
  // headerDropdownInit()
}
searchInit()

function sidebarOpenInit() {

  const header = document.querySelector('header')
  const sidebar = document.querySelector('.header-sidebar')
  document.querySelectorAll('[data-sidebar]').forEach(el => {
    el.addEventListener('click', (e) => {

      if (sidebar.classList.contains('_opened')) {
        closeSidebar(header, sidebar)
      }
      else {
        openSidebar(header, sidebar)
      }

    })
  })
  header.querySelector('.header__sidebar-back')?.addEventListener('click', (e) => {
    backOnStep()
  })

}

function openSidebar(header, sidebar) {
  disableScroll()

  header.querySelector('.header__burger').classList.add('_active')
  sidebar.style = `--header-bottom: ${header.getBoundingClientRect().bottom}px`
  sidebar.classList.add('_opened')
  header.querySelector('.header__menu').classList.add('_sidebar-active')
  openSidebarStep('first')
}
function closeSidebar(header, sidebar) {

  sidebar.classList.remove('_opened')
  sidebar.style = ''
  header.querySelector('.header__burger').classList.remove('_active')
  header.classList.remove('_is-fixed')
  enableScroll()
  header.querySelector('.header__menu').classList.remove('_sidebar-active')
  document.querySelectorAll(`.header-sidebar .header-sidebar__step[data-step-order]`).forEach((el) => {
    el.removeAttribute('data-step-order')
    el.classList.remove('_active')
  })
  switchBackButton(false)
}

function openSidebarStep(name) {
  const step = document.querySelector(`.header-sidebar .header-sidebar__step[data-step-name='${name}']`)
  if (!step) return
  const prevSteps = document.querySelectorAll(`.header-sidebar .header-sidebar__step[data-step-order]`)

  if (prevSteps.length) {
    const prevStep = prevSteps[prevSteps.length - 1]
    step.dataset.stepOrder = +prevStep.dataset.stepOrder + 1
    switchBackButton(true)
    prevStep?.classList.remove('_active')
    step?.classList.add('_active')
  }
  else if (!prevSteps.length) {
    step.dataset.stepOrder = 0
    step?.classList.add('_active')
  }
}

function backOnStep() {
  const curStep = document.querySelector(`.header-sidebar .header-sidebar__step._active`)

  if (curStep.dataset.stepOrder > 0) {
    const prevStep = document.querySelector(`.header-sidebar .header-sidebar__step[data-step-order='${curStep.dataset.stepOrder - 1}']`)
    curStep.removeAttribute('data-step-order')
    curStep?.classList.remove('_active')
    prevStep?.classList.add('_active')
    if (prevStep.dataset.stepOrder == 0) {
      switchBackButton(false)
    }
  }
}

function switchBackButton(way = true) {
  const backButton = document.querySelector('header .header__sidebar-back')
  if (way) {
    backButton?.classList.add('_active')
  }
  else {
    backButton?.classList.remove('_active')
  }
}




function searchInit() {
  if (document.querySelector('.header-search')) {
    let query, queryString;
    const itemTpl = document.querySelector('.header-search-item-tpl')

    let positionSet = false
    document.querySelectorAll('[data-search-open]').forEach((el) => {

      el.addEventListener('click', (e) => {

        if(isDesktop()) {
          let NewHeaderDrop = document.querySelector('.n-header-drop')
          NewHeaderDrop.classList.remove('_scrolled')
        }


        disableScroll()
        const header = document.querySelector('.header')
        
        if (!isMobile() && !positionSet) {
          const menuRect = header.querySelector('.header__menu').getBoundingClientRect()
          const headerField = header.querySelector('.header-search__field')
          headerField.style.setProperty('top', menuRect.top.toFixed(2) + "px")
          headerField.style.setProperty('left', menuRect.left.toFixed(2) + "px")
          headerField.style.setProperty('right', (window.innerWidth - menuRect.right.toFixed(2)) + "px")
          headerField.style.setProperty('height', menuRect.height.toFixed(2) + "px")
          positionSet = true
        }
        
        
        header.querySelector('.header-search')?.classList.add('is-active')
        header.querySelector('.header-search__field input')?.focus()
        
        
        header.querySelector('.header-search__field input').addEventListener('input', () => {
          console.log('input is changing')
          header.querySelector('.close-button-text').style.display = "block"
          header.querySelector('.header-search__suggestions-container').classList.add('_active')
          // padding: aCalc(40)
        })
        header.querySelector('.close-button-text').addEventListener('click', () => {
          console.log('set input clear')
          header.querySelector('.header-search__field input').value = ""
          header.querySelector('.header-search__suggestions-container').classList.remove('_active')
        })

        header.classList.add('_search-open')

      })
    })
    document.querySelectorAll('[data-search-close]').forEach((el) => {

      el.addEventListener('click', (e) => {

        if(isDesktop()) {
          document.querySelectorAll('.modal.opened').forEach((item) => {
            item.classList.remove('opened')
            window.openModalContent = false
          })
        }
      
        if(header.querySelector('.header-search__field input').value === "") {
          header.querySelector('.close-button-text').style.display = "none"
        }
        else {
          header.querySelector('.close-button-text').style.display = "block"
        }
        //header.querySelector('.close-button-text').style.display = "none"

          document.querySelector('.header-search')?.classList.remove('is-active')
          document.querySelector('.header-search .is-active')?.classList.remove('is-active')
          document.querySelector('.header-search__field input')?.blur()
          document.querySelector('.header').classList.remove('_search-open')
          enableScroll()
      })
    })

    function getItemLayout(params) {
      const newItem = itemTpl.content.firstElementChild.cloneNode(true)

      for (const key in params) {
        if (Object.hasOwnProperty.call(params, key)) {
          const value = params[key]
          switch (key) {
            case 'href': {

              newItem.setAttribute('href', value);
              break;
            }
            case 'image': {

              const place = newItem.querySelector(`[tpl-${key}]`)
              if (place) place.src = value;
              break;
            }

            default: {
              // console.log(key)
              const place = newItem.querySelector(`[tpl-${key}]`)
              if (place) place.innerHTML = value
              break;
            }
          }
        }
      }
      return newItem
    }

    window.getItemLayout = getItemLayout;

    function searchInputHandler(e) {
      query = e.target.value.trim()
      queryString = e.target.value.trim().replace(/\s/ig, '%20')

      const suggestions = document.querySelector('.header-search__suggestions')
      const suggestionsContainer = document.querySelector('.header-search__suggestions-container')

      if (query) {

        // fetch(window.location.origin + '/api/search.json')
        fetch(window.location.origin + '/local/ajax/search.php/?q=' + queryString)
          .then((response) => {
            if (response.ok) {
              return response.json()
            }
            else {
              console.error('не удалось выполнить запрос')
              return null
            }
          })
          .then(result => {
            suggestionsContainer.innerHTML = '';
            if (result?.length > 0) {
              const data = result;
              for (let index = 0; index < data.length; index++) {
                suggestionsContainer.appendChild(getItemLayout(data[index]))
              }
            }
            else {
              suggestionsContainer.innerHTML += '<div class="header-search__no-suggestions h3">Nothing found matching your request</div>'
            }
          })

      }
      else {
        suggestionsContainer.innerHTML = '';

      }
    }

    var inputTimeout;
    function searchInputListener(event) {
      clearTimeout(inputTimeout);
      inputTimeout = setTimeout(searchInputHandler, 500, event);
    };
    document.querySelector('.header-search__field input').addEventListener('input', searchInputListener)

    document.querySelectorAll('[data-search-result-link]').forEach(item => item.addEventListener('click', (e) => {
      window.location.href = '/search/?q=' + queryString
    }))
  }
}