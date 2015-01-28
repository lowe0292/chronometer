$(document).ready(function () {
  var height;
  var width;

  var repaint = function () {
    w = $(window).width();
    //get viewport height and width
    height = $(window).height();
    width = $(window).width();

    var $canvas = $('.canvas');
    $canvas.height(height);
    $canvas.width(width);
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

    (function () {

      if (typeof(Humble) == 'undefined') window.Humble = {};
      Humble.Trig = {};
      Humble.Trig.init = init;

      var unit = 100,
      canvas, context, canvas2, context2, draw, xAxis, yAxis;

      /**
       * Init function.
       * 
       * Initialize variables and begin the animation.
       */
      function init() {

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
        draw();
      }

      /**
       * Draw animation function.
       * 
       * This function draws one frame of the animation, waits 20ms, and then calls
       * itself again.
       */
      draw = function () {

        // Clear the canvas
        context.clearRect(0, 0, width, height);

        // Set styles for animated graphics
        context.save();
        context.strokeStyle = '#fff';
        context.lineWidth = 5;

        // Draw the sine curve at time draw.t, as well as the circle.
        context.beginPath();
        drawSine(draw.t);
        context.stroke();

        // Update the time and draw again
        draw.seconds = draw.seconds - .007;
        draw.t = draw.seconds*Math.PI;
        setTimeout(draw, 35);
      };
      draw.seconds = 0;
      draw.t = 0;

      /**
       * Function to draw sine
       * 
       * The sine curve is drawn in 10px segments starting at the origin. 
       */
      function drawSine(t) {

        // Set the initial x and y, starting at 0,0 and translating to the origin on
        // the canvas.
        var x = t;
        var y = Math.sin(x);
        context.moveTo(yAxis, unit*y+xAxis);

        // Loop to draw segments
        for (i = yAxis; i <= width; i += 10) {
          x = t+(-yAxis+i)/unit;
          y = Math.sin(x);
          context.lineTo(i, unit*y+xAxis);
        }
      }

      Humble.Trig.init()

    })();

});
