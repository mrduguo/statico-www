!function ($) {
  'use strict';

  $(function () {


      // Scrollspy
      var $window = $(window)
      var $body = $(document.body)

      $body.scrollspy({
          target: '.page-sidebar'
      })
      $window.on('load', function () {
          $body.scrollspy('refresh')
      })

      // Kill links
      $('.content-body [href=#]').click(function (e) {
          e.preventDefault()
      })


      // Sidenav affixing
      setTimeout(function () {
          var $sideBar = $('.page-sidebar')

          $sideBar.affix({
              offset: {
                  top: function () {
                      var offsetTop = $sideBar.offset().top
                      return (this.top = offsetTop-18)
                  },
                  bottom: function () {
                      return (this.bottom = $('.page-footer').outerHeight(true))
                  }
              }
          })
      }, 100);
  });


}(jQuery)
