(function (window) {
    "use strict";
    window.SIO = window.SIO || {};
    window.SIO.tracking = {
        timing: function (variable, category, label) {
            window.SIO.tracking.safelyPushEvent(function () {
                // http://www.html5rocks.com/en/tutorials/webperformance/basics/
                // http://blog.d-bow.com/post/17368332231/measuring-page-load-times-navigation-timing-api-vs
                var e = {event: 'timing', variable: variable, value: (Date.now() - performance.timing.fetchStart)}
                if (category) {
                    e.category = category;
                }
                if (label) {
                    e.label = label;
                }
                return e
            });
        },
        event: function (category, action, label, value) {
            var e = {event: 'event', category: category}
            if (action) {
                e.action = action;
            }
            if (label) {
                e.label = label;
            }
            if (value) {
                e.value = value;
            }
            window.SIO.tracking.safelyPushEvent(e);
        },
        safelyPushEvent: function (event) {
            try {
                window.dataLayer = window.dataLayer || [];
                if(typeof event === 'function'){
                    event=event()
                }
                window.dataLayer.push(event)
            } catch (ignore) {
            }
        }
    }
}(window));