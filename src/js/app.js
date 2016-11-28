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
  $(document).swipe(function(e, dx, dy) {
    console.log("swipe");
    if (Math.abs(dx) < Math.abs(dy) * 10 ) {
      return;
    }
    if(dx < 0){
      $('body').removeClass('menu-open');
    } else {
      $('body').addClass('menu-open');
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
});
