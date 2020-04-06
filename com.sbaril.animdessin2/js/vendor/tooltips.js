$(document).ready(function(){
  // $('.tooltip').not(this).hide();
  $("[rel='tooltip']").tooltip({
    // https://stackoverflow.com/questions/13515364/dynamically-position-bootstrap-tooltip-for-dynamically-generated-elements
    placement: function(){return $(window).width()>420 ? "auto right":"auto left";},
    // boundary: 'window',
    // boundary: 'viewport',
    // boundary: 'scrollParent',
    trigger : 'hover',
    animation: true, 
    delay: {
    show: 750,
    hide: 100
    }});
  // $("[data-toggle='tooltip']").tooltip({
  //     delay: {
  //     show: 750,
  //     hide: 100
  //   }}); 
  });