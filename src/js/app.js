$(function() {
  /*
   * Nav bar JS
   */
  $('#open-search').click(function() {
    $('.nav-wrapper').addClass('search-open');
    $('.nav-search input').focus();
  });
  $('#close-search').click(function() {
    $('.nav-wrapper').removeClass('search-open');
    $('.nav-search input').val('');
  });
  $('#back-button').click(function() {
    window.history.back();
  });

  /*
   * Side-menu JS
   */
  var menuOpen = function() {
    return $('aside').offset().left >= 0;
  };
  var startTouch;
  var onTouchMove = function(e) {
    var dx = e.touches[0].pageX - startTouch;
    if (Math.abs(dx) < 50) {
      return;
    }
    if(dx < 0){
      $('#app-container').removeClass('menu-open');
    } else {
      $('#app-container').addClass('menu-open');
    }
  };
  var onTouchEnd = function() {
    $('#app-container').unbind('touchmove', onTouchMove);
    $('#app-container').unbind('touchend', onTouchEnd);
  };
  $('#app-container').on('touchstart', function(e) {
    if (e.touches[0].pageX < 50 && !menuOpen()) {
      startTouch = e.touches[0].pageX;
      $('#app-container').on('touchmove', onTouchMove);
      $('#app-container').on('touchend', onTouchEnd);
    }
  });

  $('#body-shadow').on('click', function() {
    $('#app-container').removeClass('menu-open');
  });
  $('#toggle-menu').on('click', function() {
    if (!menuOpen()) {
      $('#app-container').addClass('menu-open');
    }
  });


  /*
   * Options menu things
   */
  $('#toggle-options').on('click', function() {
    $('.options-container').addClass('hidden');
    $('#global-options').removeClass('hidden');
  });
  $('.options-container li').on('click', function() {
    $('.options-container').addClass('hidden');
  });


  /*
   * Podcast page
   */
  $('.podcast-description .description').css('display', 'none');
  $('.podcast-action #read-less').css('display', 'none');
  $('#read-more').click(function() {
    $('.podcast-description .description').css('display', 'block');
    $('.podcast-description .summary').css('display', 'none');
    $('.podcast-action #read-more').css('display', 'none');
    $('.podcast-action #read-less').css('display', 'block');
  });
  $('#read-less').click(function() {
    $('.podcast-description .description').css('display', 'none');
    $('.podcast-description .summary').css('display', 'block');
    $('.podcast-action #read-more').css('display', 'block');
    $('.podcast-action #read-less').css('display', 'none');
  });

  $('.play-button').click(function() {
    $(this.parentElement).toggleClass("playing");
    $('#player').addClass('mini');
  });

  $('.secondary-content').click(function() {
    $('.episode-options').addClass('hidden');
    $(this.parentElement).find('.episode-options').removeClass('hidden');
  });

  var subscribe = $('.subscribe-button.subscribe');
  var unsubscribe = $('.subscribe-button.unsubscribe');
  subscribe.tooltip({
    delay: 50,
    tooltip: "Add to My Podcasts",
    position: "left"
  });
  unsubscribe.tooltip({
    delay: 50,
    tooltip: "Remove from My Podcasts",
    position: "left"
  });
  subscribe.click(function() {
    Materialize.toast('Added to My Podcasts', 4000);
    $('.subscribe-button').toggleClass('hidden');
  });
  unsubscribe.click(function() {
    Materialize.toast('Removed from My Podcasts', 4000);
    $('.subscribe-button').toggleClass('hidden');
  });

  /*
   * Player things
   */
  $('#player .title, #player .expand-button, #player .collapse-button').click(function() {
    $('#player').toggleClass('maxi');
    $('#player').toggleClass('mini');
  });

  /*
   * Progress slider
   */
  var lastPosition;
  var calcPercent = function(newPos) {
    var pos = newPos - $('.progress-container').offset().left;
    pos = (pos / $('.progress-container').width() * 100);
    pos = (pos > 100) ? 100 : pos;
    pos = (pos < 0) ? 0 : pos;
    return pos + "%";
  };
  var moveProgress = function(newPos) {
    $('.progress .determinate').css('width', newPos);
    $('.thumb').css('left', 'calc(' + newPos +' - ' + $(".thumb")[0].offsetHeight / 2 + 'px)');
    lastPosition = newPos;
  };
  var rewindAudio = function() {
    console.log('rewind to position', lastPosition);
  };

  // Mouse/Touch click event
  $('.progress-wrapper').click(function(e) {
    if (e.type === "click") {
      moveProgress(calcPercent(e.pageX));
      rewindAudio();
    }
  });

  // Mouse drag events
  var onMouseMove = function(e) {
    moveProgress(calcPercent(e.pageX));
  };
  var onMouseUp = function(e) {
    rewindAudio();
    $('.thumb').removeClass('focus');
    $(document).unbind('mousemove', onMouseMove);
    $(document).unbind('mouseup', onMouseUp);
  };
  $('.thumb').on('mousedown', function(e) {
    $(this).addClass('focus');
    $(document).on('mousemove', onMouseMove);
    $(document).on('mouseup', onMouseUp);
  });

  // Touch drag events
  var startOffset;
  $('.thumb').on('touchstart', function(e) {
    e.stopPropagation();
    $(this).addClass('focus');
  });
  $('.thumb').on('touchmove', function(e) {
    moveProgress(calcPercent(e.touches[0].pageX));
  });
  $('.thumb').on('touchend', function() {
    rewindAudio();
    $(this).removeClass('focus');
  });
});
