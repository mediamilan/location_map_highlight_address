$(function(){
	var hovering = false;
	$container = $('.locate');
	$selector = 'a';
	
	/* ----- Location Shake ----- */
	$count = $container.find($selector).size();
	
	var pos_L = []; //CREATE ARRAY
	var pos_T = []; //CREATE ARRAY
	
	for (n=2; n<$count+2; n++){
		$position = $container.find("a:nth-child(" + n + ")").position();
		$posL = $position.left;
		$posT = $position.top;
		
		//Create the array
		pos_L.push($posL);
		pos_T.push($posT);
	};
	
	
	var m_rand;
	var interval = null;
	interval = window.setInterval(function(){jitterLocation()},100);
	
	function jitterLocation() {
		for (n=1; n<$count+2; n++){
			var m_rand = Math.random();
			var rand_num = Math.floor((Math.random()*2)+30);
			var m_rand = m_rand < 0.5 ? -1*rand_num : rand_num;
			
			if (m_rand%2 == 0) {
				 $container.find("a:nth-child(" + n + ")").stop().animate({
					top: pos_T[n-2] + m_rand
				});
			} else {
				 $container.find("a:nth-child(" + n + ")").stop().animate({
					left: pos_L[n-2] + m_rand
				});
			};
		}
	} //END jitterLocation
	
	$container.find($selector).hover(function() {
			$container.find($selector).stop();
			$container.find($selector).removeClass("current");
			window.clearInterval(interval); 
		},function() {
			interval = window.setInterval(function(){jitterLocation()},100);
		}
	);
	
	/* ----- #tag click ----- */
		$container.find($selector).click(function(){
			attribute = $(this).attr('href');
						
			setTimeout(function() { 
				$(attribute).css({'background':'#999485'});
			}, 200);
			
			$(attribute).delay(400).animate({
				opacity: 0.5
			}, 400, function(){
				$(attribute).animate({
					opacity: 1
				});
			});
			
			setTimeout(function() { 
				$(attribute).css({'background':'transparent'});
			}, 800);
			
		});
	/* ----- end #tag click ----- */
	
});