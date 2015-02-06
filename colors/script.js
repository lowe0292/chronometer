$(document).ready(function () {
  var repaint = function () {
    w = $(window).width();
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

    var extraX = width - minDimension;
    var extraY = height - minDimension;

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



  var colors = new Array(
    [255,0,0],
    [255,0,0],
    [85,26,139],
    [85,26,139],
    [0,0,0],
    [0,0,0],
    [212,175,55],
    [212,175,55],
    [0,255,204],
    [0,255,204],
    [204,255,255],
    [204,255,255]);

    var step = 0;
    //color table indices for: 
    // current color left
    // next color left
    // current color right
    // next color right
    var colorIndices = [0,1,2,3];

    //transition speed
    var gradientSpeed = 0.01;

    function updateGradient()
    {

      if ( $===undefined ) return;

      var c0_0 = colors[colorIndices[0]];
      var c0_1 = colors[colorIndices[1]];
      var c1_0 = colors[colorIndices[2]];
      var c1_1 = colors[colorIndices[3]];

      var istep = 1 - step;
      var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
      var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
      var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
      var color1 = "rgb("+r1+","+g1+","+b1+")";

      var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
      var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
      var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
      var color2 = "rgb("+r2+","+g2+","+b2+")";

      $('.logo').css({
        background: "-webkit-gradient(linear, left top, right top, from("+color1+"), to("+color2+"))"}).css({
          background: "-moz-linear-gradient(left, "+color1+" 0%, "+color2+" 100%)"});

          step += gradientSpeed;
          if ( step >= 1 )
            {
              step %= 1;
              colorIndices[0] = colorIndices[1];
              colorIndices[2] = colorIndices[3];

              //pick two new target color indices
              //do not pick the same as the current one
              colorIndices[1] = ( colorIndices[1] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;
              colorIndices[3] = ( colorIndices[3] + Math.floor( 1 + Math.random() * (colors.length - 1))) % colors.length;

            }
    }

    setInterval(updateGradient,10);

});
