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



});
