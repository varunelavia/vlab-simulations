function display()
{   
    var length = $("#length").val();
    var dampinglength = $("#dampinglength").val();
    var stiffnesslength = $("#stiffnesslength").val();
    var mass = $("#mass").val();
    var stiffness = $("#stiffness").val();
    var damper = $("#damper").val();
    dampinglength = parseInt(dampinglength);
    stiffnesslength = parseInt(stiffnesslength);
    if(dampinglength > length)
    {
        dampinglength = 0;
        $("#dampinglength").val(0);
    }
    if(stiffnesslength > length)
    {
        stiffnesslength = 0;
        $("#stiffnesslength").val(0);
    }
    thetanot = $("#thetanot").val();
    if(thetanot>20)
    {
        thetanot = 10;
        $("#thetanot").val(10);
    }
    mass = parseFloat(mass);
    stiffness = parseFloat(stiffness);
    var temp1 = (stiffness * stiffnesslength * stiffnesslength);
    var temp2 = mass * length * length;
    var omega = Math.sqrt(temp1*1000/temp2);
    zeta = (damper * dampinglength * dampinglength) / (2 * mass * length * length * omega);
    $("#commentboxright").html("&omega; : "+omega+" rad/s,<br>&zeta; : "+zeta+".");
    updategraph(zeta,omega,thetanot);
    var i = 0;
    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
          //window.setTimeout(callback, 1000 / 60);
        };
      })();

      function drawAnimation(myRectangle, context) {
        context.fillStyle = "black";
        context.beginPath();
        context.rect(myRectangle.xx,myRectangle.yy,myRectangle.w,myRectangle.h);
        context.closePath();
        context.fill();
        context.strokeStyle="blue";
        context.lineWidth = "5";
        context.beginPath();
        context.moveTo(myRectangle.xx+myRectangle.w,myRectangle.yy+myRectangle.h/2);
        context.lineTo(45+ myRectangle.len * Math.cos(myRectangle.theta),182 + myRectangle.len * Math.sin(myRectangle.theta));
        context.closePath();
        context.stroke();
        context.fillStyle = "brown";
        context.beginPath();
        context.arc(45 + myRectangle.len * Math.cos(myRectangle.theta),182 +myRectangle.len * Math.sin(myRectangle.theta),myRectangle.r,0,Math.PI * 2,false);
        context.closePath();
        context.fill();
      }
      function animate(myRectangle, canvas, context, startTime) {
        
        var time = (new Date()).getTime() - startTime;
        if(i==1000)
        {
            i = 1;
        }
        else
        {
            i = i+1;
        }

        myRectangle.theta = point1[i] * (Math.PI / 180); 
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        drawAnimation(myRectangle, context);
        
        requestAnimFrame(function() {
          animate(myRectangle, canvas, context, startTime);
        });
        
      }
      var canvas = document.getElementById('animationscreen');
      var context = canvas.getContext('2d');
      var tempmass = parseInt(mass);
      var scalingfactor = tempmass/25;
      var quotient = Math.floor(scalingfactor);
      var remainder = tempmass - (quotient * 25);
      remainder = remainder + 5;
      if(tempmass%25 == 0)
      {
          scalingfactor = scalingfactor + 1;
      }
      tempmass = remainder;
      document.getElementById("massscalingfactor").innerHTML = "Mass Scaling Factor - 1:"+Math.ceil(scalingfactor);
      var templength = parseInt(length);
      var scalingfactor = templength/100;
      var quotient = Math.floor(scalingfactor);
      var remainder = templength - (quotient * 100);
      remainder = remainder + 50;
      if(templength%100 == 0)
      {
          scalingfactor = scalingfactor + 1;
      }
      templength = remainder;
      document.getElementById("lengthscalingfactor").innerHTML = "Length Scaling Factor - 1:"+Math.ceil(scalingfactor);
      var tempstiffnesslength = parseInt(stiffnesslength);
      var scalingfactor = tempstiffnesslength/100;
      var quotient = Math.floor(scalingfactor);
      var remainder = tempstiffnesslength - (quotient * 100);
      remainder = remainder + 50;
      if(tempstiffnesslength%100 == 0)
      {
          scalingfactor = scalingfactor + 1;
      }
      tempstiffnesslength = remainder;
      //document.getElementById("lengthscalingfactor").innerHTML = "Length Scaling Factor - 1:"+Math.ceil(scalingfactor);
      
      var myRectangle = {
        xx: 35,
        yy: 120,
        w: 10,
        h: 125,
        len: templength,
        r: tempmass,
        y: 0,
        theta:thetanot * (Math.PI / 180),  
        stiffnesslength:tempstiffnesslength
      };
    drawAnimation(myRectangle, context);
      setTimeout(function() {
        var startTime = (new Date()).getTime();
        animate(myRectangle, canvas, context, startTime);
      }, 10);
}
display();
$("#graphcanvasid").hide();
$("#thetanot").change(function() {
    display();
});
$("#length").change(function() {
    display();
});
$("#mass").change(function() {
    display();
});
$("#dampinglength").change(function() {
    display();
});
$("#stiffness").change(function() {
    display();
});
$("#stiffnesslength").change(function() {
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
    }
    else
    {
        $("#graphbutton").attr("src","sins/bluefwddulls.png");
        $("#graphcanvasid").hide();
        $("#animationcanvasid").show();
                   
    }
});
   