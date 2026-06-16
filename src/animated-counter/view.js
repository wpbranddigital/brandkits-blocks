( function () {
	function easeOutQuad( t ) {
		return t * ( 2 - t );
	}

	function animateCounter( el ) {
		const target    = parseInt( el.dataset.target, 10 ) || 0;
		const duration  = parseInt( el.dataset.duration, 10 ) || 2000;
		const separator = el.dataset.separator === 'true';
		const valueEl   = el.querySelector( '.gk-counter__value' );

		if ( ! valueEl ) return;

		let start     = null;
		let animated  = false;

		function format( num ) {
			return separator ? num.toLocaleString() : String( num );
		}

		function step( timestamp ) {
			if ( ! start ) start = timestamp;
			const elapsed  = timestamp - start;
			const progress = Math.min( elapsed / duration, 1 );
			const eased    = easeOutQuad( progress );
			const current  = Math.round( eased * target );

			valueEl.textContent = format( current );

			if ( progress < 1 ) {
				requestAnimationFrame( step );
			} else {
				valueEl.textContent = format( target );
			}
		}

		if ( ! animated ) {
			animated = true;
			requestAnimationFrame( step );
		}
	}

	const observer = new IntersectionObserver(
		function ( entries ) {
			entries.forEach( function ( entry ) {
				if ( entry.isIntersecting ) {
					animateCounter( entry.target );
					observer.unobserve( entry.target );
				}
			} );
		},
		{ threshold: 0.3 }
	);

	document.querySelectorAll( '.gk-counter' ).forEach( function ( el ) {
		observer.observe( el );
	} );
} )();
