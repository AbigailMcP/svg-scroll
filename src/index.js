require("file-loader?name=index.html!./index.html");
import './assets/stylesheets/scroll.css';

// Get SVG path and its length
const path = document.getElementById('squiggle-path');
const length = path.getTotalLength();

// Make the SVG path dashed, and set the length of each dash to the length of
// the whole path (e.g. one long dash)
path.style.strokeDasharray = length + ' ' + length;
// Then offset this one dash by the length of the SVG so that it disappears.
path.style.strokeDashoffset = length;
path.getBoundingClientRect();

window.addEventListener("scroll", function(e) {

  // Calculate how far down the page has been scrolled
  let scrollPercentage = getScrollPercent();
  // Calculate length to offset the dash
  let offset = length * scrollPercentage;

  // When scrollPercentage = 0, path not visible
  // When scrollPercentage = 1, offset = length, path completely visible
  path.style.strokeDashoffset = length - offset;
});

function getScrollPercent() {
  const doc = document.documentElement;
  const body = document.body;
  return (doc.scrollTop + body.scrollTop) / (doc.scrollHeight - doc.clientHeight)
}
