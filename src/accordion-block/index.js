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
	ToggleControl,
} from '@wordpress/components';
import { useState } from '@wordpress/element';
import metadata from './block.json';
import './style.scss';
import './editor.scss';

function Edit( { attributes, setAttributes } ) {
	const { panels, activeColor, titleBgColor, contentBgColor, borderRadius, allowMultiple } = attributes;
	const [ editingIndex, setEditingIndex ] = useState( 0 );
	const blockProps = useBlockProps();

	const updatePanel = ( index, key, value ) => {
		const updated = panels.map( ( panel, i ) =>
			i === index ? { ...panel, [ key ]: value } : panel
		);
		setAttributes( { panels: updated } );
	};

	const addPanel = () => {
		setAttributes( {
			panels: [ ...panels, { title: `Accordion Item ${ panels.length + 1 }`, content: '' } ],
		} );
		setEditingIndex( panels.length );
	};

	const removePanel = ( index ) => {
		const updated = panels.filter( ( _, i ) => i !== index );
		setAttributes( { panels: updated } );
		setEditingIndex( Math.max( 0, index - 1 ) );
	};

	return (
		<>
			<InspectorControls>
				<PanelBody title={ __( 'Accordion Settings', 'zentro-blocks' ) } initialOpen={ true }>
					<ToggleControl
						label={ __( 'Allow multiple open panels', 'zentro-blocks' ) }
						checked={ allowMultiple }
						onChange={ ( val ) => setAttributes( { allowMultiple: val } ) }
					/>
					<RangeControl
						label={ __( 'Border Radius (px)', 'zentro-blocks' ) }
						value={ borderRadius }
						onChange={ ( val ) => setAttributes( { borderRadius: val } ) }
						min={ 0 }
						max={ 20 }
					/>
					{ panels.map( ( panel, index ) => (
						<PanelBody
							key={ index }
							title={ panel.title || `Item ${ index + 1 }` }
							initialOpen={ index === 0 }
						>
							<TextControl
								label={ __( 'Item Title', 'zentro-blocks' ) }
								value={ panel.title }
								onChange={ ( val ) => updatePanel( index, 'title', val ) }
							/>
							<TextareaControl
								label={ __( 'Item Content', 'zentro-blocks' ) }
								value={ panel.content }
								onChange={ ( val ) => updatePanel( index, 'content', val ) }
								rows={ 4 }
							/>
							{ panels.length > 1 && (
								<Button
									isDestructive
									variant="secondary"
									onClick={ () => removePanel( index ) }
								>
									{ __( 'Remove Item', 'zentro-blocks' ) }
								</Button>
							) }
						</PanelBody>
					) ) }
					<Button variant="primary" onClick={ addPanel } style={ { marginTop: '8px' } }>
						{ __( '+ Add Item', 'zentro-blocks' ) }
					</Button>
				</PanelBody>
				<PanelColorSettings
					title={ __( 'Color Settings', 'zentro-blocks' ) }
					colorSettings={ [
						{
							value: activeColor,
							onChange: ( val ) => setAttributes( { activeColor: val } ),
							label: __( 'Active Indicator Color', 'zentro-blocks' ),
						},
						{
							value: titleBgColor,
							onChange: ( val ) => setAttributes( { titleBgColor: val } ),
							label: __( 'Title Background', 'zentro-blocks' ),
						},
						{
							value: contentBgColor,
							onChange: ( val ) => setAttributes( { contentBgColor: val } ),
							label: __( 'Content Background', 'zentro-blocks' ),
						},
					] }
				/>
			</InspectorControls>

			<div { ...blockProps }>
				<div
					className="gk-accordion"
					style={ {
						'--gk-active-color': activeColor,
						'--gk-title-bg': titleBgColor,
						'--gk-content-bg': contentBgColor,
					} }
				>
					{ panels.map( ( panel, index ) => (
						<div
							key={ index }
							className={ `gk-accordion__item${ editingIndex === index ? ' is-active' : '' }` }
							style={ {
								borderRadius: `${ borderRadius }px`,
								backgroundColor: contentBgColor,
								borderColor: editingIndex === index ? activeColor : undefined,
							} }
						>
							<h3 className="gk-accordion__header">
								<button
									className="gk-accordion__trigger"
									style={ {
										backgroundColor: titleBgColor,
										borderRadius: `${ borderRadius }px ${ borderRadius }px 0 0`,
										color: editingIndex === index ? activeColor : undefined,
									} }
									onClick={ () => setEditingIndex( editingIndex === index ? -1 : index ) }
								>
									{ panel.title }
								</button>
							</h3>
							{ editingIndex === index && (
								<div className="gk-accordion__panel" style={ { display: 'block' } }>
									<div className="gk-accordion__content" style={ { padding: '20px' } }>
										{ panel.content || __( 'Enter item content in the sidebar.', 'zentro-blocks' ) }
									</div>
								</div>
							) }
						</div>
					) ) }
				</div>
			</div>
		</>
	);
}

registerBlockType( metadata.name, {
	edit: Edit,
	save: () => null,
} );
