import PropTypes from 'prop-types';
import React, { Component } from 'react';

import Thumbnail from './Thumbnail';
import Arrow from './Arrow';

import styles from './PaginatedThumbnails.css';

export default class PaginatedThumbnails extends Component {
	constructor (props) {
		super(props);

		this.state = {
			width: 500,
		};
	}

	componentWillMount () {
		const theme = this.context.theme;

		this.arrowStyles = {
			height: theme.thumbnail.height,
		};
	}

	componentDidMount () {
		this.updateWidth();
	}

	updateWidth () {
		this.setState({ width: this.container.offsetWidth });
	}

	renderArrowPrev () {
		if (this.props.currentImage === 0) return null;

		return (
			<Arrow
				direction="left"
				size="small"
				icon="arrowLeft"
				onClick={this.props.onClickPrev}
				style={this.arrowStyles}
				title="Previous (Left arrow key)"
				type="button"
			/>
		);
	}
	renderArrowNext () {
		if (this.props.currentImage === this.props.images.length - 1) return null;

		return (
			<Arrow
				direction="right"
				size="small"
				icon="arrowRight"
				onClick={this.props.onClickNext}
				style={this.arrowStyles}
				title="Next (Right arrow key)"
				type="button"
			/>
		);
	}
	render () {
		const {
			images,
			currentImage,
			onClickThumbnail,
		} = this.props;

		const {
			width,
		} = this.state;

		const {
			theme,
		} = this.context;

		const padding = theme.thumbnail.sidePadding * 2 + theme.thumbnail.gutter * images.length;
		const calculatedWidth = width - padding;
		const perPage = Math.floor(calculatedWidth / theme.thumbnail.size);
		const page = Math.floor(((currentImage + 1) * theme.thumbnail.size) / calculatedWidth);
		const offset = page * perPage;
		const thumbnails = images.slice(offset, offset + perPage);

		return (
			<div
				ref={node => (this.container = node)}
				className={styles.paginatedThumbnails}
				style={{
					height: theme.thumbnail.height,
					marginTop: theme.thumbnail.gutter,
					marginBottom: theme.thumbnail.gutter,
					padding: `0 ${theme.thumbnail.sidePadding}px`,
					textAlign: this.props.inline ? 'left' : 'center',
				}}
			>
				{this.renderArrowPrev()}
				{thumbnails.map((img, idx) => (
					<Thumbnail key={offset + idx}
						{...img}
						index={offset + idx}
						onClick={onClickThumbnail}
						active={offset + idx === currentImage}
						customThumbnailContent={this.props.customThumbnailContent}
					/>
				))}
				{this.renderArrowNext()}
			</div>
		);
	}
}

PaginatedThumbnails.contextTypes = {
	theme: PropTypes.object.isRequired,
};

PaginatedThumbnails.propTypes = {
	currentImage: PropTypes.number,
	images: PropTypes.array,
	inline: PropTypes.bool,
	onClickThumbnail: PropTypes.func.isRequired,
};
