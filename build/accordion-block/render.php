<?php
/**
 * Accordion Block - Frontend render template.
 *
 * phpcs:disable WordPress.NamingConventions.PrefixAllGlobals
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$panels         = $attributes['panels'] ?? [];
$active_color   = $attributes['activeColor'] ?? '#0073aa';
$title_bg       = $attributes['titleBgColor'] ?? '#f5f5f5';
$content_bg     = $attributes['contentBgColor'] ?? '#ffffff';
$border_radius  = intval( $attributes['borderRadius'] ?? 4 );
$allow_multiple = ! empty( $attributes['allowMultiple'] );
$block_id       = 'gk-accordion-' . wp_unique_id();

if ( empty( $panels ) ) {
	return;
}
?>
<div
	<?php echo get_block_wrapper_attributes( [ // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped
		'class' => 'gk-accordion',
		'id'    => esc_attr( $block_id ),
	] ); ?>
	style="
		--gk-active-color: <?php echo esc_attr( $active_color ); ?>;
		--gk-title-bg: <?php echo esc_attr( $title_bg ); ?>;
		--gk-content-bg: <?php echo esc_attr( $content_bg ); ?>;
	"
	data-allow-multiple="<?php echo $allow_multiple ? 'true' : 'false'; ?>"
>
	<?php foreach ( $panels as $index => $panel ) : ?>
		<div
			class="gk-accordion__item"
			style="border-radius: <?php echo esc_attr( $border_radius ); ?>px; background-color: <?php echo esc_attr( $content_bg ); ?>;"
		>
			<h3 class="gk-accordion__header">
				<button
					class="gk-accordion__trigger"
					aria-expanded="false"
					aria-controls="<?php echo esc_attr( $block_id . '-panel-' . $index ); ?>"
					id="<?php echo esc_attr( $block_id . '-trigger-' . $index ); ?>"
					style="background-color: <?php echo esc_attr( $title_bg ); ?>; border-radius: <?php echo esc_attr( $border_radius ); ?>px <?php echo esc_attr( $border_radius ); ?>px 0 0;"
				>
					<?php echo esc_html( $panel['title'] ?? '' ); ?>
				</button>
			</h3>
			<div
				class="gk-accordion__panel"
				id="<?php echo esc_attr( $block_id . '-panel-' . $index ); ?>"
				aria-labelledby="<?php echo esc_attr( $block_id . '-trigger-' . $index ); ?>"
				role="region"
				aria-hidden="true"
			>
				<div class="gk-accordion__content">
					<?php echo wp_kses_post( $panel['content'] ?? '' ); ?>
				</div>
			</div>
		</div>
	<?php endforeach; ?>
</div>
