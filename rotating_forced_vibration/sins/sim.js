function display()
{   
    var zeta = $("#ndampingratio").val();
    zeta = parseFloat(zeta);
    var mass = $("#nmass").val();
    var stiffness = $("#nstiffness").val();
    var rotationspeed = $("#rotationspeed").val();
    var unbalance = $("#unbalance").val();
    var omega = (2 * Math.PI * rotationspeed)/60;
    var omegan = Math.sqrt((stiffness*1000)/mass);
    var eta = omega / omegan;
    //var mass = parseInt(lumpmass) + ((density * area * parseInt(length))/3);
    //var k = (3 * e * i) / (Math.pow(parseInt(length),3));
    //var c = 2 * Math.sqrt((mass/1000)*k) * zeta;
    //var omegad = omegan * Math.sqrt(1-Math.pow(zeta,2));    
    $("#commentboxright").html("&omega;<sub>n</sub>  : "+omegan.toFixed(3)+" rad/s,<br> &eta; : "+eta.toFixed(4)+",<br> &zeta; : "+zeta+".");
    updategraph(rotationspeed,unbalance,zeta,omega,omegan,stiffness,mass);
    var param = 1;
    var peakpoint = Math.max.apply(null,animpoints);
    if(peakpoint > 0)
        {
            if(peakpoint > 0.5)
            {
                param = Math.ceil(peakpoint / 0.5);
            }
        }
    else
        {
            peakpoint = Math.abs(peakpoint);
            if(peakpoint > 0.5)
            {
                param = Math.ceil(peakpoint / 0.5);
            }
        }
    for(k=0;k<animpoints.length;k++)
    {
        animpoints[k] = animpoints[k] / param;
    } 
    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
        };
      })();
      var i = 0;
      function drawRectangle(myRectangle, context) {
        context.fillStyle = 'black';
        context.beginPath();
        context.moveTo(130,myRectangle.y-myRectangle.m);
        context.lineTo(130,myRectangle.y-myRectangle.m-20);
        context.moveTo(130,myRectangle.y-myRectangle.m);
        context.lineTo(120,myRectangle.y-myRectangle.m-10);
        context.moveTo(130,myRectangle.y-myRectangle.m);
        context.lineTo(140,myRectangle.y-myRectangle.m-10);
        context.closePath();
        context.stroke();
        context.fillStyle = 'brown';
        context.beginPath();
        context.moveTo(30,myRectangle.y);
        context.lineTo(230,myRectangle.y);
        context.lineTo(230,myRectangle.y-myRectangle.m);
        context.lineTo(30,myRectangle.y-myRectangle.m);
        context.closePath();
        context.fill();
        context.fillStyle = 'black';
        context.beginPath();
        context.rect(30,350, 200, 10);
        context.closePath();
        context.fill();
        context.strokeStyle = 'blue';
        context.beginPath();
        context.moveTo(180,myRectangle.y);
        context.lineTo(180,myRectangle.rod + myRectangle.y);
        context.lineWidth = 5;
        context.closePath();
        context.stroke();
        context.strokeStyle = 'blue';
        context.beginPath();
        context.moveTo(165,myRectangle.y+myRectangle.rod);
        context.lineTo(195,myRectangle.y+myRectangle.rod);
        context.lineWidth = 5;
        context.closePath();
        context.stroke();
        context.strokeStyle = 'blue';
        context.beginPath();
        context.moveTo(180,350);
        context.lineTo(180,325);
        context.lineWidth = 5;
        context.closePath();
        context.stroke();
        context.strokeStyle = 'blue';
        context.beginPath();
        context.moveTo(163,325);
        context.lineTo(197,325);
        context.lineWidth = 5;
        context.closePath();
        context.stroke();
        context.strokeStyle = 'blue';
        context.beginPath();
        context.moveTo(160,myRectangle.cylinder);
        context.lineTo(160,325);
        context.lineWidth = 5;
        context.closePath();
        context.stroke();
        context.strokeStyle = 'blue';
        context.beginPath();
        context.moveTo(200,myRectangle.cylinder);
        context.lineTo(200,325);
        context.lineWidth = 5;
        context.closePath();
        context.stroke();
        context.strokeStyle = 'red';
        context.beginPath();
        context.moveTo(80,myRectangle.y);
        context.lineTo(80,myRectangle.y+25);
        context.lineWidth = 5;
        context.closePath();
        context.stroke();
        context.strokeStyle = 'red';
        context.beginPath();
        context.moveTo(80,350);
        context.lineTo(80,325);
        context.lineWidth = 5;
        context.closePath();
        context.stroke();
        var x1 = myRectangle.y+25;
        var y1 = 325;
        var z = y1 - x1;
        var diff = z/11;
        var array = [];
        var j = 0;
        for(j=0;j<11;j++)
        {
          if(array.length != 0)
          {
            var temp = array[array.length - 1];
            array.push(temp + diff);
          }
          else
          {
            array.push(x1+diff);
          }
        }
        context.beginPath();
        context.lineWidth = 5;  
        context.arc(80,myRectangle.y+25,3,0,Math.PI * 2, false);
        for(j=0;j<10;j++)
        {
          if(j%2 == 0)
          {
            context.lineTo(65,array[j]);
            context.arc(62,array[j],3,0,Math.PI * 2, false);
          }
          else
          {
            context.lineTo(95,array[j]);
            context.arc(95,array[j],3,0,Math.PI * 2, false);
          }
        }
        context.arc(80,array[10],3,0,Math.PI * 2, false);
        context.stroke();
      } 
      function animate(myRectangle, canvas, context,startTime) {   

        myRectangle.y = ((animpoints[i]*100)+150);
        if(myRectangle.y + myRectangle.rod < myRectangle.cylinder)
        {
            myRectangle.cylinder = myRectangle.cylinder - (myRectangle.cylinder - (myRectangle.rod + myRectangle.y));
        }
        if(myRectangle.y > myRectangle.cylinder)
        {
            myRectangle.cylinder = myRectangle.cylinder + (myRectangle.y - myRectangle.cylinder);
        }
        if(myRectangle.y + myRectangle.rod > 325)
        {
            myRectangle.rod = myRectangle.y + myRectangle.rod - (325-20);
        }
        if(i == 100)
        {
          i=10;
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
      var canvas = document.getElementById('animationscreen');
      var context = canvas.getContext('2d');
      var myRectangle = {
        m: 30,
        y: animpoints[0],
        rod:120,
        cylinder:205,
      };
      drawRectangle(myRectangle, context);
      var startTime = (new Date()).getTime();
      animate(myRectangle, canvas, context,startTime);    
      
}
display();
$("#magnificationfactorscreen").hide();
$("#phaseanglescreen").hide();
$("#ndampingratio").change(function(){
    $("#sdampingratio").val($("#ndampingratio").val());
    display();
});
$("#sdampingratio").change(function(){
    $("#ndampingratio").val($("#sdampingratio").val());
    display();
}); 
$("#nmass").change(function(){
    $("#smass").val($("#nmass").val());
    display();
});
$("#smass").change(function(){
    $("#nmass").val($("#smass").val());
    display();
});
$("#nstiffness").change(function(){
    $("#sstiffness").val($("#nstiffness").val());
    display();
});
$("#sstiffness").change(function(){
    $("#nstiffness").val($("#sstiffness").val());
    display();
});
$("#rotationspeed").change(function(){
    display();
});
$("#unbalance").change(function() {
    display();
});
$("#graphbutton").click(function(){
    var temp = $("#graphbutton").attr("src");
    if(temp == "sins/bluefwddulls.png")
    {
        $("#graphbutton").attr("src","sins/bluebkdulls.png");
        $("#magnificationfactorscreen").show();
        $("#phaseanglescreen").show();
        $("#displacementscreen").hide();
        $("#nstiffness").prop('disabled', true);
        $("#sstiffness").prop('disabled', true);
        $("#nmass").prop('disabled', true);
        $("#smass").prop('disabled', true);
        $("#ndampingratio").prop('disabled', true);
        $("#sdampingratio").prop('disabled', true);
        $("#rotationspeed").prop('disabled', true);
        $("#unbalance").prop('disabled', true);

        
    }
    else
    {
        $("#graphbutton").attr("src","sins/bluefwddulls.png");
        $("#displacementscreen").show();
        
        $("#magnificationfactorscreen").hide();
        $("#phaseanglescreen").hide();
        $("#nstiffness").prop('disabled', false);
        $("#sstiffness").prop('disabled', false);
        $("#nmass").prop('disabled', false);
        $("#smass").prop('disabled', false);
        $("#ndampingratio").prop('disabled', false);
        $("#sdampingratio").prop('disabled', false);
        $("#rotationspeed").prop('disabled', false);
        $("#unbalance").prop('disabled', false);
    }
});
