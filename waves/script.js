$(document).ready(function () {
  var height;
  var width;
  var unit = 100,
  canvas, context, canvas2, context2, draw, xAxis, yAxis;

  var repaint = function () {
    w = $(window).width();
    //get viewport height and width
    height = $(window).height();
    width = $(window).width();

    var $canvas = $('.canvas');
    $canvas.height(height);
    $canvas.width(width);

    canvas = document.getElementById("waves");

    canvas.width = width;
    canvas.height = height;

    context = canvas.getContext("2d");
    context.font = '18px sans-serif';
    context.strokeStyle = '#000';
    context.lineJoin = 'round';

    xAxis = Math.floor(height/2);
    yAxis = Math.floor(width/4);

    context.save();
  }

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

      $('.canvas').css({
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

    if (typeof(Humble) == 'undefined') window.Humble = {};
    Humble.Trig = {};
    Humble.Trig.init = init;


    function init() {

    }

    draw = function () {

      // Clear the canvas
      context.clearRect(0, 0, width, height);

      context.save();
      context.strokeStyle = '#fff';
      context.lineWidth = 1;
      var f1 = function (x) { return 4 / Math.PI * Math.sin(Math.PI * x); }
      var f2 = function (x) { return 4 / (3 * Math.PI) * Math.sin(3 * Math.PI * x); }
      var f3 = function (x) { return 4 / (5 * Math.PI) * Math.sin(5 * Math.PI * x); }
      var f4 = function (x) { return 4 / (7 * Math.PI) * Math.sin(7 * Math.PI * x); }
      var f5 = function (x) { return 4 / (9 * Math.PI) * Math.sin(9 * Math.PI * x); }
      context.beginPath();
      drawFunction(draw.t, f1);
      context.stroke();
      context.beginPath();
      drawFunction(draw.t, f2);
      context.stroke();
      context.beginPath();
      drawFunction(draw.t, f3);
      context.stroke();
      context.beginPath();
      drawFunction(draw.t, f4);
      context.stroke();
      context.beginPath();
      drawFunction(draw.t, f5);
      context.stroke();
      context.save();
      context.strokeStyle = '#fff'
      context.lineWidth = 5;
      var sum = function (x) { return f1(x) + f2(x) + f3(x) + f4(x) + f5(x); };
      context.beginPath();
      drawFunction(draw.t, sum);
      context.stroke();


      // Update the time and draw again
      draw.seconds = draw.seconds - .007;
      draw.t = draw.seconds*Math.PI;
      setTimeout(draw, 35);
    };
    draw.seconds = 0;
    draw.t = 0;
    draw();

    function drawFunction(t, fn) {
      var x = t;
      var y = fn(x);
      context.moveTo(yAxis, unit*y+xAxis);
      for (i = yAxis; i <= width; i += 1) {
        x = t+(-yAxis+i)/unit;
        y = fn(x);
        context.lineTo(i, unit*y+xAxis);
      }
    }

    $(window).resize(function () {
      repaint();
    });

});
