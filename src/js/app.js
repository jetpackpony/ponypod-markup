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

  /*
   * Side-menu JS
   */
  var startTouch;
  var onTouchMove = function(e) {
    var dx = e.touches[0].pageX - startTouch;
    if (Math.abs(dx) < 50) {
      return;
    }
    if(dx < 0){
      $('body').removeClass('menu-open');
    } else {
      $('body').addClass('menu-open');
    }
  };
  var onTouchEnd = function() {
    $('body').unbind('touchmove', onTouchMove);
    $('body').unbind('touchend', onTouchEnd);
  };
  $('body').on('touchstart', function(e) {
    if (e.touches[0].pageX < 50) {
      startTouch = e.touches[0].pageX;
      $('body').on('touchmove', onTouchMove);
      $('body').on('touchend', onTouchEnd);
    }
  });

  $('#body-shadow').on('click', function() {
    $('body').removeClass('menu-open');
  });
  $('#toggle-menu').on('click', function() {
    $('body').addClass('menu-open');
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
  $('#read-more, #read-less').click(function() {
    $('.podcast-description').toggleClass('full-description');
    $('.podcast-action').toggleClass('full-description');
  });

  $('.play-button').click(function() {
    $(this.parentElement).find('.play-button').toggleClass("hidden");
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
  var progressWidth = $('.progress-container').width();
  var thumbHalf = $(".thumb")[0].offsetHeight / 2;
  var lastPosition;
  var calcPercent = function(newPos) {
    var pos = (newPos / progressWidth * 100);
    pos = (pos > 100) ? 100 : pos;
    pos = (pos < 0) ? 0 : pos;
    return pos + "%";
  };
  var moveProgress = function(newPos, moveThumb) {
    $('.progress .determinate').css('width', newPos);
    if (moveThumb) {
      $('.thumb').css('left', 'calc(' + newPos +' - ' + thumbHalf + 'px)');
    }
    lastPosition = newPos;
  };
  var rewindAudio = function() {
    console.log('rewind to position', lastPosition);
  };

  // Mouse/Touch click event
  $('.progress-wrapper').click(function(e) {
    if (e.type === "click") {
      moveProgress(calcPercent(e.offsetX), true);
      rewindAudio();
    }
  });

  // Mouse drag events
  var onMouseMove = function(e) {
    moveProgress(calcPercent(e.pageX), true);
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
    startOffset = e.touches[0].pageX - $(this).offset().left;
    $(this).addClass('focus');
  });
  $('.thumb').on('touchmove', function(e) {
    moveProgress(calcPercent(e.touches[0].pageX - startOffset), true);
  });
  $('.thumb').on('touchend', function() {
    rewindAudio();
    $(this).removeClass('focus');
  });
});
