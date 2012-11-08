$(document).ready(function() {
    //this code is executed when the page's onload event fire 
    $.get("ProvinceData.aspx?param=NA&Item=Province", function(response) {
            $("#mapdivLeft").empty();
            $("#mapdivLeft").append(response);
        });
	 $.get("ProvinceData.aspx?param=NA&Item=Country", function(response) {
            $("#dCountry").empty();
            $("#dCountry").append(response);
        });
        $.get("ProvinceData.aspx?param=NA&Item=Detail", function(response) {
                    $("#dDetail").empty();
                    $("#dDetail").append(response);
                });   
    });
    