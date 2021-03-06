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
  genColorBunch(96);
  genColorBunch(160);
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
  var elements = $('#contentArea a.UFICommentActorName');
  elements = $.merge(elements, $('#contentArea .actorName > a'));
  elements = $.merge(elements, $('#contentArea a.passiveName'));

  $('#contentArea a').each(function() {
    var hovercard = $(this).attr('data-hovercard');
    if (hovercard) {
      if (hovercard.match(/\/user.php\?/)) {
        elements.push($(this));
      }
    }
  });

  $('#contentArea li.UFILikeSentence a').each(function() {
    if ($(this).attr('data-hovercard')) {
      elements.push($(this));
    }
  });

  $.unique(elements).each(function(index) {
    replaceName($(this));
  });
};

function doImageBlurring() {
  images = $('.actorPhoto, .UFIActorImage, .profilePic');
  images = $.merge(images, $('.friendPhoto, .uiScaledImageContainer img'));
  images = $.merge(images, $('.fbFriendsOnlineFacepileItem img'));
  images = $.merge(images, $('.fbChatOrderedList img'));
  images.css(
    '-webkit-filter', 'blur(5px)');
  }

  genColors();
  resetMaps();
  doNameReplacement();
  doImageBlurring();
