window.addEventListener('DOMContentLoaded', () => {
   //Tabs
   const tabs = document.querySelectorAll('.tabheader__item');
   const tabsContent = document.querySelectorAll('.tabcontent');
   const tabsParent = document.querySelector('.tabheader__items');

   function hideTabContent() {
      tabsContent.forEach(item => {
         item.classList.add('hide');
         item.classList.remove('show', 'fade');
      });
      tabs.forEach(item => {
         item.classList.remove('tabheader__item_active');
      });
   }

   function showTabContent(i = 0) {
      tabsContent[i].classList.add('show', 'fade');
      tabsContent[i].classList.remove('hide');
      tabs[i].classList.add('tabheader__item_active');
   }

   hideTabContent();
   showTabContent();

   tabsParent.addEventListener('click', (event) => {
      const target = event.target;
      if (target && target.classList.contains('tabheader__item')) {
         tabs.forEach((item, i) => {
            if (target == item) {
               hideTabContent();
               showTabContent(i);
            }
         });
      };
   });

   //Timer
   const deadLine = '2024-04-01';

   function getTimeRemaining(endtime) {
      let days, hours, minutes, seconds;
      const timeValue = Date.parse(endtime) - Date.parse(new Date);
      if (timeValue <= 0) {
         days = 0;
         hours = 0;
         minutes = 0;
         seconds = 0;
      } else {
         days = Math.floor(timeValue / (1000 * 60 * 60 * 24));
         hours = Math.floor((timeValue / (1000 * 60 * 60)) % 24);
         minutes = Math.floor((timeValue / 1000 / 60) % 60);
         seconds = Math.floor((timeValue / 1000) % 60);
      }

      return {
         'total': timeValue,
         'days': days,
         'hours': hours,
         'minutes': minutes,
         'seconds': seconds
      };
   }

   function getZero(num) {
      if (num >= 0 && num < 10) {
         return `0${num}`;
      } else {
         return num;
      }
   }

   function setClock(selector, endtime) {
      const timer = document.querySelector(selector);
      const days = timer.querySelector('#days');
      const hours = timer.querySelector('#hours');
      const minutes = timer.querySelector('#minutes');
      const seconds = timer.querySelector('#seconds');
      const timeInterval = setInterval(updateClock, 1000);
      updateClock(); //убирает мигание счетчика

      function updateClock() {
         const timerValue = getTimeRemaining(endtime);
         days.innerHTML = getZero(timerValue.days);
         hours.innerHTML = getZero(timerValue.hours);
         minutes.innerHTML = getZero(timerValue.minutes);
         seconds.innerHTML = getZero(timerValue.seconds);
         if (timerValue.total <= 0) {
            clearInterval(timeInterval);
         }
      }
   }

   setClock('.timer', deadLine);

   //Modal
   const modalOpenBtns = document.querySelectorAll('[data-modal');
   const modal = document.querySelector('.modal');

   function openModal() {
      modal.classList.add('show');
      modal.classList.remove('hide');
      //modal.classList.toggle('show');
      document.body.style.overflow = 'hidden';
      clearInterval(modalTimer);
   }

   function closeModal() {
      modal.classList.add('hide');
      modal.classList.remove('show');
      //modal.classList.toggle('show');
      document.body.style.overflow = '';
   }

   modalOpenBtns.forEach(btn => {
      btn.addEventListener('click', openModal);
   });

   modal.addEventListener('click', (e) => {
      if (e.target === modal || e.target.getAttribute('data-close') == '') {
         closeModal();
      }
   });

   document.addEventListener('keydown', (e) => {
      if (e.code === 'Escape' && modal.classList.contains('show')) {
         closeModal();
      }
   });

   const modalTimer = setTimeout(openModal, 5000);

   function showModalByScroll() {
      if (window.pageYOffset + document.documentElement.clientHeight >= document.documentElement.scrollHeight - 1) {
         openModal();
         window.removeEventListener('scroll', showModalByScroll);
      }
   }

   window.addEventListener('scroll', showModalByScroll);


   //Карточки (используем классы)
   class MenuCard {
      constructor(src, alt, title, descr, price, parentSelector, ...classes) {
         this.src = src;
         this.alt = alt;
         this.title = title;
         this.descr = descr;
         this.price = price;
         this.classes = classes;
         this.parent = document.querySelector(parentSelector);
         this.transfer = 27;
         this.currencyExchange();
      }

      currencyExchange() {
         this.price = this.price * this.transfer;
      }

      render() {
         const element = document.createElement('div');
         if (this.classes.length === 0) {
            this.element = 'menu__item';
            element.classList.add(this.element);
         } else {
            this.classes.forEach(className => {
               element.classList.add(className);
            });
         }

         element.innerHTML = `
            <img src=${this.src} alt=${this.alt}>
            <h3 class="menu__item-subtitle">${this.title}"</h3>
            <div class="menu__item-descr">${this.descr}</div>
            <div class="menu__item-divider"></div>
            <div class="menu__item-price">
               <div class="menu__item-cost">Цена:</div>
               <div class="menu__item-total"><span>${this.price}</span> грн/день</div>
            </div>
         `;
         this.parent.append(element);
      }
   }

   const getResource = async (url) => {
      const res = await fetch(url);
      if (!res.ok) {
         throw new Error(`Could not fetch ${url}, status: ${res.status}`);
      }
      return await res.json();
   };

   getResource('http://localhost:3000/menu')
      .then(data => {
         data.forEach(({ img, altimg, title, descr, price }) => {
            new MenuCard(img, altimg, title, descr, price, '.menu .container').render();
         });
      });


   // Функцмя отправки формы

   const forms = document.querySelectorAll('form');
   const message = {
      loading: 'img/form/spinner.svg',
      success: 'Спасибо! Мы с вами свяжемся.',
      failure: 'Что-то пошло не так ...'
   };

   forms.forEach(item => {
      bindpostData(item);
   });

   const postData = async (url, data) => {
      const res = await fetch(url, {
         method: 'POST',
         headers: {
            'Content-type': 'application/json'
         },
         body: data
      });

      return await res.json();
   };

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

         //отправка объекта formdata
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

   function showThanksModal(message) {
      const prevModalDialog = document.querySelector('.modal__dialog');
      prevModalDialog.classList.add('hide');
      openModal();

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
         closeModal();
      }, 4000);
   }

   //Обращение к базе данных
   fetch('http://localhost:3000/menu')
      .then(data => data.json())
      .then(res => console.log(res));

});