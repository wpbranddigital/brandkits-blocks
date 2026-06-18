import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	PanelColorSettings,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	TextControl,
	TextareaControl,
	RangeControl,
	ToggleControl,
} from '@wordpress/components';
import metadata from './block.json';
import './style.scss';
import './editor.scss';

function Edit( { attributes, setAttributes } ) {
	const {
		planTitle, price, currencySymbol, billingPeriod, features,
		badgeText, buttonLabel, buttonUrl, buttonTarget,
		cardBgColor, textColor, primaryColor, btnTextColor,
		borderRadius, isPopular,
	} = attributes;

	const blockProps = useBlockProps();
	const featuresString = features.join('\n');

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Plan Details', 'zentro-blocks' ) } initialOpen={ true }>
					<TextControl
						label={ __( 'Plan Title', 'zentro-blocks' ) }
						value={ planTitle }
						onChange={ ( val ) => setAttributes( { planTitle: val } ) }
					/>
					<div style={ { display: 'flex', gap: '8px' } }>
						<TextControl
							label={ __( 'Currency', 'zentro-blocks' ) }
							value={ currencySymbol }
							onChange={ ( val ) => setAttributes( { currencySymbol: val } ) }
							style={ { width: '60px' } }
						/>
						<TextControl
							label={ __( 'Price', 'zentro-blocks' ) }
							value={ price }
							onChange={ ( val ) => setAttributes( { price: val } ) }
							style={ { flexGrow: 1 } }
						/>
						<TextControl
							label={ __( 'Period', 'zentro-blocks' ) }
							value={ billingPeriod }
							onChange={ ( val ) => setAttributes( { billingPeriod: val } ) }
						/>
					</div>
					<TextareaControl
						label={ __( 'Features (one per line)', 'zentro-blocks' ) }
						value={ featuresString }
						onChange={ ( val ) => setAttributes( { features: val.split( '\n' ) } ) }
						rows={ 5 }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Popular Badge & CTA', 'zentro-blocks' ) } initialOpen={ false }>
					<ToggleControl
						label={ __( 'Mark as Popular', 'zentro-blocks' ) }
						checked={ isPopular }
						onChange={ ( val ) => setAttributes( { isPopular: val } ) }
					/>
					{ isPopular && (
						<TextControl
							label={ __( 'Badge Text', 'zentro-blocks' ) }
							value={ badgeText }
							onChange={ ( val ) => setAttributes( { badgeText: val } ) }
						/>
					) }
					<TextControl
						label={ __( 'Button Label', 'zentro-blocks' ) }
						value={ buttonLabel }
						onChange={ ( val ) => setAttributes( { buttonLabel: val } ) }
					/>
					<TextControl
						label={ __( 'Button URL', 'zentro-blocks' ) }
						value={ buttonUrl }
						onChange={ ( val ) => setAttributes( { buttonUrl: val } ) }
					/>
					<ToggleControl
						label={ __( 'Open link in new tab', 'zentro-blocks' ) }
						checked={ buttonTarget }
						onChange={ ( val ) => setAttributes( { buttonTarget: val } ) }
					/>
				</PanelBody>

				<PanelBody title={ __( 'Card Styling', 'zentro-blocks' ) } initialOpen={ false }>
					<RangeControl
						label={ __( 'Border Radius (px)', 'zentro-blocks' ) }
						value={ borderRadius }
						onChange={ ( val ) => setAttributes( { borderRadius: val } ) }
						min={ 0 }
						max={ 24 }
					/>
				</PanelBody>

				<PanelColorSettings
					title={ __( 'Color Settings', 'zentro-blocks' ) }
					colorSettings={ [
						{
							value: primaryColor,
							onChange: ( val ) => setAttributes( { primaryColor: val } ),
							label: __( 'Primary/Brand Color', 'zentro-blocks' ),
						},
						{
							value: cardBgColor,
							onChange: ( val ) => setAttributes( { cardBgColor: val } ),
							label: __( 'Card Background', 'zentro-blocks' ),
						},
						{
							value: textColor,
							onChange: ( val ) => setAttributes( { textColor: val } ),
							label: __( 'Text Color', 'zentro-blocks' ),
						},
						{
							value: btnTextColor,
							onChange: ( val ) => setAttributes( { btnTextColor: val } ),
							label: __( 'Button Text Color', 'zentro-blocks' ),
						},
					] }
				/>
			</InspectorControls>

			<div { ...blockProps }>
				<div
					className={ `gk-pricing-card${ isPopular ? ' gk-pricing-card--popular' : '' }` }
					style={ {
						backgroundColor: cardBgColor,
						color: textColor,
						borderRadius: `${ borderRadius }px`,
						'--gk-pricing-primary': primaryColor,
						'--gk-pricing-btn-text': btnTextColor,
					} }
				>
					{ isPopular && badgeText && (
						<span className="gk-pricing-card__badge">{ badgeText }</span>
					) }

					<h3 className="gk-pricing-card__title" style={ { color: primaryColor } }>
						{ planTitle }
					</h3>

					<div className="gk-pricing-card__price-wrap">
						<span className="gk-pricing-card__currency">{ currencySymbol }</span>
						<span className="gk-pricing-card__price">{ price }</span>
						<span className="gk-pricing-card__period">{ billingPeriod }</span>
					</div>

					<ul className="gk-pricing-card__features">
						{ features.map( ( feature, index ) => (
							feature ? (
								<li key={ index } className="gk-pricing-card__feature">
									{ feature }
								</li>
							) : null
						) ) }
					</ul>

					{ buttonLabel && (
						<span
							className="gk-pricing-card__button"
							style={ {
								backgroundColor: primaryColor,
								color: btnTextColor,
							} }
						>
							{ buttonLabel }
						</span>
					) }
				</div>
			</div>
		</>
	);
}

registerBlockType( metadata.name, {
	edit: Edit,
	save: () => null,
} );
