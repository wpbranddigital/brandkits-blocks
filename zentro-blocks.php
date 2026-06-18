<?php
/**
 * Plugin Name:       Zentro Blocks
 * Description:       A collection of interactive Gutenberg blocks: Tabs, Popup, Animated Counter, and CTA Banner.
 * Version:           1.0.0 
 * Requires at least: 6.5
 * Requires PHP:      7.4
 * Author:            WPBrand Digital
 * Author URI:        https://wpbranddigital.org
 * License:           GPL-2.0-or-later
 * License URI:       https://www.gnu.org/licenses/gpl-2.0.html
 * Text Domain:       zentro-blocks
 *
 * phpcs:disable WordPress.WP.I18n.TextDomainMismatch
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

function zentro_blocks_register_blocks() {
	$blocks = [
		'tabs-block',
		'popup-block',
		'animated-counter',
		'cta-banner-block',
		'accordion-block',
		'pricing-card-block',
	];

	foreach ( $blocks as $block ) {
		register_block_type( plugin_dir_path( __FILE__ ) . 'build/' . $block );
	}
}
add_action( 'init', 'zentro_blocks_register_blocks' );

function zentro_blocks_register_category( $categories, $block_editor_context ) {
	return array_merge(
		$categories,
		[
			[
				'slug'  => 'zentro-blocks',
				'title' => __( 'Zentro Blocks', 'zentro-blocks' ),
				'icon'  => 'admin-plugins',
			],
		]
	);
}
add_filter( 'block_categories_all', 'zentro_blocks_register_category', 10, 2 );
