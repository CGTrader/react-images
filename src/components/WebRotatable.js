import React from 'react';

import styles from './WebRotatable.css';

class WebRotatable extends React.Component {
	constructor () {
		super();
		this.id = String(Math.floor(Math.random() * Math.floor(123456789123456789)));
	}

	componentDidMount () {
		window.INITWR360();
		const rotator = window.WR360.ImageRotator.Create(this.id);
		rotator.licenseCode = this.props.external_id;
		rotator.settings.disableRelativeAssets = true;
		rotator.settings.configFileURL = this.props.file_url;
		rotator.settings.googleEventTracking = false;
		rotator.settings.responsiveBaseWidth = 0;
		rotator.settings.responsiveMinHeight = 0;
		rotator.runImageRotator();
	}

	render () {
		return (
			<div
				id={this.id}
				className={this.props.inline ? styles.containerInline : styles.containerModal}
			/>
		);
	}
}

export default WebRotatable;
