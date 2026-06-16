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
	RangeControl,
	SelectControl,
	ToggleControl,
} from '@wordpress/components';
import metadata from './block.json';
import './style.scss';
import './editor.scss';

function Edit( { attributes, setAttributes } ) {
	const {
		headline, subtext, buttonLabel, buttonUrl, buttonTarget,
		bgColor, textColor, btnBgColor, btnTextColor,
		alignment, layout, paddingV, borderRadius,
	} = attributes;

	const blockProps = useBlockProps();
	const isInline = layout === 'inline';

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Content', 'brandkit-blocks' ) } initialOpen={ true }>
					<TextControl
						label={ __( 'Headline', 'brandkit-blocks' ) }
						value={ headline }
						onChange={ ( val ) => setAttributes( { headline: val } ) }
					/>
					<TextControl
						label={ __( 'Subtext', 'brandkit-blocks' ) }
						value={ subtext }
						onChange={ ( val ) => setAttributes( { subtext: val } ) }
					/>
					<TextControl
						label={ __( 'Button Label', 'brandkit-blocks' ) }
						value={ buttonLabel }
						onChange={ ( val ) => setAttributes( { buttonLabel: val } ) }
					/>
					<TextControl
						label={ __( 'Button URL', 'brandkit-blocks' ) }
						value={ buttonUrl }
						onChange={ ( val ) => setAttributes( { buttonUrl: val } ) }
					/>
					<ToggleControl
						label={ __( 'Open in new tab', 'brandkit-blocks' ) }
						checked={ buttonTarget }
						onChange={ ( val ) => setAttributes( { buttonTarget: val } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Layout', 'brandkit-blocks' ) } initialOpen={ false }>
					<SelectControl
						label={ __( 'Layout', 'brandkit-blocks' ) }
						value={ layout }
						options={ [
							{ label: 'Stacked', value: 'stacked' },
							{ label: 'Inline (text + button side by side)', value: 'inline' },
						] }
						onChange={ ( val ) => setAttributes( { layout: val } ) }
					/>
					<SelectControl
						label={ __( 'Text Alignment', 'brandkit-blocks' ) }
						value={ alignment }
						options={ [
							{ label: 'Left', value: 'left' },
							{ label: 'Center', value: 'center' },
							{ label: 'Right', value: 'right' },
						] }
						onChange={ ( val ) => setAttributes( { alignment: val } ) }
					/>
					<RangeControl
						label={ __( 'Vertical Padding (px)', 'brandkit-blocks' ) }
						value={ paddingV }
						onChange={ ( val ) => setAttributes( { paddingV: val } ) }
						min={ 16 }
						max={ 120 }
					/>
					<RangeControl
						label={ __( 'Border Radius (px)', 'brandkit-blocks' ) }
						value={ borderRadius }
						onChange={ ( val ) => setAttributes( { borderRadius: val } ) }
						min={ 0 }
						max={ 32 }
					/>
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Colors', 'brandkit-blocks' ) }
					colorSettings={ [
						{ value: bgColor,      onChange: ( v ) => setAttributes( { bgColor: v } ),      label: __( 'Background', 'brandkit-blocks' ) },
						{ value: textColor,    onChange: ( v ) => setAttributes( { textColor: v } ),    label: __( 'Text Color', 'brandkit-blocks' ) },
						{ value: btnBgColor,   onChange: ( v ) => setAttributes( { btnBgColor: v } ),   label: __( 'Button Background', 'brandkit-blocks' ) },
						{ value: btnTextColor, onChange: ( v ) => setAttributes( { btnTextColor: v } ), label: __( 'Button Text', 'brandkit-blocks' ) },
					] }
				/>
			</InspectorControls>

			<div { ...blockProps }>
				<div
					className={ `gk-cta gk-cta--${ layout }` }
					style={ {
						backgroundColor: bgColor,
						color: textColor,
						textAlign: alignment,
						padding: `${ paddingV }px 40px`,
						borderRadius: `${ borderRadius }px`,
					} }
				>
					<div className="gk-cta__text">
						{ headline && <h2 className="gk-cta__headline">{ headline }</h2> }
						{ subtext  && <p  className="gk-cta__subtext">{ subtext }</p> }
					</div>
					<div className="gk-cta__action">
						<span
							className="gk-cta__btn"
							style={ { backgroundColor: btnBgColor, color: btnTextColor } }
						>
							{ buttonLabel }
						</span>
					</div>
				</div>
			</div>
		</>
	);
}

registerBlockType( metadata.name, {
	edit: Edit,
	save: () => null,
} );
