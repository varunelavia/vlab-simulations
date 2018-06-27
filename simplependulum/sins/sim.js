function display()
{   
    var length = $("#length").val();
    
    
    var mass = 2
    
    var initialdisplacement = $("#initialdisplacement").val();
    if(initialdisplacement > 90)
    {
        initialdisplacement = 45;
        $("#initialdisplacement").val(45);
    }
    mass = parseFloat(mass);
    
    
    var omega = Math.sqrt(9.81 / length);
    $("#commentboxright").html("&omega; : "+omega+" rad/s.");
    updategraph(omega,initialdisplacement);
    //alert(point1.length);
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
        context.moveTo(myRectangle.xx + myRectangle.w/2,myRectangle.yy+myRectangle.h);
        //context.lineTo(myRectangle.x,myRectangle.y);
        context.lineTo(myRectangle.xx + myRectangle.w/2 + (Math.cos(myRectangle.theta)*myRectangle.len),myRectangle.yy +(Math.sin(myRectangle.theta)*myRectangle.len));
        context.closePath();
        context.stroke();
        context.fillStyle = "brown";
        context.beginPath();
        //context.arc(myRectangle.x,myRectangle.yy-myRectangle.len,myRectangle.r,0,Math.PI * 2,false);
        context.arc(myRectangle.xx + myRectangle.w/2 + (Math.cos(myRectangle.theta)*myRectangle.len),myRectangle.yy+(Math.sin(myRectangle.theta)*myRectangle.len) ,myRectangle.r,0,Math.PI * 2,false);
        context.closePath();
        context.fill();
        
      }
      function animate(myRectangle, canvas, context, startTime) {
        
        var time = (new Date()).getTime() - startTime;
        if(i==1000)
        {
            i=0;
        }
        else
        {
            i = i+1;
        }
        myRectangle.theta = (point1[i] * (Math.PI / 180))+(22.5 * Math.PI);
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
      //document.getElementById("massscalingfactor").innerHTML = "Mass Scaling Factor - 1:"+Math.ceil(scalingfactor);
      var templength = parseInt(length);
      var scalingfactor = templength/200;
      var quotient = Math.floor(scalingfactor);
      var remainder = templength - (quotient * 200);
      remainder = remainder + 50;
      if(templength%100 == 0)
      {
          scalingfactor = scalingfactor + 1;
      }
      templength = remainder;
      document.getElementById("lengthscalingfactor").innerHTML = "Length Scaling Factor - 1:"+Math.ceil(scalingfactor);
      var myRectangle = {
        xx: 350,
        yy: 120,
        w: 100,
        h: 10,
        len: templength,
        r: tempmass,
        theta: initialdisplacement+(22.5 * Math.PI)
      };
    drawAnimation(myRectangle, context);
      setTimeout(function() {
        var startTime = (new Date()).getTime();
        animate(myRectangle, canvas, context, startTime);
      }, 10);
}
display();
$("#graphcanvasid").hide();
$("#initialdisplacement").change(function() {
    display();
});
$("#length").change(function() {
    display();
});
$("#mass").change(function() {
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
    {   $("#graphbutton").attr("src","sins/bluefwddulls.png");
        $("#graphcanvasid").hide();
        $("#animationcanvasid").show();
        $("#animationscreen").show();
                   
    }
});