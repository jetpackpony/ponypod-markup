$(function() {
  // Menu open/close listeners
  $('body').swipe(function(e, dx, dy) {
    if (Math.abs(dx) < Math.abs(dy) * 10 ) {
      return;
    }
    if(dx < 0){
      $('body').removeClass('menu-open');
    } else {
      $('body').addClass('menu-open');
    }
  });
  $('body > .shadow').on('click', function() {
    $('body').removeClass('menu-open');
  });
  $('#toggle-menu').on('click', function() {
    $('body').addClass('menu-open');
  });

  // Toggle podcast details
  $('.toggle-button').on('click', function() {
    $('.podcast-details').toggleClass('expanded');
  });

  // Toggle options menu
  $('#options-menu').on('click', function() {
    $('.options-list').toggleClass('hidden');
  });
});
