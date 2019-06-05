import PropTypes from 'prop-types';
import React from 'react';

import styles from './Thumbnail.css';

import marmosetThumb from '../assets/marmoset.png';
import rotatorThumb from '../assets/360_thumb.jpg';

function Thumbnail ({ index, src, thumbnail, active, onClick, type, custom, customThumbnailContent }, { theme }) {
	const customContent = custom && customThumbnailContent && customThumbnailContent({ type });

	let url;
	switch (true) {
		case type === 'marmoset':
			url = marmosetThumb;
			break;
		case type === 'rotator':
			url = rotatorThumb;
			break;
		case !!thumbnail:
			url = thumbnail;
			break;
		default:
			url = src;
	}

	return (
		<div
			className={`thumbnail ${active ? 'thumbnail-active' : ''} ${styles.thumbnail}`}
			style={{
				backgroundImage: customContent ? '' : 'url("' + url + '")',
				height: theme.thumbnail.height,
				margin: `0 ${theme.thumbnail.gutter}px`,
				width: theme.thumbnail.size,
				boxShadow: active ? `inset 0 0 0 2px ${theme.thumbnail.activeBorderColor}` : 'inset 0 0 0 1px hsla(0, 0%, 100%, .2)',
			}}
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				onClick(index);
			}}
		>
			{!!customContent && customContent}
		</div>
	);
}

Thumbnail.propTypes = {
	active: PropTypes.bool,
	index: PropTypes.number,
	onClick: PropTypes.func.isRequired,
	src: PropTypes.string,
	thumbnail: PropTypes.string,
};

Thumbnail.contextTypes = {
	theme: PropTypes.object.isRequired,
};

export default Thumbnail;
