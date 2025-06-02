
import { multiFormInit } from '../functions/validate-forms';
multiFormInit('#mailing-banner-form', {
  successClb: () => {

    const modaltpl = document.querySelector('#modal-template').content.firstElementChild.cloneNode(true)
    const mbg = document.querySelector('.modal-background')
    modaltpl.dataset.modalName = 'mailing-form-modal'
    const newModal = mbg.parentNode.insertBefore(modaltpl, mbg)
    newModal.classList.add('_inited', 'modal_msg-popup')
    newModal.querySelector('.modal__body').innerHTML = '<div class="h2">Подписка на новости успешно активирована</div>'
    newModal.querySelector('.modal__close-button')?.addEventListener('click', () => {
      window.closeModal({
        afterCallback: () => {
          setTimeout(() => { newModal.remove() }, 500)
        }
      });
    })
    openModal(undefined, newModal)

  }
})