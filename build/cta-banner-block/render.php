<?php
/**
 * CTA Banner Block - Frontend render template.
 *
 * phpcs:disable WordPress.NamingConventions.PrefixAllGlobals
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$headline      = $attributes['headline'] ?? '';
$subtext       = $attributes['subtext'] ?? '';
$button_label  = $attributes['buttonLabel'] ?? 'Get Started';
$button_url    = $attributes['buttonUrl'] ?? '#';
$button_target = ! empty( $attributes['buttonTarget'] ) ? '_blank' : '_self';
$bg_color      = $attributes['bgColor'] ?? '#0073aa';
$text_color    = $attributes['textColor'] ?? '#ffffff';
$btn_bg        = $attributes['btnBgColor'] ?? '#ffffff';
$btn_text      = $attributes['btnTextColor'] ?? '#0073aa';
$alignment     = $attributes['alignment'] ?? 'center';
$layout        = $attributes['layout'] ?? 'stacked';
$padding_v     = intval( $attributes['paddingV'] ?? 60 );
$radius        = intval( $attributes['borderRadius'] ?? 8 );
?>
<div <?php echo get_block_wrapper_attributes(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div
		class="gk-cta gk-cta--<?php echo esc_attr( $layout ); ?>"
		style="
			background-color:<?php echo esc_attr( $bg_color ); ?>;
			color:<?php echo esc_attr( $text_color ); ?>;
			text-align:<?php echo esc_attr( $alignment ); ?>;
			padding:<?php echo esc_attr( $padding_v ); ?>px 40px;
			border-radius:<?php echo esc_attr( $radius ); ?>px;
		"
	>
		<div class="gk-cta__text">
			<?php if ( $headline ) : ?>
				<h2 class="gk-cta__headline"><?php echo esc_html( $headline ); ?></h2>
			<?php endif; ?>
			<?php if ( $subtext ) : ?>
				<p class="gk-cta__subtext"><?php echo esc_html( $subtext ); ?></p>
			<?php endif; ?>
		</div>
		<?php if ( $button_label && $button_url ) : ?>
			<div class="gk-cta__action">
				<a
					class="gk-cta__btn"
					href="<?php echo esc_url( $button_url ); ?>"
					target="<?php echo esc_attr( $button_target ); ?>"
					<?php echo '_blank' === $button_target ? 'rel="noopener noreferrer"' : ''; ?>
					style="background-color:<?php echo esc_attr( $btn_bg ); ?>;color:<?php echo esc_attr( $btn_text ); ?>;"
				>
					<?php echo esc_html( $button_label ); ?>
				</a>
			</div>
		<?php endif; ?>
	</div>
</div>
