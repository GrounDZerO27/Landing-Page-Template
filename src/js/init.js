$(document).ready(function(){
  console.log('init..');

  $('.tabs').tabs();

  $('.dropdown-trigger').dropdown();
  

  (function($){
    $(function(){
  
      $('.sidenav').sidenav();
  
    }); // end of document ready
  })(jQuery); // end of jQuery name space

  var hoverItem = $('.img-hover-item'),
      hoverBtn = $('.img-hover');

  $(hoverItem).hide();

  $(hoverBtn).click(function() {
    $(hoverItem).show();
  });
  
  $(hoverBtn).mouseover(function(){
    $(hoverItem).show();
  });
  $(".img-hover").mouseout(function(){
      $(hoverItem).hide();
  });

  
});


$(".dropdown-trigger").click(function() {
  console.log('clicked');

  setTimeout(function() {
    $('.dropdown-content').css({
      'top': '80px',
      'left': '-45px',
      'width': '150px',

    });

    console.log('style init');
  }, 10);

});