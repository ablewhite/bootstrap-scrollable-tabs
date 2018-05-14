/*global $*/
/*! %DESCRIPTION% v%VERSION%
    http://www.github.com/ablewhite/%NAME%
    Copyright (c)%COPYRIGHT_YEAR% Conan Ablewhite */
"use strict";

function scrollTabs($tabs, offset) {
    var tabs = $tabs[0],
        visibleWidth = $tabs.outerWidth(),
        fullWidth = tabs.scrollWidth,
        scrollPos = tabs.scrollLeft,
        newPos;

    if (offset < 0) {
        newPos = scrollPos - Math.min(scrollPos, visibleWidth)
    } else {
        newPos = scrollPos + Math.min(fullWidth - scrollPos, visibleWidth)
    }

    $tabs.animate({
        scrollLeft: newPos
    }, 750);

}

$(function() {
    var scrollableSelector = ".nav-tabs.scrollable",
        scrollLeftClass = "scroll-left",
        scrollRightClass = "scroll-right",
        invisibleClass = "invisible",
        noScrollClass = "no-scroll",
        scrollableTabs = $(scrollableSelector);

    $.each(scrollableTabs, function(index, tabs) {
        var $tabs = $(tabs),
            bootstrapVersion = $.fn.tab.Constructor.VERSION,
            bootstrapMajor;

        if (bootstrapVersion && bootstrapVersion.length) {
            bootstrapMajor = parseInt(bootstrapVersion.charAt(0), 10);
        }

        switch (bootstrapMajor) {
            case 3:
                // bootstrap 3 requires tabs to be wired up manually
                $tabs.find("a").click(function (e) {
                    e.preventDefault();
                    $(this).tab('show')
                });
                break;

            case 4:
                // sticky tabs are based on an active class set on the parent LI;
                // Bootstrap 4 sets this on the link itself, so fix this as necessary
                $.each($tabs.find("a"), function (j, link) {
                    var $link = $(link);

                    if ($link.hasClass("active")) {
                        var parentLI = $link.parent("li");
                        parentLI.addClass("active");
                    }

                });
                break;
        }

        $tabs.on("scroll", function(evt) {
            var offset = evt.target.scrollLeft,
                tabs = $(evt.target),
                parent = tabs.closest(scrollableSelector),
                wrapper = parent.parent(),
                left = wrapper.find("." + scrollLeftClass).first(),
                right = wrapper.find("." + scrollRightClass).first(),
                fullWidth = parent[0].scrollWidth,
                visibleWidth = parent.outerWidth();

            // check - scrollbar necessary?
            if (visibleWidth >= fullWidth) {
                tabs.addClass(noScrollClass);
                left.addClass(invisibleClass);
                right.addClass(invisibleClass);
                return;
            }

            tabs.removeClass(noScrollClass);

            // check - scrolled to extents?
            if (offset === 0) {
                left.addClass(invisibleClass);
            } else {
                left.removeClass(invisibleClass);
            }

            if (offset + visibleWidth === fullWidth) {
                right.addClass(invisibleClass);
            } else {
                right.removeClass(invisibleClass);
            }

        });

        // wrap tabs with container element
        var $wrapper = $tabs.wrap("<div class='scrollable-wrapper'></div>"),
            left = document.createElement("a"),
            $left = $(left),
            leftSpan = document.createElement("span");

        // insert left scroll button
        $left.prop("href", "#");
        $left.addClass(scrollLeftClass);

        // .fa for FontAwesome v4.x, .fas for FontAwesome v5.x
        $(leftSpan).addClass("fa fas fa-angle-left");

        $left.append(leftSpan);
        $wrapper.before(left);

        $left.on("click", function (e) {
            e.preventDefault();
            scrollTabs($tabs, -1);
        });

        // insert right scroll button
        var right = document.createElement("a"),
            $right = $(right),
            rightSpan = document.createElement("span");

        $right.prop("href", "#");
        $right.addClass(scrollRightClass);

        // .fa for FontAwesome v4.x, .fas for FontAwesome v5.x
        $(rightSpan).addClass("fa fas fa-angle-right");

        $right.append(rightSpan);
        $wrapper.after(right);

        $right.on("click", function (e) {
            e.preventDefault();
            scrollTabs($tabs, 1);
        });

        // update arrows
        $tabs.trigger("scroll");

        // bootstrap 4 places the .active class on the link (as opposed to the parent LI, as in BS3)
        $('a[data-toggle="tab"]').on('shown.bs.tab', function (e) {
            var prevLI = $(e.relatedTarget).parent(".nav-item"),
                newLI = $(e.target).parent(".nav-item");

            prevLI.removeClass("active");
            newLI.addClass("active");
        });

        // currently assumes only window resize events cause tabs to be resized;
        // if elements can be individually resized within the document,
        // consider using https://github.com/marcj/css-element-queries instead
        $(window).resize(function() {
            var scrollableTabs = $(scrollableSelector);

            $.each(scrollableTabs, function(index, tabs) {
                $(tabs).trigger("scroll");
            });

        });

    });

});
