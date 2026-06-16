import { registerBlockType } from '@wordpress/blocks';
import { __ } from '@wordpress/i18n';
import {
	InspectorControls,
	PanelColorSettings,
	useBlockProps,
} from '@wordpress/block-editor';
import {
	PanelBody,
	Button,
	TextControl,
	TextareaControl,
	RangeControl,
	SelectControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import metadata from './block.json';
import './style.scss';
import './editor.scss';

function Edit( { attributes, setAttributes } ) {
	const { tabs, activeColor, borderRadius, alignment } = attributes;
	const [ activeTab, setActiveTab ] = useState( 0 );
	const blockProps = useBlockProps();

	const updateTab = ( index, key, value ) => {
		const updated = tabs.map( ( tab, i ) =>
			i === index ? { ...tab, [ key ]: value } : tab
		);
		setAttributes( { tabs: updated } );
	};

	const addTab = () => {
		setAttributes( {
			tabs: [ ...tabs, { label: `Tab ${ tabs.length + 1 }`, content: '' } ],
		} );
		setActiveTab( tabs.length );
	};

	const removeTab = ( index ) => {
		const updated = tabs.filter( ( _, i ) => i !== index );
		setAttributes( { tabs: updated } );
		setActiveTab( Math.max( 0, index - 1 ) );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Tab Settings', 'brandkit-blocks' ) } initialOpen={ true }>
					<SelectControl
						label={ __( 'Tab Alignment', 'brandkit-blocks' ) }
						value={ alignment }
						options={ [
							{ label: 'Left', value: 'left' },
							{ label: 'Center', value: 'center' },
							{ label: 'Right', value: 'right' },
						] }
						onChange={ ( val ) => setAttributes( { alignment: val } ) }
					/>
					<RangeControl
						label={ __( 'Border Radius (px)', 'brandkit-blocks' ) }
						value={ borderRadius }
						onChange={ ( val ) => setAttributes( { borderRadius: val } ) }
						min={ 0 }
						max={ 20 }
					/>
					{ tabs.map( ( tab, index ) => (
						<PanelBody
							key={ index }
							title={ tab.label || `Tab ${ index + 1 }` }
							initialOpen={ index === 0 }
						>
							<TextControl
								label={ __( 'Tab Label', 'brandkit-blocks' ) }
								value={ tab.label }
								onChange={ ( val ) => updateTab( index, 'label', val ) }
							/>
							<TextareaControl
								label={ __( 'Tab Content', 'brandkit-blocks' ) }
								value={ tab.content }
								onChange={ ( val ) => updateTab( index, 'content', val ) }
								rows={ 4 }
							/>
							{ tabs.length > 1 && (
								<Button
									isDestructive
									variant="secondary"
									onClick={ () => removeTab( index ) }
								>
									{ __( 'Remove Tab', 'brandkit-blocks' ) }
								</Button>
							) }
						</PanelBody>
					) ) }
					<Button variant="primary" onClick={ addTab } style={ { marginTop: '8px' } }>
						{ __( '+ Add Tab', 'brandkit-blocks' ) }
					</Button>
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Color Settings', 'brandkit-blocks' ) }
					colorSettings={ [
						{
							value: activeColor,
							onChange: ( val ) => setAttributes( { activeColor: val } ),
							label: __( 'Active Tab Color', 'brandkit-blocks' ),
						},
					] }
				/>
			</InspectorControls>

			<div { ...blockProps }>
				<div
					className="gk-tabs__nav"
					style={ { justifyContent: alignment } }
				>
					{ tabs.map( ( tab, index ) => (
						<button
							key={ index }
							className={ `gk-tabs__nav-btn${ activeTab === index ? ' is-active' : '' }` }
							style={ {
								borderRadius: `${ borderRadius }px ${ borderRadius }px 0 0`,
								...(activeTab === index
									? { borderBottomColor: activeColor, color: activeColor }
									: {} ),
							} }
							onClick={ () => setActiveTab( index ) }
						>
							{ tab.label }
						</button>
					) ) }
				</div>
				<div className="gk-tabs__panel">
					{ tabs[ activeTab ]?.content || __( 'Enter content in the sidebar.', 'brandkit-blocks' ) }
				</div>
			</div>
		</>
	);
}

registerBlockType( metadata.name, {
	edit: Edit,
	save: () => null,
} );
