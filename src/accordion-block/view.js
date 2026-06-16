( function () {
	document.querySelectorAll( '.gk-accordion' ).forEach( function ( accordion ) {
		const allowMultiple = accordion.dataset.allowMultiple === 'true';
		const items          = accordion.querySelectorAll( '.gk-accordion__item' );
		const triggers       = accordion.querySelectorAll( '.gk-accordion__trigger' );

		function toggle( index, forceState ) {
			const item = items[ index ];
			const trigger = triggers[ index ];
			const panel = item.querySelector( '.gk-accordion__panel' );
			if ( ! item || ! trigger || ! panel ) return;

			const isCurrentlyActive = item.classList.contains( 'is-active' );
			const willBeActive = typeof forceState === 'boolean' ? forceState : ! isCurrentlyActive;

			if ( willBeActive ) {
				// Close other items if multiple not allowed
				if ( ! allowMultiple ) {
					items.forEach( function ( otherItem, idx ) {
						if ( idx !== index && otherItem.classList.contains( 'is-active' ) ) {
							toggle( idx, false );
						}
					} );
				}
				item.classList.add( 'is-active' );
				trigger.setAttribute( 'aria-expanded', 'true' );
				panel.setAttribute( 'aria-hidden', 'false' );
			} else {
				item.classList.remove( 'is-active' );
				trigger.setAttribute( 'aria-expanded', 'false' );
				panel.setAttribute( 'aria-hidden', 'true' );
			}
		}

		triggers.forEach( function ( trigger, index ) {
			trigger.addEventListener( 'click', function () {
				toggle( index );
			} );

			trigger.addEventListener( 'keydown', function ( e ) {
				let next = index;
				if ( e.key === 'ArrowDown' ) next = ( index + 1 ) % triggers.length;
				if ( e.key === 'ArrowUp' )   next = ( index - 1 + triggers.length ) % triggers.length;
				if ( e.key === 'Home' )      next = 0;
				if ( e.key === 'End' )       next = triggers.length - 1;

				if ( next !== index ) {
					e.preventDefault();
					triggers[ next ].focus();
				}
			} );
		} );
	} );
} )();
