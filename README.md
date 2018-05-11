### Bootstrap scrollable tabs

Prevents Bootstrap tab controls (version 3 and 4) from automatically wrapping when there is insufficient room to render all tab links on a single line.

## Demo

* Bootstrap 3-specific demo is available at http://www.ablewhite.com/github/bootstrap-scrollable-tabs/index-bs3.html
* Bootstrap 4-specific demo is available at http://www.ablewhite.com/github/bootstrap-scrollable-tabs/index-bs4.html

## Usage

* First add references to `bootstrap-scrollable-tabs.js` and `bootstrap-scrollable-tabs.css` to your page
* To enable scrolling support for a specific tab control, add the `scrollable` class to the parent `<ul class="nav nav-tabs">` element

## Benefits

* When applied, scroll left / right links will appear to each side of the tab control if wrapping would normally occur
* Click left / right to smooth scroll a page at a time
* Note that the active tab will scroll with all other tabs as usual, but will dock and remain visible instead of becoming hidden (currently unsupported on IE)

## Dependencies

* Bootstap v3.3.7 / v4.x
* jQuery (not slim builds, as currently the script uses the jQuery `animate` method to smoothly scroll the tab control)

## Licence

* MIT
