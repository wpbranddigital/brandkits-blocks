( function () {
	const FOCUSABLE = 'a[href],button:not([disabled]),input,textarea,select,[tabindex]:not([tabindex="-1"])';

	function trapFocus( modal ) {
		const focusable = Array.from( modal.querySelectorAll( FOCUSABLE ) );
		if ( focusable.length === 0 ) return;
		const first     = focusable[ 0 ];
		const last      = focusable[ focusable.length - 1 ];

		if ( modal._trapHandler ) {
			modal.removeEventListener( 'keydown', modal._trapHandler );
		}

		function handler( e ) {
			if ( e.key !== 'Tab' ) return;
			if ( e.shiftKey ) {
				if ( document.activeElement === first ) { e.preventDefault(); last.focus(); }
			} else {
				if ( document.activeElement === last )  { e.preventDefault(); first.focus(); }
			}
		}

		modal.addEventListener( 'keydown', handler );
		modal._trapHandler = handler;
	}

	document.querySelectorAll( '.gk-popup-wrap' ).forEach( function ( wrap ) {
		const trigger = wrap.querySelector( '.gk-popup__trigger' );
		const overlay = wrap.querySelector( '.gk-popup__overlay' );
		const modal   = wrap.querySelector( '.gk-popup__modal' );
		const closeBtn = wrap.querySelector( '.gk-popup__close' );
		let previousFocus = null;

		if ( ! trigger || ! overlay ) return;

		function openPopup() {
			previousFocus = document.activeElement;
			overlay.classList.add( 'is-open' );
			overlay.setAttribute( 'aria-hidden', 'false' );
			document.body.style.overflow = 'hidden';
			trapFocus( modal );
			closeBtn && closeBtn.focus();
		}

		function closePopup() {
			overlay.classList.remove( 'is-open' );
			overlay.setAttribute( 'aria-hidden', 'true' );
			document.body.style.overflow = '';
			if ( modal._trapHandler ) {
				modal.removeEventListener( 'keydown', modal._trapHandler );
				modal._trapHandler = null;
			}
			previousFocus && previousFocus.focus();
		}

		trigger.addEventListener( 'click', openPopup );
		closeBtn && closeBtn.addEventListener( 'click', closePopup );

		overlay.addEventListener( 'click', function ( e ) {
			if ( e.target === overlay ) closePopup();
		} );

		document.addEventListener( 'keydown', function ( e ) {
			if ( e.key === 'Escape' && overlay.classList.contains( 'is-open' ) ) {
				closePopup();
			}
		} );
	} );
} )();
