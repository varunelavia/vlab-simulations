function display()
{   
    var fnot = $("#nfnot").val();
    var omega = $("#nomega").val();
    omega = parseFloat(omega);
    if(omega < 5 || omega > 50)
    {
      omega=10;
      $("#nomega").val(10);
      $("#somega").val(10);
      
    }
    var k2 = $("#nk2").val();
    var m2 = $("#nm2").val();
    var k1 = $("#k1").val();
    var m1 = $("#m1").val();    
    var omega1 = parseFloat(Math.sqrt(k1/m1));
    var omega2 = parseFloat(Math.sqrt(k2/m2));
    var eta = omega/omega2;
    var mu = parseFloat(m2 / m1);
    var temp1 = Math.pow(omega,4)/(Math.pow(omega1,2)*Math.pow(omega2,2));
    var temp2 = (1+mu)*Math.pow(omega/omega1,2);
    var temp3 = Math.pow(omega/omega2,2);
    var temp = temp1 - (temp2 + temp3) + 1;
    var xst = parseFloat(fnot/k1);
    var x1 = Math.abs(((1 - Math.pow(omega/omega2,2)) * xst) / temp);
    var x2 = Math.abs((1 * xst) / temp);
    var x1xst = x1/xst;
    var x2xst = x2/xst;
    $("#commentboxright").html("&omega; : "+omega+" rad/s, &omega;<sub>1</sub> : "+omega1.toFixed(2)+", &omega;<sub>2</sub> : "+omega2.toFixed(2)+"<br> &omega;/&omega;<sub>2</sub> : "+eta.toFixed(2));
    $("#commentboxleft").html("K<sub>1</sub> : "+k1+" N/m, M<sub>1</sub> : "+m1+" Kg<br> x<sub>1</sub> : "+x1.toFixed(2)+", x<sub>2</sub> : "+x2.toFixed(2)+", x<sub>st</sub> : "+xst.toFixed(2)+",<br> x<sub>1</sub>/x<sub>st</sub> : "+x1xst.toFixed(2)+", x<sub>2</sub>/x<sub>st</sub> : "+x2xst.toFixed(2)+".");
    updategraph(xst,x1,x2,omega,omega1,omega2,mu,fnot,k1,k2,m1,m2);
    //alert(animpoints1.length);
    //alert(animpoints2);
    
    
    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
        };
      })();
      var i = 0;
      function drawRectangle(myRectangle, context) {
        context.fillStyle = 'black';
        context.beginPath();
        context.lineWidth = 5;
        context.moveTo(60,myRectangle.y2-myRectangle.m);
        context.lineTo(60,myRectangle.y2-myRectangle.m-20);
        context.moveTo(60,myRectangle.y2-myRectangle.m);
        context.lineTo(50,myRectangle.y2-myRectangle.m-10);
        context.moveTo(60,myRectangle.y2-myRectangle.m);
        context.lineTo(70,myRectangle.y2-myRectangle.m-10);
        context.closePath();
        context.stroke();
        context.fillStyle = 'brown';
        context.beginPath();
        context.moveTo(30,myRectangle.y);
        context.lineTo(130,myRectangle.y);
        context.lineTo(130,myRectangle.y-myRectangle.m);
        context.lineTo(30,myRectangle.y-myRectangle.m);
        context.closePath();
        context.fill();
        context.fillStyle = 'black';
        context.beginPath();
        context.rect(30,myRectangle.yy, 100, 10);
        context.closePath();
        context.fill();
        context.strokeStyle = 'red';
        context.beginPath();
        context.moveTo(80,myRectangle.y);
        context.lineTo(80,myRectangle.y+25);
        context.lineWidth = 5;
        context.closePath();
        context.stroke();
        context.strokeStyle = 'red';
        context.beginPath();
        context.moveTo(80,myRectangle.yy);
        context.lineTo(80,myRectangle.yy-25);
        context.lineWidth = 5;
        context.closePath();
        context.stroke();
        var x1 = myRectangle.y+25;
        var y1 = myRectangle.yy-25;
        var z = y1 - x1;
        var diff = z/11;
        var array = [];
        var i = 0;
        for(i=0;i<11;i++)
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
        for(i=0;i<10;i++)
        {
          if(i%2 == 0)
          {
            context.lineTo(65,array[i]);
            context.arc(62,array[i],3,0,Math.PI * 2, false);
            
          }
          else
          {
            context.lineTo(95,array[i]);
            context.arc(95,array[i],3,0,Math.PI * 2, false);
          }
        }
        context.arc(80,array[10],3,0,Math.PI * 2, false);
        context.stroke();
        
        context.fillStyle = 'brown';
        context.beginPath();
        context.moveTo(30,myRectangle.y2);
        context.lineTo(130,myRectangle.y2);
        context.lineTo(130,myRectangle.y2-myRectangle.m2);
        context.lineTo(30,myRectangle.y2-myRectangle.m2);
        context.closePath();
        context.fill();
        context.fillStyle = 'black';
        context.beginPath();
        context.rect(30,myRectangle.yy2, 100, 10);
        context.closePath();
        context.fill();
        context.strokeStyle = 'red';
        context.beginPath();
        context.moveTo(80,myRectangle.y2);
        context.lineTo(80,myRectangle.y2+25);
        context.lineWidth = 5;
        context.closePath();
        context.stroke();
        context.strokeStyle = 'red';
        context.beginPath();
        context.moveTo(80,myRectangle.yy2);
        context.lineTo(80,myRectangle.yy2-25);
        context.lineWidth = 5;
        context.closePath();
        context.stroke();
        var x1 = myRectangle.y2+25;
        var y1 = myRectangle.yy2-25;
        var z = y1 - x1;
        var diff = z/11;
        var array = [];
        var i = 0;
        for(i=0;i<11;i++)
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
        context.arc(80,myRectangle.y2+25,3,0,Math.PI * 2, false);
        for(i=0;i<10;i++)
        {
          if(i%2 == 0)
          {
            context.lineTo(65,array[i]);
            context.arc(62,array[i],3,0,Math.PI * 2, false);
            
          }
          else
          {
            context.lineTo(95,array[i]);
            context.arc(95,array[i],3,0,Math.PI * 2, false);
          }
        }
        context.arc(80,array[10],3,0,Math.PI * 2, false);
        context.stroke();
        context.font = '15pt Calibri';
        context.textAlign = 'center';
        context.fillStyle = "white";
        context.fillText('M1',80,myRectangle.yy+16);
        context.fillText('M2',80,myRectangle.y-3);
      } 
      function animate(myRectangle, canvas, context,startTime) {    
        myRectangle.y = ((animpoints1[i]*100000)+80);
        myRectangle.yy = ((animpoints2[i]*100000)+250);
        myRectangle.y2 = ((animpoints2[i]*100000)+270);
        if(i == 480)
        {
            i = 100;
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
      
      var bottom = 400;
      var middle = 250;
      var top = 300;
      var myRectangle = {
        y: top,
        m: 20,
        yy: middle,
        y2: middle+20,
        m2: 20,
        yy2: bottom
      };
      drawRectangle(myRectangle, context);
      var startTime = (new Date()).getTime();
      animate(myRectangle, canvas, context,startTime);      
      
}
display();
//$("#x2xstscreen").hide();    
$("#nfnot").change(function(){
    $("#sfnot").val($("#nfnot").val());
    display();
});
$("#sfnot").change(function(){
    $("#nfnot").val($("#sfnot").val());
    display();
}); 
$("#nomega").change(function(){
    $("#somega").val($("#nomega").val());
    display();
});
$("#somega").change(function(){
    $("#nomega").val($("#somega").val());
    display();
});
$("#nk2").change(function(){
    $("#sk2").val($("#nk2").val());
    display();
});
$("#sk2").change(function(){
    $("#nk2").val($("#sk2").val());
    display();
});
$("#nm2").change(function(){
    $("#sm2").val($("#nm2").val());
    display();
});
$("#sm2").change(function() {
    $("#nm2").val($("#sm2").val());
    display();
});
$("#m1").change(function() {
    display();
});
$("#k1").change(function() {
    display();
});
$("#graphbutton").click(function(){
    var temp = $("#graphbutton").attr("class");
    if(temp == "fa fa-toggle-right")
    {
        $("#graphbutton").attr("class","fa fa-toggle-left");
        //$("#x2xstscreen").show();
        //$("#x1xstscreen").hide();        
    }
    else
    {
        $("#graphbutton").attr("class","fa fa-toggle-right");
        //$("#x2xstscreen").hide();
        //$("#x1xstscreen").show();
    }
});