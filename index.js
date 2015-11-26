

$(document).ready(function(){


	// submit form	*
	var $tvShowsContainer = $('#app-body')
					.find('.tv-shows'); 

		$tvShowsContainer.on('click', 'button.like', function(ev){
			ev.preventDefault();
			var $this = $(this);

			$this.closest('.tv-show').toggleClass('liked')

			$this = $(this); // contexto de este button

			$this.animate({
				'font-size': '30px'

			},500);
		})
	function renderShows(shows){

		shows.forEach(function(show){
			$tvShowsContainer.find('.loader').remove()
		// console.log(shows);
		var article = template
			.replace(':name:', show.name)
			.replace(':img:', show.image.medium)
			.replace(':summary:', show.summary)
			;
		

		var $article = $(article);

		$tvShowsContainer
			.append($article.fadeIn(1500));
	})
	}



	$('#app-body').find('form').submit(function onsubmit(event){
		event.preventDefault();
		var busqueda = $(this)
		.find('input[type="text"]')
		.val();
		$tvShowsContainer.find('.tv-show').remove();
		var $loader = $('<div class="loader">');
		$loader.appendTo($tvShowsContainer);

		$.ajax({
		url: "http://api.tvmaze.com/search/shows",
		data: {q: busqueda},
		success: function(res, textSatus, xhr){
			$loader.remove();
			$tvShowsContainer.find(".tv-show").remove()
			var shows = res.map(function(element){

				return element.show
			})
			renderShows(shows);
		}


	});
	});

	var template = '<article class="tv-show">'+
					'<div class="left">'+
						'<img src=":img:" alt="">'+
					'</div>'+

					'<div class="left info">'+
						'<h1>:name:</h1>'+
						'<p>:summary:</p>'+
						'<button class="like">W</button>'+
					'</div>'+
				'</article>';


	if(!localStorage.shows){

		$.ajax("http://api.tvmaze.com/shows")
		.then(function(shows){
			 localStorage.shows = JSON.stringify(shows);
			$tvShowsContainer.find('.loader').remove();
			renderShows(shows);
		});
	}else{
			renderShows(JSON.parse(localStorage.shows));

	}

	
	











  // var a = $('<a>', {
  // 	href: 'http://platzi.com',
  // 	target: '_blank',
  // 	html: 'ir a platzi'
  // })

  // $('#app-body').append(a);


})