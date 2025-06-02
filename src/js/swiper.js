import utils from './utils';

/*-----------------------------------------------
|  Swiper
-----------------------------------------------*/
const swiperInit = () => {
  const themeContainers = document.querySelectorAll('[data-swiper-theme-container]');

  themeContainers.forEach((themeContainer) => {

    const swiper = themeContainer.querySelector('[data-swiper]');
    const options = utils.getData(swiper, 'swiper');
    const thumbsOptions = options.thumb;
    let thumbsInit;
    if (thumbsOptions) {
      const thumbImages = swiper.querySelectorAll('img');
      let slides = '';
      thumbImages.forEach(img => {
        slides += `
          <div class='swiper-slide '>
            <img class='img-fluid rounded mt-1' src=${img.src} alt=''/>
          </div>
        `;
      });

      const thumbs = document.createElement('div');
      thumbs.setAttribute('class', 'swiper thumb');
      thumbs.innerHTML = `<div class='swiper-wrapper'>${slides}</div>`;

      if (thumbsOptions.parent) {
        const parent = document.querySelector(thumbsOptions.parent);
        parent.parentNode.appendChild(thumbs);
      } else {
        swiper.parentNode.appendChild(thumbs);
      }

      thumbsInit = new window.Swiper(thumbs, thumbsOptions);
    }
    const swiperNav = themeContainer.querySelector('.swiper-nav');
    // eslint-disable-next-line no-new
    new window.Swiper(swiper, {
      ...options,
      navigation: {
        nextEl: swiperNav?.querySelector('.swiper-button-next'),
        prevEl: swiperNav?.querySelector('.swiper-button-prev'),
      },
      pagination: {
        el: themeContainer?.querySelector('.swiper-pagination'),
        clickable: true,
      },
      thumbs: {
        swiper: thumbsInit
      }
    });
  });
};

export default swiperInit;
