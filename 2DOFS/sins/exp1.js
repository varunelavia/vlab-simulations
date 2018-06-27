var omega1 = 0;
function check()
{
    var answer = $("#answer").val();
    answer = Number(answer);
    answer = answer.toFixed(1);
    actualans = omega1.toFixed(1);
    if(answer != "")
    {
        if(answer == actualans)
        {
            alert("Correct Answer");
        }
        else
        {
            alert("Incorrect Answer !! Correct answer is "+omega1.toFixed(2));
        }
    }
    else
    {
        alert("Please Enter the answer");
    }
}
function display()
{   
    var fnot = Math.floor(Math.random() * (1000 - 500 + 1) ) + 500;
    var omega = (Math.random() * (16 + 1)).toFixed(2);
    omega = parseFloat(omega);
    var k2 = Math.floor(Math.random() * (1000 - 200 + 1) ) + 200;
    var m2 = Math.floor(Math.random() * (100 - 10 + 1) ) + 10;
    var k1 = Math.floor(Math.random() * (5000 - 2000 + 1) ) + 2000;
    var m1 = Math.floor(Math.random() * (500 - 100 + 1) ) + 100; 
    omega1 = parseFloat(Math.sqrt(k1/m1));
    var omega2 = parseFloat(Math.sqrt(k2/m2));
    var eta = omega/omega2;
    //$("#commentboxright").html("&omega; : "+omega+" rad/s, &omega;2 : "+omega2.toFixed(2)+"<br> &omega;/&omega;2 : "+eta.toFixed(2));
    //$("#commentboxleft").html("K1 : "+k1+" N/m, M1 : "+m1+" Kg<br> &omega;/&omega;2 : "+eta.toFixed(2));
    $("#fnot").html(fnot);
    $("#omega").html(omega);
    $("#k1").html(k1);
    $("#m1").html(m1);
    $("#k2").html(k2);
    $("#m2").html(m2);

    updategraph(fnot,omega,k2,m2,k1,m1);
        
    /*
    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
        };
      })();
      var i = 0;
      function drawRectangle(myRectangle, context) {
        context.beginPath();
        context.fillStyle = 'black';
        context.beginPath();
        context.rect(25,120, 20, 250);
        context.closePath();
        context.fill();
        context.fillStyle = 'blue';
        context.beginPath();
        context.moveTo(45, 240);
        context.quadraticCurveTo(myRectangle.x/2,240,myRectangle.x,myRectangle.y-10);
        context.lineTo(myRectangle.x,myRectangle.y+10);
        context.quadraticCurveTo(myRectangle.x/2,260,45,260);
        //context.quadraticCurveTo(180,240,myRectangle.x,myRectangle.y-10);
        //context.lineTo(myRectangle.x,myRectangle.y+10);
        //context.quadraticCurveTo(180,260,45,260);
        context.lineTo(45,240);
        context.closePath();
        context.fill();
        context.fillStyle = 'brown';
        context.beginPath();
        //context.moveTo(myRectangle.x+myRectangle.radius,myRectangle.y);
        context.arc(myRectangle.x,myRectangle.y,myRectangle.radius , 0, 2 * Math.PI);
        context.closePath();
        context.fill();
        context.stroke();
      } 
      function animate(myRectangle, canvas, context,startTime) {    
        myRectangle.y = ((animpoints[i]*100)+250);
        if(i == 800)
        {
          return;
        }
        else
        {
          i++;
        }
        context.clearRect(0, 0, canvas.width, canvas.height);
        drawRectangle(myRectangle, context);
        requestAnimFrame(function() {
            animate(myRectangle, canvas, context,startTime);
        });
      }
      var canvas = document.getElementById('simscreen');
      var context = canvas.getContext('2d');
      var templength = length;
      var scalingfactor = templength/500;
      var quotient = Math.floor(scalingfactor);
      var remainder = templength - (quotient * 500);
      remainder = remainder + 100;
      if(templength%500 == 0)
      {
          scalingfactor = scalingfactor + 1;
      }
      templength = remainder;
      document.getElementById("lengthscalingfactor").innerHTML = "Length Scaling Factor - 1:"+Math.ceil(scalingfactor);
      var tempmass = parseInt(lumpmass);
      var scalingfactor = tempmass/50;
      var quotient = Math.floor(scalingfactor);
      var remainder = tempmass - (quotient * 50);
      remainder = remainder + 0;
      if(tempmass%50 == 0)
      {
          scalingfactor = scalingfactor + 1;
      }
      tempmass = remainder;
      document.getElementById("massscalingfactor").innerHTML = "Mass Scaling Factor - 1:"+Math.ceil(scalingfactor);
      
      var myRectangle = {
        x: templength,
        y: 150,
        width: 100,
        height: 50,
        radius: tempmass,
        borderWidth: 5
      };
      drawRectangle(myRectangle, context);
      var startTime = (new Date()).getTime();
      animate(myRectangle, canvas, context,startTime);      
      */
}
display();
$("#info").hide();
$("#query").mouseenter(function(){
    $("#info").show();
});
$("#query").mouseleave(function(){
    $("#info").hide();
});
$("#restart").click(function(){
    display();
});
$("#check").click(function(){
    check();
});