import PropTypes from 'prop-types';
import React from 'react';

import styles from './Thumbnail.css';

import marmosetThumb from '../assets/marmoset.png';

function Thumbnail ({ index, src, thumbnail, active, onClick, type }, { theme }) {
	const url = type === 'marmoset' ? marmosetThumb : thumbnail ? thumbnail : src;

	return (
		<div
			className={`thumbnail ${active ? 'thumbnail-active' : ''} ${styles.thumbnail}`}
			style={{
				backgroundImage: 'url("' + url + '")',
				height: theme.thumbnail.size,
				margin: theme.thumbnail.gutter,
				width: theme.thumbnail.size,
				boxShadow: active ? `inset 0 0 0 2px ${theme.thumbnail.activeBorderColor}` : 'inset 0 0 0 1px hsla(0, 0%, 100%, .2)',
			}}
			onClick={(e) => {
				e.preventDefault();
				e.stopPropagation();
				onClick(index);
			}}
		/>
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
