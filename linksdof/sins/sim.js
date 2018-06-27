function display()
{   
    var kt = $("#kt").val();
    var mass = $("#mass").val();
    var length = $("#length").val();
    var stiffness = $("#stiffness").val();
    var thetanot = $("#thetanot").val();
    kt = parseFloat(kt);
    mass = parseFloat(mass);
    length = parseFloat(length);
    stiffness = parseFloat(stiffness);
    thetanot = parseFloat(thetanot);
    if(thetanot>20)
    {
        thetanot = 10;
        $("#thetanot").val(10);
    }
    var temp1 = (10 * stiffness * length * length) + (9 * kt) + (1.5 * mass * 9.81 * length);
    var temp2 = mass * length * length;
    var omega = Math.sqrt(temp1/temp2);
    $("#commentboxright").html("&omega; : "+omega+" rad/s.");
    updategraph(thetanot,omega);
    //alert(point1.length);
    var i = 0;
    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          //window.setTimeout(callback, 1000 / 60);
        };
      })();
      function drawAnimation(myRectangle, context) {
        context.strokeStyle = "brown";
        context.lineWidth = "10";
        context.beginPath();
        context.moveTo(myRectangle.x,myRectangle.y);
        context.lineTo(myRectangle.length2 * Math.cos(myRectangle.theta) + myRectangle.x,myRectangle.length2 * Math.sin(myRectangle.theta) + myRectangle.y);
        context.closePath();
        context.stroke();
        context.strokeStyle = "brown";
        context.lineWidth = "10";
        context.beginPath();
        context.moveTo(myRectangle.x,myRectangle.y);
        context.lineTo(myRectangle.length1 * Math.cos(Math.PI-myRectangle.theta) + myRectangle.x,myRectangle.length1 * -Math.sin(Math.PI-myRectangle.theta) + myRectangle.y);
        context.closePath();
        context.stroke();
        context.fillStyle = "blue";
        context.beginPath();
        context.arc(myRectangle.x,myRectangle.y,10,0,Math.PI * 2,false);
        context.closePath();
        context.fill();
        /*
        context.fillStyle = "black";
        context.beginPath();
        context.rect(300,myRectangle.length1 * -Math.sin(Math.PI-myRectangle.thetainit) + myRectangle.y-15,10,50);
        context.rect(500,myRectangle.length1 * -Math.sin(Math.PI-myRectangle.thetainit) + myRectangle.y-15,10,50);
        context.rect(300,myRectangle.length2 * Math.sin(myRectangle.thetainit) + myRectangle.y-5,10,50);
        context.rect(500,myRectangle.length2 * Math.sin(myRectangle.thetainit) + myRectangle.y-5,10,50);
        context.closePath();
        context.fill();
        
        context.strokeStyle = "blue";
        context.lineWidth = "5";
        context.beginPath();
        context.moveTo(310,myRectangle.length1 * -Math.sin(Math.PI-myRectangle.thetainit) + myRectangle.y+10);
        context.lineTo(myRectangle.length1 * Math.cos(Math.PI-myRectangle.theta) + myRectangle.x,myRectangle.length1 * -Math.sin(Math.PI-myRectangle.theta) + myRectangle.y + 10);
        context.closePath();
        context.stroke();
        context.beginPath();
        context.moveTo(500,myRectangle.length1 * -Math.sin(Math.PI-myRectangle.thetainit) + myRectangle.y+10);
        context.lineTo(myRectangle.length1 * Math.cos(Math.PI-myRectangle.theta) + myRectangle.x,myRectangle.length1 * -Math.sin(Math.PI-myRectangle.theta) + myRectangle.y + 10);
        context.closePath();
        context.stroke();
        context.beginPath();
        context.moveTo(310,myRectangle.length2 * Math.sin(myRectangle.thetainit) + myRectangle.y+20);
        context.lineTo(myRectangle.length2 * Math.cos(myRectangle.theta) + myRectangle.x,myRectangle.length2 * Math.sin(myRectangle.theta) + myRectangle.y - 10);
        context.closePath();
        context.stroke();
        context.beginPath();
        context.moveTo(500,myRectangle.length2 * Math.sin(myRectangle.thetainit) + myRectangle.y+20);
        context.lineTo(myRectangle.length2 * Math.cos(myRectangle.theta) + myRectangle.x,myRectangle.length2 * Math.sin(myRectangle.theta) + myRectangle.y - 10);
        context.closePath();
        context.stroke();
        */
        
        
      }
      function animate(myRectangle, canvas, context, startTime) {
        var time = (new Date()).getTime() - startTime;
        if(i==100)
        {
            i = 15;
        }
        else
        {
            i = i+1;
        }
        myRectangle.theta = point1[i]* (Math.PI / 180) + Math.PI/2;
        
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        drawAnimation(myRectangle, context);
        
        requestAnimFrame(function() {
          animate(myRectangle, canvas, context, startTime);
        });
        
      }
      var canvas = document.getElementById('animationscreen');
      var context = canvas.getContext('2d');
      var templength = parseInt(length);
      var scalingfactor = templength/400;
      var quotient = Math.floor(scalingfactor);
      var remainder = templength - (quotient * 400);
      remainder = remainder + 100;
      if(templength%400 == 0)
      {
          scalingfactor = scalingfactor + 1;
      }
      templength = remainder;
      document.getElementById("lengthscalingfactor").innerHTML = "Length Scaling Factor - 1:"+Math.ceil(scalingfactor);
      var templen1 = templength/3;
      var myRectangle = {
        x: 400,
        y: 100,
        length:templength,
        length1:templen1,
        length2:templen1 * 2,
        thetainit:1,
        theta:thetanot* (Math.PI / 180) + Math.PI/2
      };
    drawAnimation(myRectangle, context);
      setTimeout(function() {
        var startTime = (new Date()).getTime();
        animate(myRectangle, canvas, context, startTime);
      }, 10);
}
display();
$("#graphcanvasid").hide();
$("#kt").change(function() {
    display();
});
$("#mass").change(function() {
    display();
});
$("#length").change(function() {
    display();
});
$("#stiffness").change(function() {
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
    