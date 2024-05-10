function timer(idTimer, deadLine) {
   //Timer

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

   setClock(idTimer, deadLine);
}

export default timer;
