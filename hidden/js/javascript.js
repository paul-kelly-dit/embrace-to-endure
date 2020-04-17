$.fn.widthPerc = function(){
    var parent = this.parent();
    return ~~((this.width()/parent.width())*100)+"%";
}

$.fn.isOnScreen = function(){

    var win = $(window);

    var viewport = {
        top : win.scrollTop(),
        left : win.scrollLeft()
    };
    viewport.right = viewport.left + win.width();
    viewport.bottom = viewport.top + win.height();

    var bounds = this.offset();
    bounds.right = bounds.left + this.outerWidth();
    bounds.bottom = bounds.top + this.outerHeight();

    return (!(viewport.right < bounds.left || viewport.left > bounds.right || viewport.bottom < bounds.top || viewport.top > bounds.bottom));

};


//*-*-*-*-*-*-*-*-*-*-*-*
//  START OF DOM READY
//*-*-*-*-*-*-*-*-*-*-*-*
$(document).ready(function() {

    checkCookies();

    checkPopup('signupOverlay');

    $('.overlayNav li a').hover(function() {
	    $(this).parent('li').siblings('li').children('a').addClass('notHover');
	}, function() {
	    $('.notHover').removeClass('notHover');
	});

	/*$('.overlayNav li:not(.separator)').hover(function() {
	    $(this).siblings('li').children('a').addClass('notHover');
	}, function() {
	    $('.notHover').removeClass('notHover');
	});*/

	$(document).on('click','.linky',function(e){
		e.preventDefault();
		if($(this).parents().hasClass('pageNav')){
			var id = $(this).attr('id');
			window.location.href = '/#'+id;
		}else{
			var id = $(this).attr('id');
			if(id == 'about'){
				var pos = $('.aboutContent').offset().top;
		    	$('html, body').animate({
		    		scrollTop: pos
		    	}, 600);
			}else if(id == 'contact'){
				var pos = $('.contactWrapper').offset().top;
				pos = pos - 60;
		    	$('html, body').animate({
		    		scrollTop: pos
		    	}, 600);
			}
		}
	});

	$(document).on('click','.scrollDown',function(e){
		e.preventDefault();
		var pos = $('.aboutContent').offset().top;
    	$('html, body').animate({
    		scrollTop: pos
    	}, 600);
	});

	//Social
	//Twitter
	$(document).on('click','.twitterButton', function(event) {
	    var width  = 575,
	        height = 400,
	        left   = ($(window).width()  - width)  / 2,
	        top    = ($(window).height() - height) / 2,
	        url    = this.href,
	        opts   = 'status=1' +
	                 ',width='  + width  +
	                 ',height=' + height +
	                 ',top='    + top    +
	                 ',left='   + left;

	    window.open(url, 'twitter', opts);

	    return false;
	});

	//Facebook
	$(document).on('click','.facebook.socialButton', function(event) {
		event.preventDefault();
	    var width  = 575,
	        height = 400,
	        left   = ($(window).width()  - width)  / 2,
	        top    = ($(window).height() - height) / 2,
	        url    = this.href,
	        opts   = 'status=1' +
	                 ',width='  + width  +
	                 ',height=' + height +
	                 ',top='    + top    +
	                 ',left='   + left;

	    window.open(url, '_blank', opts);

	    return false;
	});

	$(document).on('focus','input.invalidEntry',function(){
		$(this).removeClass('invalidEntry');
	});

	//signup
	$(document).on('click','#signup_form button',function(e){
		e.preventDefault();
		currentFormButton = $(this);
		valid = true;

		email = $('#email').val();

		if (!isEmail(email)) {
			$('#email').addClass('invalidEntry');
			valid = false;
		}

		$("#signup_form input.required").each(function() {
			if (!$(this).val() || $(this).val() == '' || $(this).val() == $(this).attr('placeholder')) {
				$(this).addClass('invalidEntry');
				valid = false;
			}
		});

		if (!valid) {
			$('.signupResponse').html('Please enter a valid email');
		}else{
			/*url = '../php/ajax/signUp.php?email=' + email;
			url = encodeURI(url);
			$.get(url, function(data) {

				$('#signup_form')[0].reset();

				var status = data.split("|");
				var response = status[0];
				var message = status[1];

				$('.signupResponse').html(message);

				if(response == 'SUCCESS'){
					//$('.signupResponse').fadeOut(500,function(){
						$('#signup_form a').fadeOut();
						$('.signupResponse').html('Thank you for signing up.');
						$('.signupResponse').fadeIn(500);
						$('#signup_form').trigger("reset");
						setTimeout(function(){
							$('.signupOverlay').removeClass('open');
							$('.menuToggle').removeClass('light');
							createCookie('signupcookie','off',9999);
						},4000);
					//});
				}else{
					$('.signupResponse').fadeOut(500,function(){
						$('.signupResponse').html(message);
						$('.signupResponse').fadeIn(500);
					});
				}
			});*/

			var data = {
		      "PostData": {
		        "emailAddress": email
		      }
		    };


	        $.ajax({
	          type: "POST",
	          url: "https://web2.cendynhub.com/FormsRest/submit/381D539A-C629-4CB9-802C-230813D44FBE?format=json",
	          contentType: "application/json",
	          crossDomain: true,
	          dataType: "json",
	          data: JSON.stringify(data)
	        }).done(function(result) {
	          if (result !== null) {
	            //alert(result.Message);
	            $('.signupResponse').fadeOut(500,function(){
					$('#signup_form a').fadeOut();
					$('.signupResponse').html('Thank you for signing up.');
					$('.signupResponse').fadeIn(500);
					$('#signup_form').trigger("reset");
					setTimeout(function(){
						$('.signupOverlay').removeClass('open');
						$('.menuToggle').removeClass('light');
						createCookie('signupcookie','off',9999);
					},4000);
				});
	          }
	        }).fail(function(XMLHttpRequest, textStatus, errorThrown) {
	          //alert("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
	          $('.signupResponse').fadeOut(500,function(){
					$('.signupResponse').html("Request: " + XMLHttpRequest.toString() + "\n\nStatus: " + textStatus + "\n\nError: " + errorThrown);
					$('.signupResponse').fadeIn(500);
				});
	        });

		}
		return false;
	});

	$(document).on('click','.openSignup',function(e){
		e.preventDefault();
		openSignup();
	});

	$(document).on('click','.menuToggle, .closeMenu, .closeNav',function(e){
		e.preventDefault();
		toggleNav();
	});

	$(document).on('click','.signupOverlay, .closeSignup',function(e){
		e.preventDefault();
		if($(e.target).hasClass('signupOverlay') || $(e.target).hasClass('closeSignup')){
			$('.signupOverlay').removeClass('open');
			$('.menuToggle').removeClass('light');
			if($('.signupOverlay').hasClass('bookingOverlay')){
				createCookie('bookingcookie','off',1);
			}else{
				createCookie('signupcookie','off',3);
			}
		}
	});

	$(document).on('click','.bookingOverlay .right a',function(e){
		e.preventDefault();
    if($(this).hasClass('button')){
      createCookie('bookingcookie','off',1);
  		window.location.href = 'https://booking.thepilgrm.com';
    }else{
      window.location.href = 'https://thepilgrm.com/terms';
    }
	});

	$('.hotelTopSlider').imagesLoaded(function() {
	  // init Isotope after all images have loaded
	  $('.hotelTopSlider').slick({
		  slidesToShow: 1,
		  slidesToScroll: 1,
      lazyLoad: 'ondemand',
		  dots: true,
		  arrows:false,
			infinite:true,
			swipe: true,
			fade: true,
			//autoplay:true,
			autplay:false,
			autoplaySpeed:3000,
			pauseOnHover:false
		});
	});

	var slider = $('.roomSlides');

	slider.slick({
	  	slidesToShow: 1,
	  	slidesToScroll: 1,
	  	dots: true,
	  	arrows:false,
		infinite:true,
		swipe: true
	});

	var loungeSlider = $('.loungeSlides');

	loungeSlider.slick({
	  	slidesToShow: 1,
	  	slidesToScroll: 1,
	  	dots: true,
	  	arrows:false,
		infinite:true,
		swipe: true
	});

	var cafeSlider = $('.cafeSlides');

	cafeSlider.slick({
	  	slidesToShow: 1,
	  	slidesToScroll: 1,
	  	dots: true,
	  	arrows:false,
		infinite:true,
		swipe: true
	});

  var neighbourhoodSlides = $('.neighbourhoodSlides');

  neighbourhoodSlides.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      dots: true,
      arrows:false,
      infinite:true,
      swipe: true
  });

  var homeTopSlider = $('.homeTopSlider');

  var total = $('.homeTopSlider .oneSlide').length, // get the number of slides
      rand = Math.floor( Math.random() * total ); // random number

      console.log(total);

  homeTopSlider.slick({
      slidesToShow: 1,
      slidesToScroll: 1,
      lazyLoad: 'ondemand',
      dots: false,
      arrows:false,
      infinite:true,
      swipe: true,
      autoplay: true,
      autoplaySpeed: 3000,
      fade: true,
      speed: 3000,
      initialSlide: rand
  });

    $(document).on('click','.cookieButton a',function(e){
        e.preventDefault();
        $('.cookieBar').removeClass('show');
        createCookie('cookiecookie','on',30);
    });


    $(document).on('click','.roomsNav .middle a',function(e){
		e.preventDefault();
		var link = $(this);

		if(!link.hasClass('active')){
			var type = link.data('type');
			$('.roomsNav .middle a.active').removeClass('active');
			link.addClass('active');
			$('.roomContent').removeClass('active');
			setTimeout(function(){
				$('.roomContent').removeClass('show');
				$('.'+type).addClass('show');
				$('.'+type).addClass('active');
				$(".roomSlides").slick("refresh");
			},600);


		}
	});

	$(document).on('click','.inventoryNav a',function(e){
		e.preventDefault();
		var link = $(this);
		if(!link.hasClass('active')){
			var type = link.data('type');
			$('.inventoryNav a.active').removeClass('active');
			link.addClass('active');
			$('.inventoryContent').removeClass('active');
			setTimeout(function(){
				$('.inventoryContent').removeClass('show');
				$('.'+type).addClass('show');
				$('.'+type).addClass('active');
			},600);
		}
	});

	$(document).on('click','.overlayNav ul li a.inline',function(e){
		var link = $(this).attr('href');
		if($('html').hasClass('index')){
			e.preventDefault();
			closeMenu();
			if(link == '/about'){
				var pos = $('.aboutContent').offset().top;
		    	$('html, body').animate({
		    		scrollTop: pos
		    	}, 650);
			}else if(link == '/contact'){
				var pos = $('.contactWrapper').offset().top;
				pos = pos - 60;
		    	$('html, body').animate({
		    		scrollTop: pos
		    	}, 650);
			}else if(link == '/rooms'){
				var pos = $('.roomsHolder').offset().top;
				pos = pos - 60;
		    	$('html, body').animate({
		    		scrollTop: pos
		    	}, 650);
			}else if(link == '/food'){
				var pos = $('.hotelMain').offset().top;
				pos = pos - 80;
		    	$('html, body').animate({
		    		scrollTop: pos
		    	}, 650);
			}else if(link == '/offer'){
				var pos = $('#benefits').offset().top;
		    	$('html, body').animate({
		    		scrollTop: pos
		    	}, 650);
        }else if(link == '/benefits'){
      		var pos = $('#benefits').offset().top;
          	$('html, body').animate({
          		scrollTop: pos
          	}, 650);
      	}else if(link == '/rates'){
      		var pos = $('#rates').offset().top;
          	$('html, body').animate({
          		scrollTop: pos
          	}, 650);
      	}else if(link == '/lounge'){
				var pos = $('.loungeSection').offset().top;
		    	$('html, body').animate({
		    		scrollTop: pos
		    	}, 650);
			}else if(link == '/cafe'){
				var pos = $('.cafeSection').offset().top;
		    	$('html, body').animate({
		    		scrollTop: pos
		    	}, 650);
			}else if(link == '/location'){
				var pos = $('.mapHolder').offset().top;
		    	$('html, body').animate({
		    		scrollTop: pos
		    	}, 650);
			}
			if(history.pushState) {
			    history.pushState(null, null, link);
			}
		}
	});
});
//*-*-*-*-*-*-*-*-*-*-*-*
//   END OF DOM READY
//*-*-*-*-*-*-*-*-*-*-*-*

