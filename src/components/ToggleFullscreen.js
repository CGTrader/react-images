import React from 'react';
import { css, StyleSheet } from '../aphrodite-no-important';
import Icon from './Icon';

const defaultStyles = {
	icon: {
		cursor: 'pointer',
		position: 'absolute',
		top: 0,
		right: 0,
		padding: 10,
		background: 'rgba(0,0,0,0.6)',
	},
};

const ToggleFullscreen = ({ onClick }) => {
	const classes = StyleSheet.create(defaultStyles);
	return (
		<div
			className={css(classes.icon)}
			onClick={onClick}
		>
			<Icon type="fullScreen" />
		</div>
	);
};

export default ToggleFullscreen;
