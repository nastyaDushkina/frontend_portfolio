document.addEventListener('DOMContentLoaded', function() {
  const swiper = new Swiper('.swiper-container', {

    direction: 'horizontal',
    loop: true,
    speed: 700,

    autoplay: {
      delay: 3000,
      disableOnInteraction: false,
    },

    pagination: {
      el: '.swiper-pagination',
      clickable: true,
    },

    on: {
      init() {
        this.el.addEventListener('mouseenter', () => {
          this.autoplay.stop();
        });
        this.el.addEventListener('mouseleave', () => {
          this.autoplay.start();
        });
      }
    }
  });

  document.querySelectorAll('.carousel_step').forEach(function(carouselBtn) {
    carouselBtn.addEventListener('click', function(event) {
      const path = event.currentTarget.dataset.path;
      console.log(path);

      document.querySelectorAll('.how-we-work_carousel-item').forEach(function(item) {
        item.classList.remove('how-we-work_item-active')
      });

      document.querySelectorAll('.carousel_step').forEach(function(item) {
        item.classList.remove('step-active')
      });

      carouselBtn.classList.add('step-active');
      document.querySelector(`[data-target="${path}"]`).classList.add('how-we-work_item-active');
    })
  })

  document.querySelector('.header_burger').addEventListener('click', function(){
    document.querySelector('.header_menu').classList.toggle('header_menu-not-active');
    document.querySelector('.header_burger-btn').classList.toggle('header_burger-open');
  })
})