$(window).on('load',function(){


	var link = window.location.pathname;
	if(link == '/about'){
		var pos = $('.aboutContent').offset().top;
    	$('html, body').animate({
    		scrollTop: pos
    	}, 650);
	}else if(link == '/contact'){
		var pos = $('.contactWrapper').offset().top;
		pos = pos - 60;
    	$('html, body').animate({
    		scrollTop: pos
    	}, 650);
	}else if(link == '/rooms'){
		var pos = $('.roomsHolder').offset().top;
		pos = pos - 60;
    	$('html, body').animate({
    		scrollTop: pos
    	}, 650);
	}else if(link == '/food'){
		var pos = $('.hotelMain').offset().top;
		pos = pos - 80;
    	$('html, body').animate({
    		scrollTop: pos
    	}, 650);
	}else if(link == '/offer'){
		var pos = $('#benefits').offset().top;
    	$('html, body').animate({
    		scrollTop: pos
    	}, 650);
	}else if(link == '/benefits'){
		var pos = $('#benefits').offset().top;
    	$('html, body').animate({
    		scrollTop: pos
    	}, 650);
	}else if(link == '/rates'){
		var pos = $('#rates').offset().top;
    	$('html, body').animate({
    		scrollTop: pos
    	}, 650);
	}else if(link == '/lounge'){
		var pos = $('.loungeSection').offset().top;
    	$('html, body').animate({
    		scrollTop: pos
    	}, 650);
	}else if(link == '/cafe'){
		var pos = $('.cafeSection').offset().top;
    	$('html, body').animate({
    		scrollTop: pos
    	}, 650);
	}else if(link == '/location'){
    var pos = $('.mapHolder').offset().top;
      $('html, body').animate({
        scrollTop: pos
      }, 650);
  }else if(link == '/signup'){
		openSignup();
	}

	if($('.mapHolder').length){
		loadScript();
	};
});

