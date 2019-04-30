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

		const Component = this.state.VideoComponent;

		const commonProps = {
			style: {
				position: 'absolute',
				width: '100%',
				height: inline ? '100%' : '80%',
				background: '#000',
			},
		};

		return (
			<div {...commonProps}>
				{
					Component
					&& (
						<Component
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
