import { postData } from '../services/services';


function openModal(modalSelector, modalTimer) {
   const modal = document.querySelector(modalSelector);
   modal.classList.add('show');
   modal.classList.remove('hide');
   //modal.classList.toggle('show');
   document.body.style.overflow = 'hidden';
   if (modalTimer) {
      clearInterval(modalTimer);
   }
}

function closeModal(modalSelector) {
   const modal = document.querySelector(modalSelector);
   modal.classList.add('hide');
   modal.classList.remove('show');
   //modal.classList.toggle('show');
   document.body.style.overflow = '';
}


function modal(triggerSelector, modalSelector, modalTimer) {
   //Modal
   const modalOpenBtns = document.querySelectorAll(triggerSelector);
   const modal = document.querySelector(modalSelector);



   modalOpenBtns.forEach(btn => {
      btn.addEventListener('click', () => openModal(modalSelector, modalTimer));
   });

   modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.getAttribute('data-close') == '') {
         closeModal(modalSelector);
      }
   });

   document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modal.classList.contains('show')) {
         closeModal(modalSelector);
      }
   });

   //const modalTimer = setTimeout(openModal, 5000);

   function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
         openModal(modalSelector, modalTimer);
         window.removeEventListener('scroll', showModalByScroll);
      }
   }

   window.addEventListener('scroll', showModalByScroll);



   // Функция отправки формы

   //функция отправки формы postData импортируется

   const forms = document.querySelectorAll('form');
   const message = {
      loading: 'img/form/spinner.svg',
      success: 'Спасибо! Мы с вами свяжемся.',
      failure: 'Что-то пошло не так ...'
   };

   forms.forEach(item => {
      bindpostData(item);
   });



   function bindpostData(form) {
      form.addEventListener('submit', (e) => {
         e.preventDefault();

         const statusMessage = document.createElement('img');
         statusMessage.src = message.loading;
         statusMessage.style.cssText = `
            display: block;
            margin: 0 auto;
         `;

         form.insertAdjacentElement('afterend', statusMessage);

         //const request = new XMLHttpRequest();

         //request.open('POST', 'server.php');
         //request.setRequestHeader('Content-type', 'application/json');

         // объект formdata
         const formData = new FormData(form);


         //отправка json
         const json = JSON.stringify(Object.fromEntries(formData.entries()));

         //const json = JSON.stringify(objectSend);
         //request.send(json);

         postData('http://localhost:3000/requests', json)
            .then(data => {
               console.log(data);
               showThanksModal(message.success);
               form.reset();
               statusMessage.remove();
            }).catch(() => {
               showThanksModal(message.failure);
               form.reset();
               statusMessage.remove();
            }).finally(() => {
               form.reset();
            });

         /*
         //ответ от сервера
         request.addEventListener('load', () => {
            if (request.status === 200) {
               console.log(request.response);
               showThanksModal(message.success);
               form.reset();
               statusMessage.remove();
            } else {
               showThanksModal(message.failure);
            }
         });
         */
      });
   }

   function showThanksModal(message, modalTimer) {
      const prevModalDialog = document.querySelector('.modal__dialog');
      prevModalDialog.classList.add('hide');
      openModal('.modal', modalTimer);

      const thanksModal = document.createElement('div');
      thanksModal.classList.add('modal__dialog');
      thanksModal.innerHTML = `
         <div class="modal__content">
            <div class="modal__close" data-close>x</div>
            <div class="modal__title">${message}</div>
         </div>
      `;

      document.querySelector('.modal').append(thanksModal);
      setTimeout(() => {
         thanksModal.remove();
         prevModalDialog.classList.add('show');
         prevModalDialog.classList.remove('hide');
         closeModal('.modal');
      }, 4000);
   }


   //Обращение к базе данных
   //fetch('http://localhost:3000/menu')
   //.then(data => data.json())
   //.then(res => console.log(res));
}

//export default modal;
export { modal, openModal, closeModal };