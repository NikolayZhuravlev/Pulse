$(document).ready(function(){
    $('.carousel__inner').slick({
        infinite: true,
        speed: 1200,
        adaptiveHeight: false,
        prevArrow: '<button type="button" class="slick-prev"><img src="icons/arrows/left.png"></button>',
        nextArrow: '<button type="button" class="slick-next"><img src="icons/arrows/right.png"></button>',
        responsive: [
            {
              breakpoint: 992,
                settings: {
                    dots: true,
                    arrows: false
                }
            }
        ]
  });

  $('ul.catalog__tabs').on('click', 'li:not(.catalog__tab_active)', function() {
    $(this)
      .addClass('catalog__tab_active').siblings().removeClass('catalog__tab_active')
      .closest('div.container').find('div.catalog__content').removeClass('catalog__content_active').eq($(this).index()).addClass('catalog__content_active');
  });

  function toggleSlide(item) {
    $(item).each(function(i) {
      $(this).on('click', function(e) {
        e.preventDefault();
        $('.catalog-item__content').eq(i).toggleClass('catalog-item__content_active');
        $('.catalog-item__list').eq(i).toggleClass('catalog-item__list_active');
      })
    });
  };

  toggleSlide('.catalog-item__link');
  toggleSlide('.catalog-item__back')  
  
  //Modal

  $('[data-modal=consultation]').on('click', function() {
    $('.overlay, #consultation').fadeIn('slow');
  });
 
  $('.modal__close').on('click', function() {
    $('.overlay, #consultation, #order, #thanks').fadeOut('slow');
  });

  $('.button_mini').each(function(i) {
    $(this).on('click', function() {
      $('#order .modal__descr').text($('.catalog-item__subtitle').eq(i).text());
      $('.overlay, #order').fadeIn('slow');
    });
  });

  //Validate

  function validate(form) {
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
          required: "Пожалуйста, введите своё имя",
          minlength: jQuery.validator.format("Введите не менее {0} символов!")
        },
        phone: {
          required: "Пожалуйста, введите свой номер телефона!"
        },
        email: {
          required: "Пожалуйста, введите свою почту!",
          email: "Введите почтовый адрес почты в формате name@mail.ru"
        }
      },
      submitHandler: function(form, e) {
        e.preventDefault();
        console.log("Form submitted");
        $.ajax({
          type: "POST",
          url: "mailer/smart.php",
          data: $(this).serialize()
        }).done(function() {
          $(this).find("input").val("");
          $('#consultation, #order').fadeOut().validate('#consultation-form');
          $('.overlay, #thanks').fadeIn('slow');
          $('form').trigger('reset');
        });
        return false;
      }
    });
  };

  validate('#consultation-form');
  validate('#consultation .feed-form');
  validate('#order .feed-form');

  $("input[name=phone]").mask("+7 (999) 999-99-99");

  // $('form').submit(function(e) {
  //   e.preventDefault();
  //   $.ajax({
  //     type: "POST",
  //     url: "mailer/smart.php",
  //     data: $(this).serialize()
  //   }).done(function() {
  //     $(this).find("input").val("");
  //     $('#consultation, #order').fadeOut().validate('#consultation-form');
  //     $('.overlay, #thanks').fadeIn('slow');
  //     $('form').trigger('reset');
  //   });
  //   return false;
  // }); 

//  $(sent). {
//     if ($('form').valid()) {
//       $('form').submit(function(e) {
//         e.preventDefault();
//         $.ajax({
//           type: "POST",
//           url: "mailer/smart.php",
//           data: $(this).serialize()
//         }).done(function() {
//           $(this).find("input").val("");
//           $('#consultation, #order').fadeOut().validate('#consultation-form');
//           $('.overlay, #thanks').fadeIn('slow');
//           $('form').trigger('reset');
//         });
//         return false;
//       }); 
//   } else {
//     console.log('ERROR')
//   };
//  }


  // Smooth scroll and page up

  $(window).scroll(function() {
    if ($(this).scrollTop() > 1600) {
      $('#scroll').addClass('scrollUp_flex').removeClass('scrollUp');
    } else {
      $('#scroll').addClass('scrollUp').removeClass('scrollUp_flex');
    }
  });

  // Slow scroll

  $("a[href^='#up']").click(function(){
    var _href = $(this).attr("href");
    $("html, body").animate({scrollTop: $(_href).offset().top+"px"});
    return false;
  });

  // Wow init
  
  new WOW().init();

});