$(window).on('resize orientationchange load', function(){
	matchInventoryHeights();
});

$(window).on('load scroll', function(){
	parallaxTop();

	if($('.hotelTop .col_1-2').length){
		if($('.hotelTop .col_1-2').isOnScreen() && !$('.hotelTop .col_1-2').hasClass('run')){
			$('.hotelTop .col_1-2').addClass('animate run');
		}
	}

	var slider = $('.hotelTopSlider').slick;

	if($('.hotelTopSlider').length){
		if($('.hotelTopSlider').isOnScreen()){
			$('.hotelTopSlider').slick('slickPlay');
		}
	}

	$('.hotelMain .col_1-2').each(function(){
		var current = $(this);
		if(current.isOnScreen() && !current.hasClass('run')){
			current.addClass('animate run');
		}
	});

	$('.inventory .inner').each(function(){
		var current = $(this);
		if(current.isOnScreen() && !current.hasClass('run')){
			current.addClass('animate run');
		}
	});

	$('.roomsHolder').each(function(){
		var current = $(this);
		if(current.isOnScreen() && !current.hasClass('run')){
			current.addClass('animate run');
		}
	});

});

function loadMenu(){
	$('.overlayNav').css('display','block');
}

function closeMenu(){
	var nav = $('.overlayNav');
	var body = $('body');
	$('.topI').removeClass('topAnimate');
	$('.midI').removeClass('midAnimate');
	$('.bottomI').removeClass('bottomAnimate');
	nav.removeClass('open');
	body.removeClass('noscroll');
}

