import React from 'react';
import PropTypes from 'prop-types';
import loadScript from '../utils/loadScript';

class Marmoset extends React.Component {
	constructor () {
		super();
		this.state = {
			loaded: false,
		};
		this.initViewer = this.initViewer.bind(this);
		this.destroyViewer = this.destroyViewer.bind(this);
	}

	componentDidMount () {
		loadScript('https://viewer.marmoset.co/main/marmoset.js').then(this.initViewer);
	}

	componentDidUpdate (props) {
		if (this.viewer && props.inline !== this.props.inline) {
			this.viewer.resize(this.container.offsetWidth, this.container.offsetHeight);
		}
		if (this.props.file_url !== props.file_url) {
			this.initViewer();
		}
	}

	componentWillUnmount () {
		this.destroyViewer();
		delete this.viewer;
	}

	initViewer () {
		this.destroyViewer();
		this.viewer = new window.marmoset.WebViewer(this.container.offsetWidth, this.container.offsetHeight, this.props.file_url);
		this.container.appendChild(this.viewer.domRoot);
		this.viewer.domRoot.getElementsByTagName('canvas')[0].style.left = 0;
	}

	destroyViewer () {
		if (this.viewer) {
			this.viewer.unload();
		}
	}

	render () {
		const inline = this.props.inline;

		return (
			<div
				key={this.props.file_url}
				ref={(c) => (this.container = c)}
				style={{
					position: 'absolute',
					background: '#000',
					width: inline ? '100%' : 'calc((-225px + 100vh) * 1.7777775)',
					height: inline ? '100%' : '100vh',
					maxHeight: inline ? 'none' : 'calc(-225px + 100vh)',
					left: inline ? '0' : '50%',
					transform: inline ? 'none' : 'translateX(-50%)',
				}}
			/>
		);
	}
}

Marmoset.propTypes = {
	file_url: PropTypes.string.isRequired,
	inline: PropTypes.bool,
};

export default Marmoset;
