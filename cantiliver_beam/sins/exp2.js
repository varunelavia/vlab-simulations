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
var materialarray = ["Bronze", "Aluminium", "Steel"];
var crosssecarray = ["tsec","lsec","isec","csec","squaresec","circlesec"];
var crosssecfullarray = ["t section","l section","i section","c section","square section","circle section"];
var k = 0;
var omegan = 0;
function check2()
		{
            var answer = $("#answer2").val();
            var deviation = Math.abs(((100 * answer)/delta)-100);
		    if(answer != "")
		    {
		        if(deviation <= 10)
		        {
		            alert("Correct Answer");
		        }
		        else
		        {
		            alert("Incorrect Answer !! Correct answer is "+delta.toFixed(4));
		        }
		    }
		    else
		    {
		        alert("Please Enter the answer");
		    }
		}
function display()
{
    
    var zeta = ((Math.random() * (0.2 - 0) ) + 0).toFixed(2);
    var length = Math.floor(Math.random() * (3000 - 1000 + 1) ) + 1000;
    var lumpmass = ((Math.random() * (100 - 0 + 1) ) + 0).toFixed(2);
    var material = materialarray[Math.floor(Math.random() * (2 - 0 + 1) ) + 0];
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
    var crosssecindex = Math.floor(Math.random() * (5 - 0 + 1) ) + 0;
    var crosssec = crosssecarray[crosssecindex];
    var crosssecname = crosssecfullarray[crosssecindex];
    
    switch(crosssec)
    {
        case "tsec":
        {
            var area = atsec;
            var i = itsec;
            $("#crosssecimg").attr("src","sins/imgt.png");
            break;
        }
        case "isec":
        {
            var i = iisec;
            var area = aisec;
            $("#crosssecimg").attr("src","sins/imgi.png");
            break;
        }
        case "lsec":
        {
            var i = ilsec;
            var area = alsec;
            $("#crosssecimg").attr("src","sins/imgl.png");
            break;
        }
        case "csec":
        {
            var i = icsec;
            var area = acsec;
            $("#crosssecimg").attr("src","sins/imgc.png");
            break;
        }
        case "squaresec":
        {
            var i = isqsec;
            var area = asqsec;
            $("#crosssecimg").attr("src","sins/imgsquare.png");
            break;
        }
        case "circlesec":
        {
            var i = icirclesec;
            var area = acirclesec;
            $("#crosssecimg").attr("src","sins/imgcircle.png");
            break;
        }
        case "othersec":
        {
            var i = $("#otherixx").val();
            var area = $("#otherccarea").val();
            break;
        }
        
    }
    $("#type").html(material);
    $("#crosssec").html(crosssecname);
    $("#nlen").html(length);
    $("#ndratio").html(zeta);
    $("#nemass").html(lumpmass);
    
    
    
    var mass = parseInt(lumpmass) + ((density * area * parseInt(length))/3);
    k = (3 * e * i) / (Math.pow(parseInt(length),3));
    var c = 2 * Math.sqrt((mass/1000)*k) * zeta;
    omegan = Math.sqrt((k*1000)/mass);
    var omegad = omegan * Math.sqrt(1-Math.pow(zeta,2));
    //$("#commentboxright").html("Mass = "+mass.toFixed(2)+" Kg, K = "+k.toFixed(2)+" N/mm, c = "+c.toFixed(2)+" Ns/mm, Wn = "+omegan.toFixed(2)+" rad/sec, Wd = "+omegad.toFixed(2)+" rad/sec.");
    $("#graphimgvalue").html("Wd = "+omegad.toFixed(2)+" rad/s");
    updategraph(zeta,omegan);
}
display();
//$("#graphimg").hide();
//$("#graphimgvalue").hide();
$("#materialdetail").hide();
$("#crosssecdetail").hide();    
$("#info").hide();    

//$("#commentboxleft").hide();    
//$("#canvasid").hide();    


$("#query").mouseenter(function(){
    $("#info").show();
});
$("#query").mouseleave(function(){
    $("#info").hide();
});
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
    var temp = $("#crosssec").val();
    switch(temp)
    {
        case "csec":
        {
            $("#commentboxleft").hide();
            $("#crosssecimg").attr("src","sins/imgc.png");
            break;
        }
        case "tsec":
        {
            $("#commentboxleft").hide();
            $("#crosssecimg").attr("src","sins/imgt.png");
            break;
        }
        case "isec":
        {
            $("#commentboxleft").hide();
            $("#crosssecimg").attr("src","sins/imgi.png");
            break;
        }
        case "lsec":
        {
            $("#commentboxleft").hide();
            $("#crosssecimg").attr("src","sins/imgl.png");
            break;
        }
        case "circlesec":
        {
            $("#commentboxleft").hide();
            $("#crosssecimg").attr("src","sins/imgcircle.png");
            break;
        }
        case "othersec":
        {
            $("#commentboxleft").show();
            $("#crosssecimg").attr("src","sins/imgother.png");
            break;
        }
        case "squaresec":
        {
            $("#commentboxleft").hide();
            $("#crosssecimg").attr("src","sins/imgsquare.png");
            break;
        }
    }
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

$("#restart").click(function(){
    display();
});
$("#check").click(function(){
    check();
});
$("#check2").click(function(){
    check2();
});
$("#check3").click(function(){
    check3();
});

$("#animbutton").click(function(){
    var temp = $("#animbutton").attr("class");
    if(temp == "fa fa-play")
    {
        $("#animbutton").attr("class","fa fa-pause");
    }
    else
    {
        $("#animbutton").attr("class","fa fa-play");
    }
});
