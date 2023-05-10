jQuery(document).ready(function($) { 
  $('.tabs').tabs();
	$('.dropdown-trigger').dropdown();

  (function($) {
		$(function() {
			$('.sidenav').sidenav();
	  })(jQuery); 
  });

  //Floating Button
  var hoverItem = $('.img-hover-item'),
		  hoverBtn = $('.img-hover');

      $(hoverItem).hide();

    $(hoverBtn).click(function() {
      $(hoverItem).show();
    });

    $(hoverBtn).mouseover(function() {
      $(hoverItem).show();
    });
    $(".img-hover").mouseout(function() {
      $(hoverItem).hide();
    });

    var screenWidth = $(window).width();
    // banner

    var banner_swiper = new Swiper('.banner_swiper', {
      pagination: '.banner_swiper .swiper-pagination',
      paginationClickable: true,
      autoplay: 5000,
      speed: 800,
      loop: true
    });

    var banner_prev = $('.banner_swiper .swiper_prev');
    
    banner_prev.on('click', function(e) {
      e.preventDefault();
      banner_swiper.swipePrev();
    });

    var banner_next = $('.banner_swiper .swiper_next');
    banner_next.on('click', function(e) {
      e.preventDefault();
      banner_swiper.swipeNext();
    });

    $(window).resize(function() {
      screenWidth = $(window).width();
    });

    // 信息披露轮播
    var notice_swiper = new Swiper('.notice_swiper', {
      mode: 'vertical',
      autoplay: 5000,
      speed: 800,
      loop: true
    });

    $(".dropdown-trigger").click(function() {
      setTimeout(function() {
        $('.dropdown-content').css({
          'top': '80px',
          'left': '-45px',
          'width': '150px',
        });
      }, 10);
    });
});
	
