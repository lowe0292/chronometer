$(document).ready(function () {
  var height;
  var width;
  var unit = 100,
    canvas,
    context,
    canvas2,
    context2,
    draw,
    xAxis,
    yAxis;
  var $canvas = $(".canvas");
  var $top = $("#top");
  var $bottom = $("#bottom");
  var $left = $("#left");
  var $right = $("#right");
  var $topLeft = $("#top-left");
  var $topRight = $("#top-right");
  var $bottomLeft = $("#bottom-left");
  var $bottomRight = $("#bottom-right");
  var $dividerOne = $("#divider-one");
  var $dividerTwo = $("#divider-two");
  var $dividerThree = $("#divider-three");
  var $dividerFour = $("#divider-four");
  var $dividerMiddle = $("#divider-middle");

  var repaint = function () {
    //get viewport height and width
    height = $(window).height();
    width = $(window).width();

    var minDimension = Math.min(height, width);
    var extraX = width - minDimension;
    var extraY = height - minDimension;

    $canvas.height((minDimension * 3) / 5);
    $canvas.width((minDimension * 3) / 5);
    $canvas.offset({
      top: (minDimension * 1) / 5 + extraY / 2,
      left: (minDimension * 1) / 5 + extraX / 2,
    });
    $top.height((minDimension * 1) / 5 + extraY / 2);
    $top.width(width);
    $bottom.height((minDimension * 1) / 5 + extraY / 2);
    $bottom.width(width);
    $bottom.offset({ top: (minDimension * 4) / 5 + extraY / 2 });
    $left.height(height);
    $left.width((minDimension * 1) / 5 + extraX / 2);
    $right.height(height);
    $right.width((minDimension * 1) / 5 + extraX / 2);
    $right.offset({ left: (minDimension * 4) / 5 + extraX / 2 });
    $topLeft.height((minDimension * 1) / 5);
    $topLeft.width((minDimension * 1) / 5);
    $topLeft.offset({
      top: (minDimension * 1) / 5 + extraY / 2,
      left: (minDimension * 1) / 5 + extraX / 2,
    });
    $topRight.height((minDimension * 1) / 5);
    $topRight.width((minDimension * 1) / 5);
    $topRight.offset({
      top: (minDimension * 1) / 5 + extraY / 2,
      left: (minDimension * 3) / 5 + extraX / 2,
    });
    $bottomLeft.height((minDimension * 1) / 5);
    $bottomLeft.width((minDimension * 1) / 5);
    $bottomLeft.offset({
      top: (minDimension * 3) / 5 + extraY / 2,
      left: (minDimension * 1) / 5 + extraX / 2,
    });
    $bottomRight.height((minDimension * 1) / 5);
    $bottomRight.width((minDimension * 1) / 5);
    $bottomRight.offset({
      top: (minDimension * 3) / 5 + extraY / 2,
      left: (minDimension * 3) / 5 + extraX / 2,
    });

    $dividerOne.height(minDimension * 1);
    $dividerOne.width((minDimension * 1) / 12);
    $dividerOne.offset({
      top: (minDimension * 1) / 5 + extraY / 2,
      left: (minDimension * 3.5) / 12 + extraX / 2,
    });
    $dividerTwo.height(minDimension * 1);
    $dividerTwo.width((minDimension * 1) / 12);
    $dividerTwo.offset({
      top: (minDimension * 1) / 5 + extraY / 2,
      left: (minDimension * 5.5) / 12 + extraX / 2,
    });
    $dividerThree.height(minDimension * 1);
    $dividerThree.width((minDimension * 1) / 12);
    $dividerThree.offset({
      top: (minDimension * 1) / 5 + extraY / 2,
      left: (minDimension * 7.5) / 12 + extraX / 2,
    });
    $dividerFour.height(minDimension * 1);
    $dividerFour.width((minDimension * 1) / 12);
    $dividerFour.offset({
      top: (minDimension * 1) / 5 + extraY / 2,
      left: (minDimension * 9) / 12 + extraX / 2,
    });

    canvas = document.getElementById("waves");

    canvas.width = width;
    canvas.height = height;

    context = canvas.getContext("2d");
    context.font = "18px sans-serif";
    context.lineJoin = "round";

    xAxis = Math.floor(height / 2);
    yAxis = Math.floor(width / 4);

    context.save();
  };

  repaint();

  var colors = new Array(
    [255, 0, 0],
    [255, 0, 0],
    [85, 26, 139],
    [85, 26, 139],
    [0, 0, 0],
    [0, 0, 0],
    [212, 175, 55],
    [212, 175, 55],
    [0, 255, 204],
    [0, 255, 204],
    [204, 255, 255],
    [204, 255, 255]
  );

  var step = 0;
  //color table indices for:
  // current color left
  // next color left
  // current color right
  // next color right
  var colorIndices = [0, 1, 2, 3];

  //transition speed
  var gradientSpeed = 0.01;

  function updateGradient() {
    if ($ === undefined) return;

    var c0_0 = colors[colorIndices[0]];
    var c0_1 = colors[colorIndices[1]];
    var c1_0 = colors[colorIndices[2]];
    var c1_1 = colors[colorIndices[3]];

    var istep = 1 - step;
    var r1 = Math.round(istep * c0_0[0] + step * c0_1[0]);
    var g1 = Math.round(istep * c0_0[1] + step * c0_1[1]);
    var b1 = Math.round(istep * c0_0[2] + step * c0_1[2]);
    var color1 = "rgb(" + r1 + "," + g1 + "," + b1 + ")";

    var r2 = Math.round(istep * c1_0[0] + step * c1_1[0]);
    var g2 = Math.round(istep * c1_0[1] + step * c1_1[1]);
    var b2 = Math.round(istep * c1_0[2] + step * c1_1[2]);
    var color2 = "rgb(" + r2 + "," + g2 + "," + b2 + ")";

    $(".canvas")
      .css({
        background:
          "-webkit-gradient(linear, left top, right top, from(" +
          color1 +
          "), to(" +
          color2 +
          "))",
      })
      .css({
        background:
          "-moz-linear-gradient(left, " + color1 + " 0%, " + color2 + " 100%)",
      });

    step += gradientSpeed;
    if (step >= 1) {
      step %= 1;
      colorIndices[0] = colorIndices[1];
      colorIndices[2] = colorIndices[3];

      //pick two new target color indices
      //do not pick the same as the current one
      colorIndices[1] =
        (colorIndices[1] +
          Math.floor(1 + Math.random() * (colors.length - 1))) %
        colors.length;
      colorIndices[3] =
        (colorIndices[3] +
          Math.floor(1 + Math.random() * (colors.length - 1))) %
        colors.length;
    }
  }

  setInterval(updateGradient, 10);

  if (typeof Humble == "undefined") window.Humble = {};
  Humble.Trig = {};
  Humble.Trig.init = init;

  function init() {}

  draw = function () {
    // Clear the canvas
    context.clearRect(0, 0, width, height);

    context.save();
    context.lineWidth = 1;
    var f1 = function (x) {
      return (4 / Math.PI) * Math.sin(Math.PI * x);
    };
    var f2 = function (x) {
      return (4 / (3 * Math.PI)) * Math.sin(3 * Math.PI * x);
    };
    var f3 = function (x) {
      return (4 / (5 * Math.PI)) * Math.sin(5 * Math.PI * x);
    };
    var f4 = function (x) {
      return (4 / (7 * Math.PI)) * Math.sin(7 * Math.PI * x);
    };
    var f5 = function (x) {
      return (4 / (9 * Math.PI)) * Math.sin(9 * Math.PI * x);
    };
    context.strokeStyle = "#000000";
    context.beginPath();
    drawFunction(draw.t, f1);
    context.stroke();
    context.strokeStyle = "#551A8B";
    context.beginPath();
    drawFunction(draw.t, f2);
    context.stroke();
    context.strokeStyle = "#D4AF37";
    context.beginPath();
    drawFunction(draw.t, f3);
    context.stroke();
    context.strokeStyle = "#00FFCC";
    context.beginPath();
    drawFunction(draw.t, f4);
    context.stroke();
    context.strokeStyle = "#FF0000";
    context.beginPath();
    drawFunction(draw.t, f5);
    context.stroke();
    context.strokeStyle = "#CCFFFF";
    context.lineWidth = 3;
    context.globalAlpha = 0.6;
    var sum = function (x) {
      return f1(x) + f2(x) + f3(x) + f4(x) + f5(x);
    };
    context.beginPath();
    drawFunction(draw.t, sum);
    context.stroke();

    // Update the time and draw again
    draw.seconds = draw.seconds - 0.004;
    draw.t = draw.seconds * Math.PI;
    setTimeout(draw, 35);
  };
  draw.seconds = 0;
  draw.t = 0;
  draw();

  function drawFunction(t, fn) {
    var x = t;
    var y = fn(x);
    context.moveTo(yAxis, unit * y + xAxis);
    for (i = yAxis; i <= width; i += 1) {
      x = t + (-yAxis + i) / unit;
      y = fn(x);
      context.lineTo(i, unit * y + xAxis);
    }
  }

  $(window).resize(function () {
    repaint();
  });

  $("#waves")
    .hammer()
    .on("swiperight dragright", function (event) {
      // document.getElementById("drums").play();
      $(".layer-1").hide();
      $(".layer-2").height(height);
      $(".layer-2").width(width);
      $(".layer-2").offset({ top: 0, left: 0 });
    });

  $("#waves")
    .hammer()
    .on("swipeleft dragleft", function (event) {
      // document.getElementById("drums").pause();
      $(".layer-1").show();
    });

  // $(".layer-1").hide();
  $(".layer-2").height(height);
  $(".layer-2").width(width);
  $(".layer-2").offset({ top: 0, left: 0 });
});
