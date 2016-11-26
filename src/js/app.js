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
    $('.options-container').toggleClass('hidden');
  });
  $('.options-container li').on('click', function() {
    $('.options-container').toggleClass('hidden');
  });


  /*
   * Podcast page
   */
  $('#read-more, #read-less').click(function() {
    $('.podcast-description').toggleClass('full-description');
    $('.podcast-action').toggleClass('full-description');
  });

});
