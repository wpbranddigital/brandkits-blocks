<?php
/**
 * Popup Block - Frontend render template.
 *
 * phpcs:disable WordPress.NamingConventions.PrefixAllGlobals
 * phpcs:disable WordPress.WP.I18n.TextDomainMismatch
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$trigger_label   = $attributes['triggerLabel'] ?? 'Open Popup';
$popup_title     = $attributes['popupTitle'] ?? '';
$popup_content   = $attributes['popupContent'] ?? '';
$trigger_bg      = $attributes['triggerBgColor'] ?? '#0073aa';
$trigger_text    = $attributes['triggerTextColor'] ?? '#ffffff';
$overlay_opacity = intval( $attributes['overlayOpacity'] ?? 80 ) / 100;
$max_width       = intval( $attributes['maxWidth'] ?? 560 );
$border_radius   = intval( $attributes['borderRadius'] ?? 8 );
$alignment       = $attributes['alignment'] ?? 'left';
$popup_id        = 'gk-popup-' . wp_unique_id();
?>

<div <?php echo get_block_wrapper_attributes( [ 'class' => 'gk-popup-wrap', 'style' => 'text-align:' . esc_attr( $alignment ) ] ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<button
		class="gk-popup__trigger"
		aria-haspopup="dialog"
		aria-controls="<?php echo esc_attr( $popup_id ); ?>"
		style="background-color:<?php echo esc_attr( $trigger_bg ); ?>;color:<?php echo esc_attr( $trigger_text ); ?>;"
	>
		<?php echo esc_html( $trigger_label ); ?>
	</button>

	<div
		class="gk-popup__overlay"
		id="<?php echo esc_attr( $popup_id ); ?>"
		role="dialog"
		aria-modal="true"
		aria-label="<?php echo esc_attr( $popup_title ); ?>"
		aria-hidden="true"
		style="background-color: rgba(0,0,0,<?php echo esc_attr( $overlay_opacity ); ?>);"
	>
		<div
			class="gk-popup__modal"
			style="max-width:<?php echo esc_attr( $max_width ); ?>px;border-radius:<?php echo esc_attr( $border_radius ); ?>px;"
		>
			<div class="gk-popup__header">
				<?php if ( $popup_title ) : ?>
					<h2 class="gk-popup__title"><?php echo esc_html( $popup_title ); ?></h2>
				<?php endif; ?>
				<button class="gk-popup__close" aria-label="<?php esc_attr_e( 'Close popup', 'zentro-blocks' ); ?>">
					<span aria-hidden="true">&times;</span>
				</button>
			</div>
			<div class="gk-popup__content">
				<?php echo wp_kses_post( $popup_content ); ?>
			</div>
		</div>
	</div>
</div>
