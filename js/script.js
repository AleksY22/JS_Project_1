import tabs from './modules/tabs';
import timer from './modules/timer';
import cards from './modules/cards';
import slider from './modules/slider';
import calculator from './modules/calculator';
import { openModal, modal } from './modules/modal';

window.addEventListener('DOMContentLoaded', () => {

   const modalTimer = setTimeout(() => openModal('.modal', modalTimer), 5000);

   tabs('.tabheader__item', '.tabcontent', '.tabheader__items', 'tabheader__item_active');
   modal('[data-modal]', '.modal', modalTimer);
   timer('.timer', '2024-05-31');
   cards();

   slider({
      container: '.offer__slider',
      slide: '.offer__slide',
      nextArrow: '.offer__slider-next',
      prevArrow: '.offer__slider-prev',
      totalCounter: '#total',
      currentCounter: '#current',
      wrapper: '.offer__slider-wrapper',
      field: '.offer__slider-inner'
   });

   calculator();

});



