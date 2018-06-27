$("#graphbutton").click(function(){
    var temp = $("#graphbutton").attr("src");
    if(temp == "sins/bluefwddulls.png")
    {
        $("#graphbutton").attr("src","sins/bluebkdulls.png");        
    }
    else
    {   $("#graphbutton").attr("src","sins/bluefwddulls.png");
    }
});