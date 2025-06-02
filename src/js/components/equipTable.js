
export default function equipTableInit() {
  document.querySelectorAll('.equip-table').forEach(init)
  function init(table) {


    const checkTpl = table.querySelector('template.equip-table-check-icon');
    if (checkTpl) table.querySelectorAll('.equip-table__check').forEach((el) => { el.appendChild(checkTpl.content.firstElementChild.cloneNode(true)) });

    const infoTpl = table.querySelector('template.equip-table-info-icon');
    if (infoTpl) table.querySelectorAll('.equip-table__icon').forEach((el) => { el.appendChild(infoTpl.content.firstElementChild.cloneNode(true)) });

    const container = table.querySelector('.equip-table__ctr')
    const head = table.querySelector('.equip-table__col-head, .equip-table__col:first-child')
    let rowsHeightsArr = []
    let headRows

    if (!head) {
      return null
    }
    setRows();

    if (!isMobile()) {

      for (let index = 1; index < rowsHeightsArr.length - 1; index++) {
        const siblingRows = table.querySelectorAll(`.equip-table__col div.equip-table__row:nth-child(${index + 1})`)
        siblingRows.forEach((el) => {
          el.addEventListener('mouseover', (ev) => { siblingRows.forEach(arrEl => { arrEl.classList.add('_hgl') }) });
          el.addEventListener('mouseout', (ev) => { siblingRows.forEach(arrEl => arrEl.classList.remove('_hgl')) });
        })
      }
    }
    else {
      addStickyObserver()
      const modal = initModal()
      headRows.forEach((el) => {
        el.addEventListener('click', (e) => {
          // Открытие 
          openModal(el, modal, (t, m) => { m.querySelector('.modal__body').innerHTML = t.querySelector('.equip-table__desc').innerHTML || '' })


        })
      })
    }
    // Инициализация модального окна
    function initModal() {

      const modaltpl = document.querySelector('#modal-template').content.firstElementChild.cloneNode(true)
      const mbg = document.querySelector('.modal-background')
      modaltpl.dataset.modalName = 'equp-table-modal'
      const newModal = mbg.parentNode.insertBefore(modaltpl, mbg)
      newModal.classList.add('_inited', 'modal_equip-table')
      newModal.querySelector('.modal__close-button')?.addEventListener('click', window.closeModal)
      return newModal
    }
    function addStickyObserver() {
      const observer = new IntersectionObserver(
        ([e]) => {
          container.classList.toggle("pinned-head", e.intersectionRatio < 1)
        },
        {
          root: container,
          threshold: [1]
        }
      );
      observer.observe(head);
    }
    function setRows() {
      container.style.setProperty('--grid-rows', 'auto')
      rowsHeightsArr = []
      headRows = head.querySelectorAll('.equip-table__row');
      headRows.forEach((el) => {
        rowsHeightsArr.push(el.offsetHeight + 'px')
      })

      rowsHeightsArr[rowsHeightsArr.length - 1] = '1fr';
      rowsHeightsArr[0] = 'auto';
      container.style.setProperty('--grid-rows', rowsHeightsArr.join(' '))
      setTimeout(() => {
        container.style.setProperty('--grid-head-col', head.offsetWidth + 'px')
        container.classList.add('inited')
      }, 100);
    }




  }
}