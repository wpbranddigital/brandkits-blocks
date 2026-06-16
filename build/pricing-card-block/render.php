<?php
/**
 * Pricing Card Block - Frontend render template.
 *
 * phpcs:disable WordPress.NamingConventions.PrefixAllGlobals
 */

if ( ! defined( 'ABSPATH' ) ) {
	exit;
}

$plan_title      = $attributes['planTitle'] ?? 'Standard Plan';
$price           = $attributes['price'] ?? '29';
$currency_symbol = $attributes['currencySymbol'] ?? '$';
$billing_period  = $attributes['billingPeriod'] ?? '/month';
$features        = $attributes['features'] ?? [];
$badge_text      = $attributes['badgeText'] ?? '';
$button_label    = $attributes['buttonLabel'] ?? 'Get Started';
$button_url      = $attributes['buttonUrl'] ?? '#';
$button_target   = ! empty( $attributes['buttonTarget'] ) ? '_blank' : '_self';
$card_bg_color   = $attributes['cardBgColor'] ?? '#ffffff';
$text_color      = $attributes['textColor'] ?? '#333333';
$primary_color   = $attributes['primaryColor'] ?? '#0073aa';
$btn_text_color  = $attributes['btnTextColor'] ?? '#ffffff';
$border_radius   = intval( $attributes['borderRadius'] ?? 8 );
$is_popular      = ! empty( $attributes['isPopular'] );

$card_classes = 'gk-pricing-card';
if ( $is_popular ) {
	$card_classes .= ' gk-pricing-card--popular';
}
?>

<div <?php echo get_block_wrapper_attributes(); // phpcs:ignore WordPress.Security.EscapeOutput.OutputNotEscaped ?>>
	<div
		class="<?php echo esc_attr( $card_classes ); ?>"
		style="
			background-color: <?php echo esc_attr( $card_bg_color ); ?>;
			color: <?php echo esc_attr( $text_color ); ?>;
			border-radius: <?php echo esc_attr( $border_radius ); ?>px;
			--gk-pricing-primary: <?php echo esc_attr( $primary_color ); ?>;
			--gk-pricing-btn-text: <?php echo esc_attr( $btn_text_color ); ?>;
		"
	>
		<?php if ( $is_popular && $badge_text ) : ?>
			<span class="gk-pricing-card__badge">
				<?php echo esc_html( $badge_text ); ?>
			</span>
		<?php endif; ?>

		<h3 class="gk-pricing-card__title" style="color: <?php echo esc_attr( $primary_color ); ?>;">
			<?php echo esc_html( $plan_title ); ?>
		</h3>

		<div class="gk-pricing-card__price-wrap">
			<span class="gk-pricing-card__currency"><?php echo esc_html( $currency_symbol ); ?></span>
			<span class="gk-pricing-card__price"><?php echo esc_html( $price ); ?></span>
			<span class="gk-pricing-card__period"><?php echo esc_html( $billing_period ); ?></span>
		</div>

		<?php if ( ! empty( $features ) ) : ?>
			<ul class="gk-pricing-card__features">
				<?php foreach ( $features as $feature ) : ?>
					<?php if ( $feature ) : ?>
						<li class="gk-pricing-card__feature">
							<?php echo esc_html( $feature ); ?>
						</li>
					<?php endif; ?>
				<?php endforeach; ?>
			</ul>
		<?php endif; ?>

		<?php if ( $button_label && $button_url ) : ?>
			<a
				class="gk-pricing-card__button"
				href="<?php echo esc_url( $button_url ); ?>"
				target="<?php echo esc_attr( $button_target ); ?>"
				<?php echo '_blank' === $button_target ? 'rel="noopener" noreferrer' : ''; ?>
				style="
					background-color: <?php echo esc_attr( $primary_color ); ?>;
					color: <?php echo esc_attr( $btn_text_color ); ?>;
				"
			>
				<?php echo esc_html( $button_label ); ?>
			</a>
		<?php endif; ?>
	</div>
</div>
