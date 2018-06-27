function display()
{   
    var radius = $("#radius").val();
    var mass = $("#mass").val();
    var offset = $("#offset").val();
    var stiffness = $("#stiffness").val();
    var thetanot = $("#thetanot").val();
    var zeta = $("#zeta").val();
    radius = parseFloat(radius);
    mass = parseFloat(mass);
    offset = parseFloat(offset);
    stiffness = parseFloat(stiffness);
    thetanot = parseFloat(thetanot);
    zeta = parseFloat(zeta);
    var temp1 = (radius + offset) / radius;
    var temp2 = Math.sqrt(stiffness/(1.5 * mass));
    var omega = temp1 * temp2;
    $("#commentboxright").html("&omega; : "+omega+" rad/s.");
    updategraph(thetanot,zeta,omega);
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
        if(i==500)
        {
            return;
        }
        else
        {
            i = i+1;
        }
        myRectangle.theta = point1[i]* (Math.PI / 180);
        myRectangle.x = (((radius+offset)*point1[i])/200) + 300;        
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        drawAnimation(myRectangle, context);
        
        requestAnimFrame(function() {
          animate(myRectangle, canvas, context, startTime);
        });
        
      }
      var canvas = document.getElementById('animationscreen');
      var context = canvas.getContext('2d');
      var tempradius = parseInt(radius);
      var scalingfactor = tempradius/100;
      var quotient = Math.floor(scalingfactor);
      var remainder = tempradius - (quotient * 100);
      remainder = remainder + 20;
      if(tempradius%100 == 0)
      {
          scalingfactor = scalingfactor + 1;
      }
      tempradius = remainder;
      document.getElementById("radiusscalingfactor").innerHTML = "Radius Scaling Factor - 1:"+Math.ceil(scalingfactor);
      var myRectangle = {
        x: 125,
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
$("#radius").change(function() {
    display();
});
$("#mass").change(function() {
    display();
});
$("#offset").change(function() {
    display();
});
$("#stiffness").change(function() {
    display();
});
$("#thetanot").change(function() {
    display();
});
$("#zeta").change(function() {
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