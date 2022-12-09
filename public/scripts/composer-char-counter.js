$(document).ready(function() {

  // word is counted when key is released and when exceeds max number of words allowed, counter will be red and negative
  $('textarea').keyup(function(e) {

    let charsEntered = $(this).val().length;
    $('.counter').text(140 - charsEntered);

    if (charsEntered >= 140) {
      return $('.counter').css("color", "#fe6f5e");
    }
    $('.counter').css("color", "#545149");
  });
});