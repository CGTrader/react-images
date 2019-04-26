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
			this.viewer = new window.marmoset.WebViewer(this.container.offsetWidth, this.container.offsetHeight, this.props.file_url);
			this.container.appendChild(this.viewer.domRoot);
			this.viewer.domRoot.getElementsByTagName('canvas')[0].style.left = 0;
		});
	}

	componentDidUpdate (props) {
		if (this.viewer && props.inline !== this.props.inline) {
			this.viewer.resize(this.container.offsetWidth, this.container.offsetHeight);
		}
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
				style={{ background: '#000', width: '100%', height: this.props.inline ? '100%' : '80%' }}
			/>
		);
	}
}

Marmoset.propTypes = {
	file_url: PropTypes.string.isRequired,
	inline: PropTypes.bool,
};

export default Marmoset;
