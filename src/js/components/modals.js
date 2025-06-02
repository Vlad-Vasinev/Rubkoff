


import { disableScroll } from '.././functions/disable-scroll';
import { enableScroll } from '.././functions/enable-scroll';
import { multiFormInit } from '../functions/validate-forms';

// ищем все модальные окна, в которые нужно будет подставлять значения
document.querySelectorAll('[data-modal-open][data-modal-header]:not([data-modal-header=""]), [data-modal-open][data-modal-desc]:not([data-modal-desc=""])').forEach((el) => {
  const name = el.dataset.modalName
  // console.log(name)
  openModalInit(`[data-modal-open][data-modal-name="${name}"]`, (t, m) => { beforeSaleModal(t, m); additionalFormInputs(t, m) }, undefined, () => { multiFormInit(`.modal[data-modal-name="${name}"] form`) })
})

// openModalInit('[data-modal-open][data-modal-name="sale-modal"]', (t, m) => { beforeSaleModal(t, m); additionalFormInputs(t, m) }, undefined, () => { appointFormInit(`.modal[data-modal-name="sale-modal"] form`) })
// находим все модальные окна с формами, затем вешаем на их триггеры дополнительный коллбек при первом открытии
document.querySelectorAll('.modal form').forEach((el) => {
  const name = el.closest('.modal').dataset.modalName
  openModalInit(`[data-modal-open][data-modal-name="${name}"]`, additionalFormInputs, undefined, () => { multiFormInit(`.modal[data-modal-name="${name}"] form`) })
})

openModalInit('[data-modal-open]')
closeModalInit('[data-modal-close]')


window.openModal = openModal
window.initFormValidation = multiFormInit
window.closeModal = closeModal

// window.openModalContent = false
// document.querySelector('header [data-modal-name="form-modal"]')?.click()

async function openModal(triggerEl=undefined, modal, beforeCallback = async () => { }, afterCallback = async () => { }, firstOpenCallback = async () => { }) {
  modal.classList.add('_inited')

  window.openModalContent = true

  await beforeCallback(triggerEl, modal)
  if (!modal.classList.contains('first-opened')) {
    await firstOpenCallback(triggerEl, modal)
    modal.classList.add('first-opened')
  }

  modal.classList.add('opened')
  disableScroll(triggerEl, modal)
  let NewHeaderDrop = document.querySelector('.n-header-drop')
  NewHeaderDrop.classList.remove('_scrolled')
  document.querySelector('.header').style.zIndex = "100"

  await afterCallback(triggerEl, modal)
}
function closeModal(opt={}) {
  document.querySelectorAll('.modal.opened').forEach((item) => {
    item.classList.remove('opened')
    window.openModalContent = false
    opt && opt.afterCallback && opt.afterCallback()
  })

  enableScroll()
}

function beforeSaleModal(triggerEl, modal) {
  if (triggerEl && triggerEl.dataset.modalHeader) {
    try {
      modal.querySelector('.modal__top span.form-request').innerText = triggerEl.dataset.modalHeader

    }
    catch (error) {
      console.error("modal header failed")
      console.error(error)
    }
  }
  if (triggerEl && triggerEl.dataset.modalDesc) {
    try {
      modal.querySelector('.modal__top span.h5').innerText = triggerEl.dataset.modalDesc
    }
    catch (error) {
      console.error("modal desc failed")
      console.error(error)
    }
  }
  if (triggerEl && triggerEl.dataset.saleId) {
    try {
      modal.querySelector('form input[name="sale-id"]').value = triggerEl.dataset.saleId
      modal.querySelector('form input[name="sale-id"]').setAttribute('value', triggerEl.dataset.saleId)
    }
    catch (error) {
      console.error("form sale-id failed")
      console.error(error)
    }
  }
}
function additionalFormInputs(triggerEl, modal) {
  if (triggerEl && triggerEl.dataset.formAdditional) {
    const form = modal.querySelector('form');
    form.querySelectorAll('.additional-field').forEach((el) => { el.remove() })
    try {
      const additional = JSON.parse(triggerEl.dataset.formAdditional);


      for (const key in additional) {
        if (Object.hasOwnProperty.call(additional, key)) {
          const element = additional[key];
          const input = document.createElement('input');
          input.name = key;
          input.classList.add('additional-field')
          input.style.display = 'none';
          input.setAttribute('value', element);
          form.appendChild(input);
        }
      }


    }
    catch (error) {
      console.error("additional inputs failed")
      console.error(error)
    }
  }
}

function openModalInit(selector, beforeCallback = undefined, afterCallback = undefined, firstOpenCallback = undefined) {
  document.querySelectorAll(selector).forEach((triggerEl) => {
    const modal = document.querySelector(`.modal[data-modal-name="${triggerEl.dataset.modalName}"]`)
    if (modal && !triggerEl.classList.contains('_lstr-att')) {
      triggerEl.addEventListener('click', async (e) => {
        openModal(triggerEl, modal, beforeCallback, afterCallback, firstOpenCallback)
      })
      !triggerEl.classList.add('_lstr-att')
      modal.classList.add('_inited')
    }
  })
}

function closeModalInit(selector) {
  document.querySelectorAll(selector).forEach((el) => {
    el.addEventListener('click', (e) => {
      closeModal()
    })
  })
}