function openSignup(){
	if($('.signupOverlay.signupPopup').length){
		closeMenu();
		$('.signupOverlay.signupPopup').addClass('open');
		$('.menuToggle').addClass('light');
	}
}

function openBooking(){
	if($('.signupOverlay.bookingOverlay').length){
		closeMenu();
		$('.signupOverlay.bookingOverlay').addClass('open');
		$('.menuToggle').addClass('light');
	}
}

function runLoadingScreen(){
	$('.loadingScreen .line .inner').width('100%');
	var loading = setInterval(function(){
		if($('.loadingScreen .line .inner').widthPerc() == '100%' && !$('.loadingScreen .line .inner').hasClass('finished')){
			$('.loadingScreen .line .inner').addClass('finished');
		}

		if($('.loadingScreen .line .inner').hasClass('finished')){

			//hide loading screen - fades it out, revealing black middle screen
			$('.loadingScreen').addClass('hide');

			setTimeout(function(){ //start 1

				//displays none on loading screen
				$('.loadingScreen').addClass('remove');

				//hide middle screen - fades it out, revealing video
				$('.middleScreen').addClass('hide');

				//show the logo - but this has a css delay on the transition, so it can come in before the middle screen has fully gone
				$('.topContent .logo').addClass('show');

				setTimeout(function(){ //start 2

					//display none on middle screen
					$('.middleScreen').addClass('remove');
					$('.topContent .location h2').addClass('show');
					$('.topContent .scrollDown').addClass('show');

				},3000); //end 2 - middle screen fade out

			},1200); //end 1 - loading screen fade out
		}

		if($('.topContent .location h2').hasClass('show')){
			clearInterval(loading);
			createCookie('loadingcookie','off',1);
		}

	},100); //end interval for the
}

