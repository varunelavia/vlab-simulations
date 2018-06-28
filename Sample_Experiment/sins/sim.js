function display()
{    
    var n1 = $("#n1").val(); //Take user inputs into js variables
    var n2 = $("#n2").val();
    n1 = parseInt(n1); //Parse them if needed
    n2 = parseInt(n2);
    add = n1 + n2;//perform calculations 
    sub = n1 - n2;
    mul = n1 * n2;
    div = n1 / n2;
    mod = n1 % n2;
    //Print results in the commentboxleft or/and commentboxright div.
    $("#commentboxright").html("Addition is : "+add+". Subtraction is : "+sub+".<br>Multiplication is : "+mul+". Division is : "+div+". Modulo is : "+mod);
    updategraph(n1,n2); //Call the update graph function with the parameters required to plot the graph
    var i = 0; //This is count variable
    //Request of animation frame
    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
        };
      })();

      function drawAnimation(myRectangle, context) { //Function which draws animation
        context.beginPath();
        context.arc(myRectangle.x,myRectangle.y,myRectangle.r,0,2 * Math.PI,false);
        context.closePath();
        context.strokeStyle = "black";
        context.lineWidth = "2";
        context.stroke();
      }
      function animate(myRectangle, canvas, context, startTime) { //Function which updates the animation points and calls drawAnimation function
        if(i==200) //Here we have 200 points in animpoints array, so when all the animpoints are used then it will restart the animation.
        {
            i = 1;
        }
        else
        {
            i = i+1;
        }
        myRectangle.y = animpoints[i]; //Passing the animpoint array points to the animation
        context.clearRect(0, 0, canvas.width, canvas.height);
        
        drawAnimation(myRectangle, context);
        
        requestAnimFrame(function() {
          animate(myRectangle, canvas, context, startTime);
        });
        
      }
      var canvas = document.getElementById('animationscreen');
      var context = canvas.getContext('2d');
      /*
      Code for scaling factor, see the documentation to understand.
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
      */
      var myRectangle = {
        x: 375,
        y: animpoints[0],
        r: 15
      };
    drawAnimation(myRectangle, context);//Keep it as it is.
      setTimeout(function() {//Keep it as it is.
        var startTime = (new Date()).getTime();
        animate(myRectangle, canvas, context, startTime);
      }, 10);
}
display();
$("#graphcanvasid").hide(); //Initially hide the graph
$("#n1").change(function() { //Call display function when the value get changed
    display();
});
$("#n2").change(function() {
    display();
});
$("#graphbutton").click(function(){ //Handling the control button
    var temp = $("#graphbutton").attr("src");
    if(temp == "sins/bluefwddulls.png")
    {
        $("#graphbutton").attr("src","sins/bluebkdulls.png"); //Changes the button when clicked
        $("#graphcanvasid").show(); //Show the graph 
        $("#animationcanvasid").hide();//Hide the animation
        
    }
    else
    {
        $("#graphbutton").attr("src","sins/bluefwddulls.png");
        $("#graphcanvasid").hide();
        $("#animationcanvasid").show();
    }
});