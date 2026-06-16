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
		targetNumber, prefix, suffix, label, duration,
		numberColor, labelColor, numberSize, labelSize, alignment, separator,
	} = attributes;

	const blockProps = useBlockProps( { style: { textAlign: alignment } } );

	const formatted = separator
		? targetNumber.toLocaleString()
		: targetNumber;

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Counter Settings', 'brandkit-blocks' ) } initialOpen={ true }>
					<TextControl
						type="number"
						label={ __( 'Target Number', 'brandkit-blocks' ) }
						value={ targetNumber }
						onChange={ ( val ) => setAttributes( { targetNumber: parseInt( val ) || 0 } ) }
					/>
					<TextControl
						label={ __( 'Prefix (e.g. $)', 'brandkit-blocks' ) }
						value={ prefix }
						onChange={ ( val ) => setAttributes( { prefix: val } ) }
					/>
					<TextControl
						label={ __( 'Suffix (e.g. +, %)', 'brandkit-blocks' ) }
						value={ suffix }
						onChange={ ( val ) => setAttributes( { suffix: val } ) }
					/>
					<TextControl
						label={ __( 'Label', 'brandkit-blocks' ) }
						value={ label }
						onChange={ ( val ) => setAttributes( { label: val } ) }
					/>
					<RangeControl
						label={ __( 'Animation Duration (ms)', 'brandkit-blocks' ) }
						value={ duration }
						onChange={ ( val ) => setAttributes( { duration: val } ) }
						min={ 500 }
						max={ 5000 }
						step={ 100 }
					/>
					<ToggleControl
						label={ __( 'Thousands Separator', 'brandkit-blocks' ) }
						checked={ separator }
						onChange={ ( val ) => setAttributes( { separator: val } ) }
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
					<RangeControl
						label={ __( 'Number Font Size (px)', 'brandkit-blocks' ) }
						value={ numberSize }
						onChange={ ( val ) => setAttributes( { numberSize: val } ) }
						min={ 24 }
						max={ 120 }
					/>
					<RangeControl
						label={ __( 'Label Font Size (px)', 'brandkit-blocks' ) }
						value={ labelSize }
						onChange={ ( val ) => setAttributes( { labelSize: val } ) }
						min={ 12 }
						max={ 32 }
					/>
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Color Settings', 'brandkit-blocks' ) }
					colorSettings={ [
						{
							value: numberColor,
							onChange: ( val ) => setAttributes( { numberColor: val } ),
							label: __( 'Number Color', 'brandkit-blocks' ),
						},
						{
							value: labelColor,
							onChange: ( val ) => setAttributes( { labelColor: val } ),
							label: __( 'Label Color', 'brandkit-blocks' ),
						},
					] }
				/>
			</InspectorControls>

			<div { ...blockProps }>
				<div
					className="gk-counter__number"
					style={ { color: numberColor, fontSize: `${ numberSize }px` } }
				>
					{ prefix }{ formatted }{ suffix }
				</div>
				{ label && (
					<div
						className="gk-counter__label"
						style={ { color: labelColor, fontSize: `${ labelSize }px` } }
					>
						{ label }
					</div>
				) }
			</div>
		</>
	);
}

registerBlockType( metadata.name, {
	edit: Edit,
	save: () => null,
} );
