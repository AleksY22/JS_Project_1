function slider({ container, slide, nextArrow, prevArrow, totalCounter, currentCounter, wrapper, field }) {
   /*
   // Слайдер v.1
   const slides = document.querySelectorAll('.offer__slide');
   const btnPrev = document.querySelector('.offer__slider-prev');
   const btnNext = document.querySelector('.offer__slider-next');
   const total = document.querySelector('#total');
   const current = document.querySelector('#current');
   let slideIndex = 1;

   showSlides(slideIndex);
   if (slides.length < 10) {
      total.textContent = `0${slides.length}`;
   } else {
      total.textContent = slides.length;
   }

   function showSlides(n) {
      if (n > slides.length) {
         slideIndex = 1;
      }

      if (n < 1) {
         slideIndex = slides.length;
      }

      slides.forEach(item => item.style.display = 'none');
      slides[slideIndex - 1].style.display = 'block';

      if (slides.length < 10) {
         current.textContent = `0${slideIndex}`;
      } else {
         current.textContent = slideIndex;
      }
   }

   function plusSlides(n) {
      showSlides(slideIndex += n);
   }

   btnPrev.addEventListener('click', () => {
      plusSlides(-1);
   });

   btnNext.addEventListener('click', () => {
      plusSlides(1);
   });
   */

   // Слайдер v.2
   const offerSlider = document.querySelector(container);
   const slides = document.querySelectorAll(slide);
   const btnNext = document.querySelector(nextArrow);
   const btnPrev = document.querySelector(prevArrow);
   const total = document.querySelector(totalCounter);
   const current = document.querySelector(currentCounter);
   const slidesWrapper = document.querySelector(wrapper);
   const slidesField = document.querySelector(field);
   const widthSlide = window.getComputedStyle(slidesWrapper).width;
   let slideIndex = 1;
   let offset = 0;

   function showCountSlides() {
      if (slides.length < 10) {
         total.textContent = `0${slides.length}`;
         current.textContent = `0${slideIndex}`;
      } else {
         total.textContent = slides.length;
         current.textContent = slideIndex;
      }
   }

   function changeOpacityDots() {
      dots.forEach(dot => dot.style.opacity = '0.5');
      dots[slideIndex - 1].style.opacity = '1';
   }

   function delNotDigits(str) {
      return +str.replace(/\D/g, '');
   }

   showCountSlides();

   slidesField.style.width = 100 * slides.length + '%';
   slidesField.style.display = 'flex';
   slidesField.style.transition = '0.5s all';

   slidesWrapper.style.overflow = 'hidden';

   slides.forEach(slide => {
      slide.style.width = widthSlide;
   });

   offerSlider.style.position = 'relative';

   const indicators = document.createElement('ol');
   const dots = [];

   indicators.classList.add('carousel-indicators');
   offerSlider.append(indicators);

   for (let i = 0; i < slides.length; i++) {
      const dot = document.createElement('li');
      dot.classList.add('dot');
      dot.setAttribute('data-slide-to', i + 1);
      if (i == 0) {
         dot.style.opacity = 1;
      }
      indicators.append(dot);
      dots.push(dot);
   }

   btnNext.addEventListener('click', () => {
      if (offset == delNotDigits(widthSlide) * (slides.length - 1)) {
         offset = 0;
      } else {
         offset += delNotDigits(widthSlide);
      }
      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slideIndex == slides.length) {
         slideIndex = 1;
      } else {
         slideIndex++;
      }

      showCountSlides();

      changeOpacityDots();

   });

   btnPrev.addEventListener('click', () => {
      if (offset == 0) {
         offset = delNotDigits(widthSlide) * (slides.length - 1);
      } else {
         offset -= delNotDigits(widthSlide);
      }
      slidesField.style.transform = `translateX(-${offset}px)`;

      if (slideIndex == 1) {
         slideIndex = slides.length;
      } else {
         slideIndex--;
      }

      showCountSlides();

      changeOpacityDots();
   });

   dots.forEach(dot => {
      dot.addEventListener('click', (e) => {
         const slideTo = e.target.getAttribute('data-slide-to');
         slideIndex = slideTo;

         offset = delNotDigits(widthSlide) * (slideTo - 1);
         slidesField.style.transform = `translateX(-${offset}px)`;

         changeOpacityDots();

         showCountSlides();
      });
   });
}

export default slider;
