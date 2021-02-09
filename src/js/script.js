$(document).ready(function () {
  $('.carousel__inner').slick({
    speed: 1200,
    adaptiveHeight: true,
    prevArrow: '<button type="button" class="slick-prev"><img src="../icons/left.png"></button>',
    nextArrow: '<button type="button" class="slick-next"><img src="../icons/right.png"></button>',
    responsive: [{
      breakpoint: 992,
      settings: {
        arrows: false,
        dots: true
      }
    }]
  });
  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function () {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  function togleSlide(item) {
    $(item).each(function (i) {
      $(this).on('click', function (e) {
        e.preventDefault();
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
      });
    });
  }
  togleSlide('.catalog-item__link');
  togleSlide('.catalog-item__back');

  //modal

  $('[data-modal=consultation]').on('click', function () {
    $('.overlay, #consultation').fadeIn('show');
  });
  $('.modal__close').on('click', function () {
    $('.overlay, #consultation, #order, #thanks').fadeOut();
  });
  $('.button_catalog-item').each(function (i) {
    $(this).on('click', function () {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('show');
    });
  });

  // validate

  function validateForms(form) {
    $(form).validate({
      rules: {
        name: {
          required: true,
          minlength: 2
        },
        phone: "required",
        email: {
          required: true,
          email: true
        }
      },
      messages: {
        name: {
          required: "Пожалуйста, введите свое имя",
          minlength: jQuery.validator.format("Введите от {0} символов")
        },
        phone: "Пожалуйста, введите свой номер телефона",
        email: {
          required: "Пожалуйста, введите свою почту",
          email: "Неправильно введен адрес почты"
        }
      }
    });
  }
  validateForms('#consultation form');
  validateForms('#consultation-form');
  validateForms('#order form');

  //моска ввода номера телефонаа
  $('input[name=phone]').mask("+7 (999) 999-9999");

  $('form').submit(function (e) {
    e.preventDefault();
    $.ajax({
      type: "POST",
      url: "mailer/smart.php",
      data: $(this).serialize()
    }).done(function () {
      $(this).find("input").val("");
      $('#consultation, #order').fadeOut();
      $('.overlay, #thanks').fadeIn('show');
      $('form').trigger('reset');
    });
    return false;
  });

  //smooth scroll and pageup

  $(window).scroll(function () {
    if ($(this).scrollTop() > 1080) {
      $('.pageup').fadeIn();
    } else {
      $('.pageup').fadeOut();
    }
  });

  // для плавных переходов скрипт 
  $("a[href^='#up']").click(function () {
    const _href = $(this).attr("href");
    $("html, body").animate({
      scrollTop: $(_href).offset().top + "px"
    });
    return false;
  });

  new WOW().init();
});