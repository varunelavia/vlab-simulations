function display()
{   
    var tension = $("#tension").val();
    var mass = $("#mass").val();
    var length = $("#length").val();
    var initialdisplacement = $("#initialdisplacement").val();
    tension = parseFloat(tension);
    mass = parseFloat(mass);
    var omega = Math.sqrt((4 * tension) / (length * mass));
    $("#commentboxright").html("&omega; : "+omega+" rad/s.");
    updategraph(initialdisplacement,omega);
    //alert(point1.length)
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
        context.rect(myRectangle.xx1,myRectangle.yy1,10,100);
        context.closePath();
        context.fill();
        context.fillStyle = "black";
        context.beginPath();
        context.rect(myRectangle.xx2,myRectangle.yy2,10,100);
        context.closePath();
        context.fill();
        context.strokeStyle = "blue";
        context.lineWidth="10";
        context.beginPath();
        context.moveTo(myRectangle.xx1+10,myRectangle.yy1+50);
        context.lineTo((myRectangle.xx2+myRectangle.xx1+10)/2,myRectangle.y);
        //context.lineTo(myRectangle.length/2,myRectangle.y);
        context.closePath();
        context.stroke();
        context.strokeStyle = "blue";
        context.lineWidth="10";
        context.beginPath();
        context.moveTo((myRectangle.xx2+myRectangle.xx1+10)/2,myRectangle.y);
        //context.moveTo(myRectangle.length/2,myRectangle.y);
        context.lineTo(myRectangle.xx2,myRectangle.yy2+50);
        context.closePath();
        context.stroke();
        context.fillStyle = "brown";
        context.beginPath();
        context.arc((myRectangle.xx2+myRectangle.xx1+10)/2,myRectangle.y,myRectangle.mass,0,Math.PI * 2,false);
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
        myRectangle.y = point1[i]+250;
        
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        drawAnimation(myRectangle, context);
        
        requestAnimFrame(function() {
          animate(myRectangle, canvas, context, startTime);
        });
        
      }
      var canvas = document.getElementById('animationscreen');
      var context = canvas.getContext('2d');
      var tempmass = parseInt(mass);
      var scalingfactor = tempmass/40;
      var quotient = Math.floor(scalingfactor);
      var remainder = tempmass - (quotient * 40);
      remainder = remainder + 10;
      if(tempmass%40 == 0)
      {
          scalingfactor = scalingfactor + 1;
      }
      tempmass = remainder;
      
      document.getElementById("massscalingfactor").innerHTML = "Mass Scaling Factor - 1:"+Math.ceil(scalingfactor);
      var templength = parseInt(length);
      var scalingfactor = templength/450;
      var quotient = Math.floor(scalingfactor);
      var remainder = templength - (quotient * 450);
      remainder = remainder + 100;
      if(templength%450 == 0)
      {
          scalingfactor = scalingfactor + 1;
      }
      templength = remainder;
      document.getElementById("lengthscalingfactor").innerHTML = "Length Scaling Factor - 1:"+Math.ceil(scalingfactor);
      //alert(templength);
      var myRectangle = {
        xx1: 50,
        yy1: 200,
        xx2: templength,
        yy2: 200,
        mass:tempmass,
        y:initialdisplacement
      };
    drawAnimation(myRectangle, context);
      setTimeout(function() {
        var startTime = (new Date()).getTime();
        animate(myRectangle, canvas, context, startTime);
      }, 10);
}
display();
$("#graphcanvasid").hide();
$("#tension").change(function() {
    display();
});
$("#mass").change(function() {
    display();
});
$("#length").change(function() {
    display();
});
$("#initialdisplacement").change(function() {
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