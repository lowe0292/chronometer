$(document).ready(function () {
  var repaint = function () {
    w = $(window).width();
    console.log(w);
    //get viewport height and width
    var height = $(window).height();
    var width = $(window).width();

    var minDimension = Math.min(height, width);

    var $logo = $('.logo');
    var $topLeft = $('.top-left');
    var $topRight = $('.top-right');
    var $bottomLeft = $('.bottom-left');
    var $bottomRight = $('.bottom-right');

    // size everything
    $logo.height(minDimension * 3 / 5);
    $logo.width(minDimension * 3 / 5);
    $topLeft.height(minDimension * 1 / 5);
    $topLeft.width(minDimension * 1 / 5);
    $topRight.height(minDimension * 1 / 5);
    $topRight.width(minDimension * 1 / 5);
    $bottomLeft.height(minDimension * 1 / 5);
    $bottomLeft.width(minDimension * 1 / 5);
    $bottomRight.height(minDimension * 1 / 5);
    $bottomRight.width(minDimension * 1 / 5);

    // position everything
    if (width > height) {
      // landscape orientation
      var extra = width - height;

    }

    var extraX = width - minDimension;
    var extraY = height - minDimension;

    console.log('extraX',extraX);
    console.log('extraY',extraY);

    $logo.offset({ left: minDimension * 1 / 5 + extraX / 2, top: minDimension * 1 / 5 + extraY / 2 });
    $topLeft.offset({ left: minDimension * 1 / 5 + extraX / 2, top: minDimension * 1 / 5 + extraY / 2 });
    $topRight.offset({ left: minDimension * 3 / 5 + extraX / 2, top: minDimension * 1 / 5 + extraY / 2 });
    $bottomLeft.offset({ left: minDimension * 1 / 5 + extraX / 2, top: minDimension * 3 / 5 + extraY / 2 });
    $bottomRight.offset({ left: minDimension * 3 / 5 + extraX / 2, top: minDimension * 3 / 5 + extraY / 2 });
  }

  $(window).resize(function () {
    repaint();
  });

  repaint();
});
