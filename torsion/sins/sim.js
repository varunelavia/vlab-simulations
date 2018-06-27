function display()
{   
    var d1 = $("#d1").val();
    var d2 = $("#d2").val();
    if(d2 <= d1)
    {
        alert("D2 should always be greater than D1");
        $("#d1").val(d2/2);
        d1 = d2/2;
    }
    var l1 = $("#l1").val();
    var l2 = $("#l2").val();
    var thetanot = $("#thetanot").val();
    thetanot = parseFloat(thetanot);
    var radius = $("#radius").val();
    var mass = $("#mass").val();
    mass = parseFloat(mass);
    var G = 86000;
    var J1 = (Math.PI / 32) * Math.pow(d1,4);
    var J2 = (Math.PI / 32) * Math.pow(d2,4);
    var k1 = (G * J1) / l1;
    var k2 = (G * J2) / l2;
    var kt = (k1 * k2) / (k1 + k2);
    var kt2 = (k1 * k2) / (k1 + k2) / 1000000;
    var I = (mass * radius * radius) / 2;
    var omega = Math.sqrt(kt/I);
    $("#l1val").html(l1+" mm");
    $("#l2val").html(l2+" mm");
    $("#d1val").html(d1+" mm");
    $("#d2val").html(d2+" mm");
    $("#commentboxright").html("I : "+I.toFixed(3)+" Kgm<sup>2</sup>,<br> K<sub>t</sub> : "+kt2.toFixed(3)+"*e<sup>6</sup> N/mm,<br> &omega; : "+omega.toFixed(3)+" rad/s.");
    updategraph(thetanot,omega);
    var i = 0;
    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          //window.setTimeout(callback, 1000 / 60);
        };
      })();

      function drawAnimation(myRectangle, context) {
        context.beginPath();
        context.arc(myRectangle.x,myRectangle.y,myRectangle.r,0,2 * Math.PI,false);
        context.moveTo(myRectangle.x,myRectangle.y);
        context.lineTo(myRectangle.r * Math.cos(myRectangle.theta) + myRectangle.x,myRectangle.r * Math.sin(myRectangle.theta) + myRectangle.y);
        context.closePath();
        context.strokeStyle = "black";
        context.lineWidth = "2";
        context.stroke();
      }
      function animate(myRectangle, canvas, context, startTime) {
        var time = (new Date()).getTime() - startTime;
        if(i==300)
        {
            i = 20;
        }
        else
        {
            i = i+1;
        }
        myRectangle.theta = point1[i]* (Math.PI / 180);
        
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        drawAnimation(myRectangle, context);
        
        requestAnimFrame(function() {
          animate(myRectangle, canvas, context, startTime);
        });
        
      }
      var canvas = document.getElementById('animationscreen');
      var context = canvas.getContext('2d');
      var tempradius = parseInt(radius);
      var scalingfactor = tempradius/140;
      var quotient = Math.floor(scalingfactor);
      var remainder = tempradius - (quotient * 140);
      remainder = remainder + 20;
      if(tempradius%140 == 0)
      {
          scalingfactor = scalingfactor + 1;
      }
      tempradius = remainder;
      document.getElementById("radiusscalingfactor").innerHTML = "Radius Scaling Factor - 1:"+Math.ceil(scalingfactor);
      var myRectangle = {
        x: 375,
        y: 275,
        r: tempradius,
        theta: thetanot* (Math.PI / 180)
      };
    drawAnimation(myRectangle, context);
      setTimeout(function() {
        var startTime = (new Date()).getTime();
        animate(myRectangle, canvas, context, startTime);
      }, 10);
}
display();
$("#graphcanvasid").hide();
$("#l1").change(function() {
    display();
});
$("#l2").change(function() {
    display();
});
$("#d1").change(function() {
    display();
});
$("#d2").change(function() {
    display();
});
$("#radius").change(function() {
    display();
});
$("#mass").change(function() {
    display();
});
$("#thetanot").change(function() {
    display();
});
$("#graphbutton").click(function(){
    var temp = $("#graphbutton").attr("src");
    if(temp == "sins/bluefwddulls.png")
    {
        $("#graphbutton").attr("src","sins/bluebkdulls.png");
        $("#graphcanvasid").show();
        $("#animationcanvasid").hide();
        $("#animationscreen").hide();
        
    }
    else
    {
        $("#graphbutton").attr("src","sins/bluefwddulls.png");
        $("#graphcanvasid").hide();
        $("#animationcanvasid").show();
        $("#animationscreen").show();
    }
});