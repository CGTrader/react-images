import PropTypes from 'prop-types';
import React from 'react';
import { css, StyleSheet } from '../aphrodite';

import deepMerge from '../utils/deepMerge';
import marmosetThumb from '../assets/marmoset.png';

function Thumbnail ({ index, src, thumbnail, active, onClick, type }, { theme }) {
	const defaultStyles = {
		thumbnail: {
			backgroundPosition: 'center',
			backgroundSize: 'cover',
			borderRadius: 2,
			boxShadow: 'inset 0 0 0 1px hsla(0,0%,100%,.2)',
			cursor: 'pointer',
			display: 'inline-block',
			height: theme.thumbnail.size,
			margin: theme.thumbnail.gutter,
			overflow: 'hidden',
			width: theme.thumbnail.size,
		},
		thumbnail__active: {
			boxShadow: `inset 0 0 0 2px ${theme.thumbnail.activeBorderColor}`,
		},
	};

	const url = type === 'marmoset' ? marmosetThumb : thumbnail ? thumbnail : src;
	const classes = StyleSheet.create(deepMerge(defaultStyles, theme));

	return (
		<div
			className={`thumbnail ${active ? 'thumbnail-active' : ''}`}
			style={{
				...classes.thumbnail._definition,
				...(active ? classes.thumbnail__active._definition : {}),
				backgroundImage: 'url("' + url + '")',
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
