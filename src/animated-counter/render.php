<?php
/**
 * Animated Counter Block - Frontend render template.
 *
 * phpcs:disable WordPress.NamingConventions.PrefixAllGlobals
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$target      = intval( $attributes['targetNumber'] ?? 1000 );
$prefix      = $attributes['prefix'] ?? '';
$suffix      = $attributes['suffix'] ?? '+';
$label       = $attributes['label'] ?? '';
$duration    = intval( $attributes['duration'] ?? 2000 );
$num_color   = $attributes['numberColor'] ?? '#0073aa';
$lbl_color   = $attributes['labelColor'] ?? '#333333';
$num_size    = intval( $attributes['numberSize'] ?? 48 );
$lbl_size    = intval( $attributes['labelSize'] ?? 16 );
$alignment   = $attributes['alignment'] ?? 'center';
$separator   = ! empty( $attributes['separator'] );
?>
<div
	<?php echo get_block_wrapper_attributes( [ // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		'class'             => 'gk-counter',
		'data-target'       => esc_attr( $target ),
		'data-duration'     => esc_attr( $duration ),
		'data-prefix'       => esc_attr( $prefix ),
		'data-suffix'       => esc_attr( $suffix ),
		'data-separator'    => $separator ? 'true' : 'false',
		'style'             => 'text-align:' . esc_attr( $alignment ),
	] ); ?>
>
	<div
		class="gk-counter__number"
		aria-live="polite"
		style="color:<?php echo esc_attr( $num_color ); ?>;font-size:<?php echo esc_attr( $num_size ); ?>px;"
	>
		<?php echo esc_html( $prefix ); ?><span class="gk-counter__value">0</span><?php echo esc_html( $suffix ); ?>
	</div>
	<?php if ( $label ) : ?>
		<div
			class="gk-counter__label"
			style="color:<?php echo esc_attr( $lbl_color ); ?>;font-size:<?php echo esc_attr( $lbl_size ); ?>px;"
		>
			<?php echo esc_html( $label ); ?>
		</div>
	<?php endif; ?>
</div>
