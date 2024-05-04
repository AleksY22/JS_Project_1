window.addEventListener('DOMContentLoaded', () => {
   const tabs = require('./modules/tabs');
   const module = require('./modules/modal');
   const timer = require('./modules/timer');
   const cards = require('./modules/cards');
   const slider = require('./modules/slider');
   const calculator = require('./modules/calculator');

   tabs();
   module();
   timer();
   cards();
   slider();
   calculator();

});



