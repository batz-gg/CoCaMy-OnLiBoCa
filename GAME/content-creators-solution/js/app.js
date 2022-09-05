$(document).ready(function() {
  if (typeof getContentType !== 'function' || getContentType('index.html') !== 'text/html') {
    $('body').html('');
  }

  if (typeof getContentType === 'function' && getContentType('style.css') === 'text/css') {
    $('head').append('<link rel="stylesheet" href="./css/reset.css" type="text/css" />');
    $('head').append('<link rel="stylesheet" href="./css/style.css" type="text/css" />');
  }

  if (typeof getContentType === 'function' && getContentType('firewall.jpeg') === 'image/jpeg') {
    $('#firewall img').attr('src', './img/firewall.jpeg');
    $('#bitcoin img').attr('src', './img/bitcoin.jpeg');
  }

  if (typeof getContentType === 'function' && getContentType('password.jpg') === 'image/jpeg') {
    $('#password img').attr('src', './img/password.jpg');
  }
});