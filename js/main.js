jQuery(l10n(function($, that){
	
	var $win = $(window),
	    $menu = $('#menu');

	that.init();

	that.on('change', function(){
		that.update('.l10n', 'l10n');
	});

	$.get('pictures.json', function(data){
		var $picwall = $('#foxmosa-gallery'),
		picwall = new PicWall($picwall, data),
		timer;

		picwall.on('afterResize', function(){
			$('#foxmosa-gallery div > div').fancybox({
				openEffect  : 'fade',
				closeEffect : 'fade',
				href: this.href
			});
		});

		function autoChange(){
			picwall.change();
			setTimeout(autoChange, 5000);
		};

		autoChange();

	});

	function hideMenu() {
		if ($menu.hasClass('show')) {
			$menu.removeClass('show');
		} else {
			$menu.addClass('show');
		}
	}

	function checkSize() {
		if ($win.width() < 950) {
			$menu.on('click', hideMenu);
		} else {
			$menu.off('click', hideMenu);
		}
	}

	$win.resize(checkSize);

	checkSize();

}));
