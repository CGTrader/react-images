import React from 'react';
import PropTypes from 'prop-types';
import loadScript from '../utils/loadScript';

class Video extends React.Component {
	constructor () {
		super();
		this.state = {
			loaded: false,
		};
	}

	componentDidMount () {
		this.loadPlayer();
	}

	loadPlayer () {
		window.React = React;
		loadScript('https://unpkg.com/react-player@1.11.0/dist/ReactPlayer.js').then(() => this.setState({ loaded: true }));
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

		return (
			<div
				style={{
					position: 'absolute',
					left: inline ? '0' : '10%',
					width: inline ? '100%' : '80%',
					height: inline ? '100%' : '60%',
					background: '#000',
				}}
			>
				{
					this.state.loaded
					&& (
						<window.ReactPlayer
							config={{
								youtube: {
									playerVars: {
										disablekb: true,
									},
								},
							}}
							style={{
								position: 'absolute',
								width: '100%',
								height: '100%',
							}}
							url={url}
							playing={false}
							width="100%"
							height="100%"
						/>
					)
				}
			</div>
		);
	}
}

Video.propTypes = {
	external_id: PropTypes.string.isRequired,
	inline: PropTypes.bool,
	type: PropTypes.oneOf(['youtube', 'vimeo']),
};

export default Video;
