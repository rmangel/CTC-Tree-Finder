$(document).ready(function()
{
	var radius = localStorage.alertRadius;
    $("#slider1").val(radius);
	$('#slider1').slider('refresh');
});

function saveSettings() 
{
    localStorage.alertRadius = $('#slider1').val();
   
} 