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
   const modalCloseBtn = document.querySelector('[data-close]');

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

   modalCloseBtn.addEventListener('click', closeModal);

   modal.addEventListener('click', (e) => {
      if (e.target === modal) {
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

   new MenuCard(
      "img/tabs/vegy.jpg",
      "vegy",
      "Меню 'Фитнес'",
      "Меню 'Фитнес' - это новый подход к приготовлению блюд: больше свежих овощей и фруктов. Продукт активных и здоровых людей. Это абсолютно новый продукт с оптимальной ценой и высоким качеством!",
      9,
      '.menu .container',
      'menu__item'
   ).render();

   new MenuCard(
      "img/tabs/elite.jpg",
      "elite",
      "Меню “Премиум”",
      "В меню “Премиум” мы используем не только красивый дизайн упаковки, но и качественное исполнение блюд. Красная рыба, морепродукты, фрукты - ресторанное меню без похода в ресторан!",
      12,
      '.menu .container',
      'menu__item'
   ).render();

   new MenuCard(
      "img/tabs/post.jpg",
      "post",
      "Меню 'Постное'",
      "Меню “Постное” - это тщательный подбор ингредиентов: полное отсутствие продуктов животного происхождения, молоко из миндаля, овса, кокоса или гречки, правильное количество белков за счет тофу и импортных вегетарианских стейков.",
      10,
      '.menu .container',
      'menu__item'
   ).render();

});