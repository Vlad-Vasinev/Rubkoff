import JustValidate from 'just-validate';
import Inputmask from "inputmask";


function grecaptchaCheck() {
  return !!(document.querySelector('script[src*="www.google.com/recaptcha"]'))
}

export function multiFormInit(selector, options={}) {
  // Инициализирует форму и капчу в ней 
  let forms = []

  if (typeof selector === 'string') {
    forms = document.querySelectorAll(selector)
    if (!forms.length) {
      console.warn(`tried to init form "${selector}" & there is no such form`)
      return
    }
  }
  else {
    forms.push(selector)
  }

  forms.forEach((form) => {

    if (form.classList.contains('validation-attached')) {
      return
    }

    const rules = [

    ]
    const nameSelector = form?.querySelector('input[name="name"]');
    if (nameSelector) {
      rules.push(
        {
          ruleSelector: 'input[name="name"]',
          rules: [
            {
              rule: 'required',
              errorMessage: 'Вы не ввели Имя'
            },
          ],
        }
      )

    }
    const mailSelector = form?.querySelector('input[type="email"]');
    if (mailSelector) {
      rules.push({
        ruleSelector: 'input[type="email"]',
        rules: [
          {
            rule: "required",
            errorMessage: "Вы не заполнили Email",
          },
          {
            rule: "email",
            errorMessage: "Email введен неверно",
          },
        ],
      })
    }

    const telSelector = form?.querySelector('input[type="tel"]');
    if (telSelector) {
      rules.push(
        {
          ruleSelector: 'input[type="tel"]',
          rules: [
            {
              rule: 'required',
              errorMessage: 'Вы не ввели телефон'
            },
          ],
          tel: true,
          telError: 'Телефон указан неверно'
        }

      )

      // добавление маски к телефону
      const inputMask = new Inputmask({
        mask: '+7 (999) 999-99-99',
        showMaskOnHover: false,
      });
      inputMask.mask(telSelector);
      for (let item of rules) {
        if (item.tel) {
          item.rules.push({
            rule: 'function',
            validator: function () {
              const phone = telSelector.inputmask.unmaskedvalue();
              return phone.length === 10;
            },
            errorMessage: item.telError
          });
        }
      }
    }

    if (grecaptchaCheck()) {

      let counter = 5
      function captchaInit(form, cEl) {
        if (window.grecaptcha?.render) {
          const rId = window.grecaptcha?.render(cEl)
          form.dataset.rId = rId

        }
        else if (counter-- != 0) {
          setTimeout(captchaInit, 300, form, cEl)

        }
      }
      const captchaId = form.querySelector('.g-recaptcha')
      if (captchaId) {
        captchaInit(form, captchaId)
      }
    }

    validateForms(form, rules, options)
    form.classList.add('validation-attached')
  })

}


export default function validateForms(formEl, rules, options={}) {
  // Подключает валидацию и обрабатывает ответ запроса
  const form = formEl;

  if (!form) {
    console.error('Нет такого селектора!');
    return false;
  }
  if (!rules) {
    console.error('Вы не передали правила валидации!');
    return false;
  }

    
  const validation = new JustValidate(form,
    {
      errorLabelCssClass: 'ui-input__error',
      errorLabelStyle: {},
      // errorsContainer: document.querySelector('.error-field'),
      errorFieldCssClass: 'has-error',
      successFieldCssClass: 'is-valid',
      validateBeforeSubmitting: true
    }
  );
  
  validation.setCurrentLocale('ru')

  for (let item of rules) {
    validation
      .addField(item.ruleSelector, item.rules);
  }
  function clearForm() {
    form.reset();

    form.querySelectorAll(".ui-input.is-focused").forEach((el) => {
      el.classList.remove('is-focused')
    });

  }
  // для тестов
  // validation.onSuccess(async (e) => {
  //   form.classList.add('loading')

  //   setTimeout((params) => {
  //     // form.classList.add('hidden');
  //     form.classList.add('hidden');
  //     form.classList.remove('loading');
  //     formRequest.forEach(el => {el.classList.remove('visible'); el.classList.add('hidden')})
  //     formResponse.forEach(el => {el.classList.remove('hidden'); el.classList.add('visible')})
  //     form.dataset.redirect ? window.location.replace(form.dataset.redirect) : undefined
  //     clearForm()
  //   }, 1000);
  // })
  function showError(form, msg) {
    // Заменяет текст в блоке, скрывает форму и показывает ответ
    const errorCtr = form.querySelector('.error-message-ctr')
    if (errorCtr) {
      errorCtr.innerText = msg
    }
    else {
      const message = document.createElement('div')
      message.classList.add('h6')
      message.innerText = msg
      form.appendChild(message)
    }
  }
  function showResponse(form, msg) {
    // Заменяет текст в блоке, скрывает форму и показывает ответ
    const modal = form.closest('.modal')
    if (!modal) {
      return
    }
    const formRequest = modal.querySelectorAll('.form-request');
    const formResponse = modal.querySelectorAll('.form-response');
    // const formResponseMsg = modal.querySelector('.modal__body .form-response');
    // if (formResponseMsg) formResponseMsg.textContent = message
    formRequest.forEach(el => { el.classList.remove('visible'); el.classList.add('hidden') })
    formResponse.forEach(el => { el.classList.remove('hidden'); el.classList.add('visible') })

  }
  form.addEventListener('submit', (e) => {
    
    validation.revalidate().then((valid)=>{
      if(valid){
        successHandler(e)
      }
      else{
        e.stopPropagation()
        e.preventDefault()
      }
    })
  })
  // validation.onSuccess()

  async function successHandler(submitEvent){
    let captchaExist = grecaptchaCheck() || !!(window.grecaptcha)


    const captchaId = form.dataset.rId;
    if (captchaId) {
      grecaptcha.execute(captchaId)
    }
    else if (captchaExist) {
      console.error('there is no captcha in form')
    }
    const interval = setInterval(function () {
      if ((captchaExist && grecaptcha.getResponse(captchaId)) || !captchaExist) {
        clearInterval(interval)
        const data = new FormData(submitEvent.target)

        form.classList.add('loading')
        const fetchUrl = form.getAttribute('action') ? form.getAttribute('action') : '/api'
        fetch(fetchUrl, {
          method: 'POST',
          body: data
        }).then(response => {
          if (!response.ok) {
            response.json()
              .catch(() => {
                form.classList.add('hidden')
                form.classList.remove('loading')
                showError(form, 'Не удалось отправить форму')
                throw new Error(response.status);
              })
              .then(({ message }) => {
                showError(form, message)
                throw new Error(message || response.status);
              });
          }
          else {
            options && options.successClb && options.successClb()
            // form.classList.add('hidden');
            // if(formResponseMsg) formResponseMsg.textContent = response.json();
            // showResponse()
            form.dataset.redirect ? window.location.replace(form.dataset.redirect) : undefined
            clearForm()
            form.classList.remove('loading');
          }

        });

      }
    }, 1000)
  }  
};

