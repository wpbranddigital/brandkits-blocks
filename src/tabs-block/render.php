<?php
/**
 * Tabs Block - Frontend render template.
 *
 * @param array    $attributes Block attributes.
 * @param string   $content    Block inner content.
 * @param WP_Block $block      Block instance.
 *
 * phpcs:disable WordPress.NamingConventions.PrefixAllGlobals
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$tabs         = $attributes['tabs'] ?? [];
$active_color = $attributes['activeColor'] ?? '#0073aa';
$border_radius = intval( $attributes['borderRadius'] ?? 4 );
$alignment    = $attributes['alignment'] ?? 'left';
$block_id     = 'gk-tabs-' . wp_unique_id();

if ( empty( $tabs ) ) {
	return;
}
?>
<div
	<?php echo get_block_wrapper_attributes( [ 'class' => 'gk-tabs', 'id' => esc_attr( $block_id ) ] ); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>
	data-active-color="<?php echo esc_attr( $active_color ); ?>"
>
	<div class="gk-tabs__nav" style="justify-content: <?php echo esc_attr( $alignment ); ?>;" role="tablist">
		<?php foreach ( $tabs as $index => $tab ) : ?>
			<button
				class="gk-tabs__nav-btn<?php echo 0 === $index ? ' is-active' : ''; ?>"
				role="tab"
				aria-selected="<?php echo 0 === $index ? 'true' : 'false'; ?>"
				aria-controls="<?php echo esc_attr( $block_id . '-panel-' . $index ); ?>"
				id="<?php echo esc_attr( $block_id . '-tab-' . $index ); ?>"
				tabindex="<?php echo 0 === $index ? '0' : '-1'; ?>"
				style="border-radius: <?php echo esc_attr( $border_radius ); ?>px <?php echo esc_attr( $border_radius ); ?>px 0 0;"
			>
				<?php echo esc_html( $tab['label'] ?? '' ); ?>
			</button>
		<?php endforeach; ?>
	</div>

	<div class="gk-tabs__panels">
		<?php foreach ( $tabs as $index => $tab ) : ?>
			<div
				class="gk-tabs__panel<?php echo 0 === $index ? ' is-active' : ''; ?>"
				role="tabpanel"
				id="<?php echo esc_attr( $block_id . '-panel-' . $index ); ?>"
				aria-labelledby="<?php echo esc_attr( $block_id . '-tab-' . $index ); ?>"
				<?php echo 0 !== $index ? 'hidden' : ''; ?>
			>
				<?php echo wp_kses_post( $tab['content'] ?? '' ); ?>
			</div>
		<?php endforeach; ?>
	</div>
</div>