function skipLoadingScreen(){
	$('.loadingScreen').addClass('remove');
	$('.middleScreen').addClass('remove');
	$('.topContent .logo').addClass('show');
	$('.topContent .location h2').addClass('show');
	$('.topContent .scrollDown').addClass('show');
}

function matchInventoryHeights(){
	var includedH = $('.inventoryContent.included').actual('height');
	var excludedH = $('.inventoryContent.excluded').actual('height');
	if(includedH > excludedH){
		$('.inventoryContent.excluded').height(includedH);
	}else{
		$('.inventoryContent.included').height(excludedH);
	}
}

function parallaxTop(){

	var x = $(this).scrollTop()/5;
   	if(x > 200){
   		x = 200;
   	}

   	var y = $(this).scrollTop()/6;
   	if(y > 200){
   		y = 200;
   	}

	$('.topContent .logo').css({
      'margin-top' : -x+"px"
   	});
   	$('.topContent video').css({
      'margin-top' : y+"px"
   	});
}

function toggleNav(){
	$('.overlayNav').toggleClass('open');
}

// function toggleNav(){
// 	var nav = $('.overlayNav');
// 	var body = $('body');
// 	$('.topI').toggleClass('topAnimate');
// 	$('.midI').toggleClass('midAnimate');
// 	$('.bottomI').toggleClass('bottomAnimate');
// 	nav.toggleClass('open');
// 	body.toggleClass('noscroll');
// }

//email
function isEmail(email) {
	var regex = /^([a-zA-Z0-9_.+-])+\@(([a-zA-Z0-9-])+\.)+([a-zA-Z0-9]{2,4})+$/;
	return regex.test(email);
}

function openPopup(type){
    if($('.popupOverlay.'+type).length){
        $('.popupOverlay.'+type).addClass('open');
    }
}

function checkPopup(type){
    setTimeout(function(){
        var cookieState = readCookie(type+'Cookie');
        if (cookieState != 'on') {
            openPopup(type);
        }
    }, 30000);
}

//cookies
function checkCookies(){
    var cookieState = readCookie('cookiecookie');
    if (cookieState != 'on') {
        $('.cookieBar').addClass('show');
    }else{
        $('.cookieBar').removeClass('show');
    }
}

function createCookie(name,value,days) {
    if (days) {
        var date = new Date();
        date.setTime(date.getTime()+(days*24*60*60*1000));
        var expires = "; expires="+date.toGMTString();
    }
    else var expires = "";
    document.cookie = name+"="+value+expires+"; path=/";
}

function readCookie(name) {
    var nameEQ = name + "=";
    var ca = document.cookie.split(';');
    for(var i=0;i < ca.length;i++) {
        var c = ca[i];
        while (c.charAt(0)==' ') c = c.substring(1,c.length);
        if (c.indexOf(nameEQ) == 0) return c.substring(nameEQ.length,c.length);
    }
    return null;
}

function eraseCookie(name) {
    createCookie(name,"",-1);
}


// global variable for the player
var player;

// this function gets called when API is ready to use
function onYouTubePlayerAPIReady() {
  // create the global player from the specific iframe (#video)

  $('.previewVideo').each(function(e){
	var video_id = $(this).attr('id');
	player = new YT.Player(video_id, {
		playerVars:{
			loop: 1
		},
	    events: {
	      // call this function when player is ready to use
	      'onReady': function(e){
	      	e.target.mute();
	      }
	    }
	  });
  });
}

