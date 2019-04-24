import React from 'react';
import PropTypes from 'prop-types';
import loadScript from '../utils/loadScript';

class Marmoset extends React.Component {
	constructor () {
		super();
		this.state = {
			loaded: false,
		};
	}

	componentDidMount () {
		loadScript('https://viewer.marmoset.co/main/marmoset.js').then(() => {
			this.viewer = new window.marmoset.WebViewer(window.innerWidth * 0.8, window.innerHeight * 0.6, this.props.file_url);
			this.container.appendChild(this.viewer.domRoot);
		});
	}

	componentWillUnmount () {
		if (this.viewer) {
			this.viewer.unload();
		}
	}

	render () {
		return (
			<div
				ref={(c) => (this.container = c)}
				style={{ background: '#000', width: '80vw', height: '60vh' }}
			/>
		);
	}
}

Marmoset.propTypes = {
	file_url: PropTypes.string.isRequired,
};

export default Marmoset;
