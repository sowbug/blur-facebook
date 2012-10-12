var replacedNames;
var colorIndex;

var COLOR_COUNT = 0;
var COLORS = [];

function componentToHex(c) {
  var hex = c.toString(16);
  return hex.length == 1 ? "0" + hex : hex;
}

function rgbToHex(r, g, b) {
  return "#" + componentToHex(r) + componentToHex(g) + componentToHex(b);
}

function pushColor(r, g, b) {
  COLORS.push(rgbToHex(r, g, b));
}

function genColorBunch(i) {
  pushColor(0, 0, i);
  pushColor(0, i, 0);
  pushColor(0, i, i);
  pushColor(i, 0, 0);
  pushColor(i, 0, i);
  pushColor(i, i, 0);
  pushColor(i, i, i);
}

function genColors() {
  pushColor(0, 0, 0);
  genColorBunch(255);
  genColorBunch(128);
  genColorBunch(64);
  genColorBunch(192);
  genColorBunch(32);
}

function getNextColor() {
  var c = COLORS[colorIndex];
  if (colorIndex++ >= COLORS.length) {
    colorIndex = 0;
  }
  return c;
}

function getNextReplacement() {
  var color = getNextColor();
  var replacement =
      '<span style="color:' + color + ';background-color:' +
      color + '">xxxxxxxx</span>';
  return replacement;
}

function resetMaps() {
  replacedNames = {};
  colorIndex = 0;
}

var replaceName = function(e) {
  var name = e.text();
  var replacement = replacedNames[name];
  if (replacement == null) {
    replacement = getNextReplacement();
    replacedNames[name] = replacement;
  }
  e.replaceWith(replacement);
};

var doNameReplacement = function() {
  var elements = $('a.UFICommentActorName');
  elements = $.merge(elements, $('.actorName > a'));
  elements = $.merge(elements, $('a.passiveName'));

  $('a').each(function() {
    var hovercard = $(this).attr('data-hovercard');
    if (hovercard) {
      if (hovercard.match(/\/user.php\?/)) {
	elements.push($(this));
      }
    }
  });

  $('li.UFILikeSentence a').each(function() {
    if ($(this).attr('data-hovercard')) {
      elements.push($(this));
    }
  });

  $.unique(elements).each(function(index) {
    replaceName($(this));
  });
};

function doImageBlurring() {
  $('img.profilePic').blurjs( { radius: 10 } );
  $('img.UFIActorImage').blurjs( { radius: 10 } );
  $('a.actorPhoto').blurjs( { radius: 10 } );
}

$(document).ready(function() {
  genColors();
  resetMaps();
  $('#pageHead').hover(function() {
    doNameReplacement();
    doImageBlurring();
  });
});
