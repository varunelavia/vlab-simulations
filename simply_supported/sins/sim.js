var ebronze = 111006;
var esteel = 200000;
var ealuminium = 70330;
var dsteel = 0.000007750;
var dbronze = 0.000008304;
var daluminium = 0.000002712;
var aisec = 1480;
var alsec = 2259;
var atsec = 2888;
var acsec = 1170;
var asqsec = 22500;
var acirclesec = 17672;
var itsec = 5411000;
var iisec = 2575000;
var icsec = 1867000;
var ilsec = 2070000;
var isqsec = 42187500;
var icirclesec = 2485.05;
function display()
{
    
    var zeta = $("#ndratio").val();
    var length = $("#nlen").val();
    var lumpmass = $("#nemass").val();
    var material = $("#type").val();
    switch(material)
    {
        case "Bronze":
        {
            var density = dbronze;
            var e = ebronze;
            break;
        }
        case "Steel":
        {
            var e = esteel;
            var density = dsteel;
            break;
        }
        case "Aluminium":
        {
            var e = ealuminium;
            var density = daluminium;
            break;
        }
    }
    var crosssec = $("#crosssec").val();
    switch(crosssec)
    {
        case "tsec":
        {
            var area = atsec;
            var i = itsec;
            $("#commentboxleft").hide();
            $("#crosssecimg").attr("src","sins/imgt.png");
            break;
        }
        case "isec":
        {
            var i = iisec;
            var area = aisec;
            $("#commentboxleft").hide();
            $("#crosssecimg").attr("src","sins/imgi.png");
            break;
        }
        case "lsec":
        {
            var i = ilsec;
            var area = alsec;
            $("#commentboxleft").hide();
            $("#crosssecimg").attr("src","sins/imgl.png");
            break;
        }
        case "csec":
        {
            var i = icsec;
            var area = acsec;
            $("#commentboxleft").hide();
            $("#crosssecimg").attr("src","sins/imgc.png");
            break;
        }
        case "squaresec":
        {
            var i = isqsec;
            var area = asqsec;
            $("#commentboxleft").hide();
            $("#crosssecimg").attr("src","sins/imgsquare.png");
            break;
        }
        case "circlesec":
        {
            var i = icirclesec;
            var area = acirclesec;
            $("#commentboxleft").hide();
            $("#crosssecimg").attr("src","sins/imgcircle.png");
            break;
        }
        case "othersec":
        {
            var i = $("#otherixx").val();
            var area = $("#otherccarea").val();
            $("#commentboxleft").show();
            $("#crosssecimg").attr("src","sins/imgother.png");
            break;
        }
        
    }
    var mass = parseInt(lumpmass) + ((density * area * parseInt(length))/2);
    var k = (48 * e * i) / (Math.pow(parseInt(length),3));
    var c = 2 * Math.sqrt((mass/1000)*k) * zeta;
    var omegan = Math.sqrt((k*1000)/mass);
    var omegad = omegan * Math.sqrt(1-Math.pow(zeta,2));
    $("#commentboxright").html("Mass = "+mass.toFixed(2)+" Kg, K = "+k.toFixed(2)+" N/mm, c = "+c.toFixed(2)+" Ns/mm, &omega;<sub>n</sub> = "+omegan.toFixed(2)+" rad/sec, &omega;<sub>d</sub> = "+omegad.toFixed(2)+" rad/sec.");
    $("#graphimgvalue").html("&omega;<sub>d</sub> = "+omegad.toFixed(2)+" rad/s");
    updategraph(zeta,omegan);
    window.requestAnimFrame = (function(callback) {
        return window.requestAnimationFrame || window.webkitRequestAnimationFrame || window.mozRequestAnimationFrame || window.oRequestAnimationFrame || window.msRequestAnimationFrame ||
        function(callback) {
        };
      })();
      var i = 0;
      function drawRectangle(myRectangle, context) {
        context.fillStyle = "black";
        context.beginPath();
        context.moveTo(50,260);
        context.lineTo(30,280);
        context.lineTo(70,280);
        context.closePath();
        context.fill();
        context.fillStyle = "black";
        context.beginPath();
        context.moveTo((myRectangle.x * 2) + 50,260);
        context.lineTo((myRectangle.x * 2) + 50 - 20,280);
        context.lineTo((myRectangle.x * 2) + 50 + 20,280);
        context.closePath();
        context.fill();
        context.fillStyle = "blue";
        context.beginPath();
        context.moveTo(50, 240);
        context.quadraticCurveTo(myRectangle.x+50,myRectangle.y-10,(myRectangle.x*2)+50,240);
        context.lineTo((myRectangle.x*2)+50,260);
        context.quadraticCurveTo(myRectangle.x+50,myRectangle.y+10,50,260);
        context.closePath();
        context.fill();
        var temp1x = (myRectangle.x+50 + 50) / 2;
        var temp1y = (myRectangle.y + 250) / 2;
        var temp2x = (((myRectangle.x * 2)+50) + (myRectangle.x + 50)) / 2;
        var temp2y = (myRectangle.y + 250) / 2;
        var temp3x = (temp2x + temp1x) / 2;
        var temp3y = (temp2y + temp1y) / 2;
        context.fillStyle = "brown";
        context.beginPath();
        context.moveTo(temp3x,temp3y);
        context.arc(temp3x,temp3y,myRectangle.radius , 0, 2 * Math.PI);
        context.closePath();
        context.fill();
      }
      function animate(myRectangle, canvas, context, startTime) {
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
            animate(myRectangle, canvas, context, startTime);
        });
      }
      var canvas = document.getElementById('simscreen');
      var context = canvas.getContext('2d');
      var templength = length;
      var scalingfactor = templength/250;
      var quotient = Math.floor(scalingfactor);
      var remainder = templength - (quotient * 250);
      if(remainder < 100)
      {
          remainder = remainder + 100;
      }
      else
      {
          remainder = remainder;
      }
      if(templength%250 == 0)
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
        y: 240,
        width: 100,
        height: 50,
        radius: tempmass,
        borderWidth: 5
      };
      drawRectangle(myRectangle, context);
      var startTime = (new Date()).getTime();
      animate(myRectangle, canvas, context, startTime);
}
display();
$("#graphimg").hide();
$("#graphimgvalue").hide();
$("#materialdetail").hide();
$("#crosssecdetail").hide();    
$("#commentboxleft").hide();    
$("#graphcanvasid").hide();    
$("#type").mouseenter(function(){
    $("#materialdetail").show();
});
$("#type").mouseleave(function(){
    $("#materialdetail").hide();
});
$("#crosssecimg").mouseenter(function(){
    var temp = $("#crosssecimg").attr("src");
    switch(temp)
    {
        case "sins/imgi.png":
        {
            $("#crosssecdetail").html("ISMB100 <br> h=100 mm,b=75 mm,<br>t1=4 mm,t2=7.2 mm,<br>Ixx=257.5 cm^4,Iyy=40.8 cm^4,<br>A=14.8 cm^2");
            break;
        }
        case "sins/imgt.png":
        {
            $("#crosssecdetail").html("ISNT150 <br> h=150 mm,b=150 mm,<br>t1=10 mm,t2=10 mm,<br>Ixx=541.1 cm^4,Iyy=350.3 cm^4,<br>A=28.88 cm^2");
            break;
        }
        case "sins/imgc.png":
        {
            $("#crosssecdetail").html("ISMC100 <br> h=100 mm,b=50 mm,<br>t1=4.7 mm,t2=7.5 mm,<br>Ixx=186.7 cm^4,Iyy=25.9 cm^4,<br>A=11.7 cm^2");
            break;
        }
        case "sins/imgl.png":
        {
            $("#crosssecdetail").html("ISA100100 <br> h=100 mm,b=100 mm,<br>t=12 mm,<br>Ixx=207 cm^4,Iyy=207 cm^4,<br>A=22.59 cm^2");
            break;
        }
        case "sins/imgsquare.png":
        {
            $("#crosssecdetail").html("h=150 mm,b=150 mm,<br>Ixx=4218.75 cm^4,Iyy=4218.75 cm^4,<br>A=225 cm^2");
            break;
        }
        case "sins/imgcircle.png":
        {
            $("#crosssecdetail").html("D=150 mm,<br>Ixx=2485.05 cm^4,Iyy=2485.05 cm^4,<br>A=176.72 cm^2");
            break;
        }
        case "sins/imgother.png":
        {
            $("#crosssecdetail").html("Enter Parameters Below");
            break;
        }
    }
    $("#crosssecdetail").show();
});
$("#crosssecimg").mouseleave(function(){
    $("#crosssecdetail").hide();
});
$("#ndratio").change(function(){
    $("#sdratio").val($("#ndratio").val());
    display();
});
$("#sdratio").change(function(){
    $("#ndratio").val($("#sdratio").val());
    display();
}); 
$("#nemass").change(function(){
    $("#semass").val($("#nemass").val());
    display();
});
$("#semass").change(function(){
    $("#nemass").val($("#semass").val());
    display();
});
$("#crosssec").change(function(){
    display();
});
$("#nlen").change(function() {
    display();
});
$("#type").change(function() {
    display();
});
$("#otherixx").change(function() {
    display();
});
$("#otherccarea").change(function() {
    display();
});
$("#graphbutton").click(function(){
    var temp = $("#graphbutton").attr("src");
    if(temp == "sins/bluefwddulls.png")
    {
        $("#graphbutton").attr("src","sins/bluebkdulls.png");
        $("#graphimg").show();
        $("#graphimgvalue").show();
        $("#graphcanvasid").show();
        $("#animationcanvasid").hide();
    }
    else
    {
        $("#graphbutton").attr("src","sins/bluefwddulls.png");
        $("#graphimg").hide();        
        $("#graphimgvalue").hide();    
        $("#graphcanvasid").hide();           
        $("#animationcanvasid").show();
        
    }
});