// Inject YouTube API script
var tag = document.createElement('script');
tag.src = "//www.youtube.com/player_api";
var firstScriptTag = document.getElementsByTagName('script')[0];
firstScriptTag.parentNode.insertBefore(tag, firstScriptTag);

//google maps
function loadScript() {
	var script = document.createElement('script');
	script.type = 'text/javascript';
  //script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyBGK5BHBsaNCBXfsw7XDfmYdqsbQHMsKK8&callback=initialize';
	script.src = 'https://maps.googleapis.com/maps/api/js?key=AIzaSyCMBgnLOSH9EwLTfG3NP7XSAKWEqI9oGCc&callback=initialize';
	document.body.appendChild(script);
}

function initialize() {
	var map;
	var location;


	var stylez = [
  {
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f3f3ed"
      }
    ]
  },
  {
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#0e1419"
      }
    ]
  },
  {
    "featureType": "administrative",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#c9b2a6"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#dcd2be"
      }
    ]
  },
  {
    "featureType": "administrative.land_parcel",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#ae9e90"
      }
    ]
  },
  {
    "featureType": "landscape.natural",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "poi",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#93817c"
      }
    ]
  },
  {
    "featureType": "poi.business",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#a5b076"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text",
    "stylers": [
      {
        "visibility": "off"
      }
    ]
  },
  {
    "featureType": "poi.park",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#447530"
      }
    ]
  },
  {
    "featureType": "road",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f5f1e6"
      }
    ]
  },
  {
    "featureType": "road.arterial",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fffefb"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#f8c967"
      }
    ]
  },
  {
    "featureType": "road.highway",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#e9bc62"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#e98d58"
      }
    ]
  },
  {
    "featureType": "road.highway.controlled_access",
    "elementType": "geometry.stroke",
    "stylers": [
      {
        "color": "#db8555"
      }
    ]
  },
  {
    "featureType": "road.local",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#fffefb"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#8f7d77"
      }
    ]
  },
  {
    "featureType": "transit.line",
    "elementType": "labels.text.stroke",
    "stylers": [
      {
        "color": "#ebe3cd"
      }
    ]
  },
  {
    "featureType": "transit.station",
    "elementType": "geometry",
    "stylers": [
      {
        "color": "#dfd2ae"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "geometry.fill",
    "stylers": [
      {
        "color": "#b9d3c2"
      }
    ]
  },
  {
    "featureType": "water",
    "elementType": "labels.text.fill",
    "stylers": [
      {
        "color": "#92998d"
      }
    ]
  }
];

	var image = "/images/pilgrm_here_I_am.svg";

	var lat = '53.351310';
	var lng = '-6.251820';

  	var url = "https://www.google.com/maps/place/The+Ripley+Court+Hotel/@53.3513287,-6.2537795,17z/data=!3m1!4b1!4m8!3m7!1s0x48670e8ed31682c1:0xd329acd9b12bb7c7!5m2!4m1!1i2!8m2!3d53.3513287!4d-6.2515908";

	location = new google.maps.LatLng(lat, lng);

	var mapOptions = {
	    zoom: 17,
	    center: location,
	    scrollwheel: false,
	    mapTypeControlOptions: {
	         mapTypeIds: [google.maps.MapTypeId.ROADMAP, 'tehgrayz']
	    }
	};

	map = new google.maps.Map(document.getElementById('map'), mapOptions);

	var mapType = new google.maps.StyledMapType(stylez, { name:"Ripley Court" });
	map.mapTypes.set('tehgrayz', mapType);
	map.setMapTypeId('tehgrayz');

  var icon = {
      url: "./images/ripley/ripley-google-marker.png", // url
      scaledSize: new google.maps.Size(60, 72), // scaled size
      origin: new google.maps.Point(0,0), // origin
      anchor: new google.maps.Point(0, 30) // anchor
  };

	var marker = new google.maps.Marker({
	    position: location,
	    map: map,
	    icon: icon,
      url: url
	});

  google.maps.event.addListener(marker, 'click', function() {
    window.location.href = this.url;
  });
}
