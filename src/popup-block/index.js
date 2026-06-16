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
	SelectControl,
} from '@wordpress/components';
import metadata from './block.json';
import './style.scss';
import './editor.scss';

function Edit( { attributes, setAttributes } ) {
	const {
		triggerLabel, popupTitle, popupContent,
		triggerBgColor, triggerTextColor,
		overlayOpacity, maxWidth, borderRadius, alignment,
	} = attributes;

	const blockProps = useBlockProps();

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Trigger Button', 'brandkit-blocks' ) } initialOpen={ true }>
					<TextControl
						label={ __( 'Button Label', 'brandkit-blocks' ) }
						value={ triggerLabel }
						onChange={ ( val ) => setAttributes( { triggerLabel: val } ) }
					/>
					<SelectControl
						label={ __( 'Alignment', 'brandkit-blocks' ) }
						value={ alignment }
						options={ [
							{ label: 'Left', value: 'left' },
							{ label: 'Center', value: 'center' },
							{ label: 'Right', value: 'right' },
						] }
						onChange={ ( val ) => setAttributes( { alignment: val } ) }
					/>
				</PanelBody>
				<PanelBody title={ __( 'Popup Content', 'brandkit-blocks' ) } initialOpen={ false }>
					<TextControl
						label={ __( 'Popup Title', 'brandkit-blocks' ) }
						value={ popupTitle }
						onChange={ ( val ) => setAttributes( { popupTitle: val } ) }
					/>
					<TextareaControl
						label={ __( 'Popup Content', 'brandkit-blocks' ) }
						value={ popupContent }
						onChange={ ( val ) => setAttributes( { popupContent: val } ) }
						rows={ 5 }
					/>
					<RangeControl
						label={ __( 'Max Width (px)', 'brandkit-blocks' ) }
						value={ maxWidth }
						onChange={ ( val ) => setAttributes( { maxWidth: val } ) }
						min={ 300 }
						max={ 900 }
					/>
					<RangeControl
						label={ __( 'Border Radius (px)', 'brandkit-blocks' ) }
						value={ borderRadius }
						onChange={ ( val ) => setAttributes( { borderRadius: val } ) }
						min={ 0 }
						max={ 24 }
					/>
					<RangeControl
						label={ __( 'Overlay Opacity (%)', 'brandkit-blocks' ) }
						value={ overlayOpacity }
						onChange={ ( val ) => setAttributes( { overlayOpacity: val } ) }
						min={ 10 }
						max={ 95 }
					/>
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Button Colors', 'brandkit-blocks' ) }
					colorSettings={ [
						{
							value: triggerBgColor,
							onChange: ( val ) => setAttributes( { triggerBgColor: val } ),
							label: __( 'Button Background', 'brandkit-blocks' ),
						},
						{
							value: triggerTextColor,
							onChange: ( val ) => setAttributes( { triggerTextColor: val } ),
							label: __( 'Button Text Color', 'brandkit-blocks' ),
						},
					] }
				/>
			</InspectorControls>

			<div { ...blockProps } style={ { textAlign: alignment } }>
				<button
					className="gk-popup__trigger"
					style={ {
						backgroundColor: triggerBgColor,
						color: triggerTextColor,
					} }
					disabled
				>
					{ triggerLabel }
				</button>
				<p className="gk-popup__editor-note">
					{ __( '↑ Preview trigger only. Configure popup in sidebar.', 'brandkit-blocks' ) }
				</p>
			</div>
		</>
	);
}

registerBlockType( metadata.name, {
	edit: Edit,
	save: () => null,
} );
