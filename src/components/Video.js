import React from 'react';
import PropTypes from 'prop-types';

class Video extends React.Component {
	constructor () {
		super();
		this.state = {
			VideoComponent: false,
		};
	}

	componentDidMount () {
		this.loadPlayer();
	}

	loadPlayer () {
		require(['react-player'], (mod) => this.setState({ VideoComponent: mod.default }));
	}

	makeVideoUrl () {
		const {
			type,
			external_id,
		} = this.props;

		switch (type) {
			case 'youtube':
				return `https://www.youtube.com/watch?v=${external_id}`;
			case 'vimeo':
				return `https://www.vimeo.com/${external_id}`;
			default:
				return null;
		}
	}

	render () {
		const { inline } = this.props;
		const url = this.makeVideoUrl();

		const Component = this.state.VideoComponent || 'div';

		let componentProps = {
			style: {
				position: 'absolute',
				width: inline ? '100%' : '80vw',
				height: inline ? '100%' : '60vh',
				transform: inline ? '' : 'translate(-50%, -50%)',
				background: '#000',
			},
		};

		if (this.state.VideoComponent && url) {
			componentProps = {
				...componentProps,
				url,
				playing: false,
				width: inline ? '100%' : '0',
				height: inline ? '100%' : '0',
			};
		}

		return (
			<Component
				{...componentProps}
			/>
		);
	}
}

Video.propTypes = {
	external_id: PropTypes.string.isRequired,
	inline: PropTypes.bool,
	type: PropTypes.oneOf(['youtube', 'vimeo']),
};

export default Video;
