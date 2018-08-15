$('.resize-done').hide();
$('button#crop').hide();
$(document).ready(function() {
	$('#fullpage').fullpage({
		//options here
		autoScrolling:true,
		scrollHorizontally: true
	});

	//methods
	$.fn.fullpage.setAllowScrolling(false);

  $('button.next').click(function()
  {
              // Progress
          $.LoadingOverlay("show", {
              image       : "",
              progress    : true,
              imageColor: "#0000FF",
          });
          var count     = 0;
          var interval  = setInterval(function(){
              if (count >= 100) {
                  clearInterval(interval);
                  $.LoadingOverlay("hide");
                  //slide down
                  $.fn.fullpage.moveSectionDown();
                  return;
              }
              count += 10;
              $.LoadingOverlay("progress", count);
          }, 300);
           var imgPath = $('input#croppedImg').val();
          //var imgPath = './assets/img/Bruv!.jpg';
          draw(imgPath);
          //change background color
          var change = "linear-gradient(rgb(0,0,255,0.8),rgb(0,0,255,0.8)),url(" + imgPath + ")";
          $('body').css('background',change);     
  });


	$("#Bigicon").click(function () {
    $("#file1").trigger('click');
  	});

  	$("#imgTrigger").click(function () {
    $("#file1").trigger('click');
  	});

  	$('button#crop').on('click',function()
  	{
  		$img = $('#resize');

		var canvas = $img.cropper('getCroppedCanvas');
		var canvaURL = canvas.toDataURL('image/jpeg');
		$('input#croppedImg').val(canvaURL);
		document.getElementById('newCroppedImg').src = canvaURL;
		//log toast
		toastr.success('Image Successfully Cropped, Click Next to continue', 'Isssshkk')
  	});

  	$('button#next').on('click',function()
  	{
  		//move the slide by one.
  		var img = $("input#file1")[0].files;
  		if(img.length == 0)
  		{
  			toastr.error('Image Field Must not be Empty', 'Bang Bang!!')
  		}
  		else
  		{
  			$.fn.fullpage.moveSectionDown();
  			$('.resize-done').show();
  			$('button#crop').show();
  			$('img#resize').attr('src',fetchImage());
  			var $image = $('#resize');

			$image.cropper({
			  aspectRatio: 16 / 9,
			  responsive:true,
			  crop: function(event) {
			    console.log(event.detail.x);
			    console.log(event.detail.y);
			    console.log(event.detail.width);
			    console.log(event.detail.height);
			    console.log(event.detail.rotate);
			    console.log(event.detail.scaleX);
			    console.log(event.detail.scaleY);
			  }
			});
			var img= $image.cropper('getCroppedCanvas').toBlob();
			console.log(img);

  		}
  		
  	});

});

function readURL(input) {
        if (input.files && input.files[0]) {
            var reader = new FileReader();
            var width = $(window).width();
            reader.onload = function (e) {
                $('#Bigicon')
                    .attr('src', e.target.result)
                    .width(200)
                    .height(100);
            };

            reader.readAsDataURL(input.files[0]);

        }
}
function fetchImage()
{
	var url = document.getElementById('Bigicon').src;
	return url;
}

function verifyInputFields()
{
	var name = document.getElementById('name').value;
	var cause = document.getElementById('cause').value;
	var about = document.getElementById('more').value;

	if(name== '' || cause == '' || about == '')
	{
		//trigger their father shhh
		toastr.error('All Fields are Required, Click Prev to go back', 'Bang Bang!!');
		$.fn.fullpage.setAllowScrolling(false, 'down');
	}
    $('span#name_').text(name);
    $('span#cause_').text(cause);

}

//Geo location
$('input#location').on('click',function(){
    		//then allow the system get access to the location
    		if (navigator.geolocation) {
          navigator.geolocation.getCurrentPosition(function(position) {
            var pos = {
              lat: position.coords.latitude,
              lng: position.coords.longitude
            };
            //console.log(pos.lat);
          var latlng = {lat: parseFloat(pos.lat), lng: parseFloat(pos.lng)};
          console.log(latlng);
          var infowindow = new google.maps.InfoWindow;
           var geocoder = new google.maps.Geocoder;
           var map = new google.maps.Map(document.getElementById('map'), {
              zoom: 8,
              center: {lat: pos.lat, lng: pos.lng}
            });
        geocoder.geocode({'location': latlng}, function(results, status) {
          if (status === 'OK') {
            if (results[0]) {
              map.setZoom(11);
              var marker = new google.maps.Marker({
                position: latlng,
                map: map
              });
              infowindow.setContent(results[0].formatted_address);
              console.log(results[0].formatted_address);
              var location=results[0].formatted_address;
              //document.getElementById('input#location').value=location;
              $('input#location').val(results[0].formatted_address);
              $('input#long').val(pos.lng);
              $('input#lat').val(pos.lat);
              infowindow.open(map, marker);
            } else {
              window.alert('No results found');
            }
          } else {
            window.alert('Geocoder failed due to: ' + status);
          }
          console.log(status);
        });
            infoWindow.setPosition(pos);
            infoWindow.setContent('Location found.');
            infoWindow.open(map);
            map.setCenter(pos);
          }, function() {
            handleLocationError(true, infoWindow, map.getCenter());
          });
        } else {
          // Browser doesn't support Geolocation
          handleLocationError(false, infoWindow, map.getCenter());
        }
    	});

function draw(imgPath) {

    var canvas = document.getElementById('myCanvas');
    var context = canvas.getContext('2d');

    var imageObj = new Image();


  imageObj.onload = function() {
    context.drawImage(imageObj, 0, 0);
    context.font = "40px Calibri";
    context.fillStyle = "#0000FF";
    context.fillText("My TEXT!", 50, 300);

    var canvas = document.getElementById('myCanvas');
    var dataURL = canvas.toDataURL();

    console.log(dataURL);
  }
  imageObj.setAttribute('crossOrigin', 'anonymous');
  imageObj.src = imgPath;  
};