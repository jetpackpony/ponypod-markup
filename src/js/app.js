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
    e.preventDefault();
  });
  $('#toggle-menu').on('click', function() {
    $('body').addClass('menu-open');
    e.preventDefault();
  });

  // Toggle podcast details
  $('.toggle-button').on('click', function() {
    $('.podcast-details').toggleClass('expanded');
    e.preventDefault();
  });

  // Toggle options menu
  $('#options-menu').on('click', function() {
    $('.options-list').toggleClass('hidden');
    e.preventDefault();
  });

  // Toggle play pause
  $('a.play').on('click', function(e) {
    e.preventDefault();
    e.stopPropagation();
    $(this).toggleClass('now-playing');
    if ($(this).parent('.episode-line')) {
      $('#player').removeClass('hidden');
    }
  });

  // Go to episode page
  $('.episode-line').on('click', function() {
    window.location.href = "/episode.html";
  });

  // Expand the player
  $('.player-collapsed .episode').on('click', function() {
    $('#player').removeClass('hidden');
    //$('#player').removeClass('player-collapsed');
    $('#player').addClass('player-expanded');
  });
});
