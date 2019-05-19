/**
 * Custom Script by Wired Dots (https://wireddots.com)
 * Copyright 2018
 */
import $ from "jquery";
import "bootstrap";
import "./scss/index.scss";

$(function() {
  // init tooltip & popovers
  $('[data-toggle="tooltip"]').tooltip();
  $('[data-toggle="popover"]').popover();

  //page scroll
  $("a.page-scroll").bind("click", function(event) {
    let $anchor = $(this);
    $("html, body")
      .stop()
      .animate(
        {
          // @ts-ignore
          scrollTop: $($anchor.attr("href")).offset().top
        },
        1000
      );
    event.preventDefault();
  });

  //toggle scroll menu
  let scrollTop: Number = 0;
  $(window).scroll(function() {
    let scroll = $(window).scrollTop() || 0;
    //adjust menu background
    if (scroll > 80) {
      if (scroll > scrollTop) {
        $(".smart-scroll")
          .addClass("scrolling")
          .removeClass("up");
      } else {
        $(".smart-scroll").addClass("up");
      }
    } else {
      // remove if scroll = scrollTop
      $(".smart-scroll")
        .removeClass("scrolling")
        .removeClass("up");
    }

    scrollTop = scroll;

    // adjust scroll to top
    if (scroll >= 600) {
      $(".scroll-top").addClass("active");
    } else {
      $(".scroll-top").removeClass("active");
    }
    return false;
  });

  // scroll top top
  $(".scroll-top").click(function() {
    $("html, body")
      .stop()
      .animate(
        {
          scrollTop: 0
        },
        1000
      );
  });
});
