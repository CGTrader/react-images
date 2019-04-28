import PropTypes from 'prop-types';
import React from 'react';
import { css, StyleSheet } from '../aphrodite';

import defaults from '../theme';
import deepMerge from '../utils/deepMerge';
import Icon from './Icon';

function Arrow ({
	direction,
	icon,
	onClick,
	size,
	...props,
},
{
	theme,
}) {
	const classes = StyleSheet.create(deepMerge(defaultStyles, theme));

	return (
		<button
			type="button"
			className={`arrow ${size}`}
			onClick={onClick}
			onTouchEnd={onClick}
			{...props}
			style={{
				...classes.arrow._definition,
				...classes['arrow__direction__' + direction]._definition,
				...classes['arrow__size__' + size]._definition,
				...props.style,
			}}
		>
			<Icon fill={!!theme.arrow && theme.arrow.fill || defaults.arrow.fill} type={icon} />
		</button>
	);
}

Arrow.propTypes = {
	direction: PropTypes.oneOf(['left', 'right']),
	icon: PropTypes.string,
	onClick: PropTypes.func.isRequired,
	size: PropTypes.oneOf(['medium', 'small']).isRequired,
};
Arrow.defaultProps = {
	size: 'medium',
};
Arrow.contextTypes = {
	theme: PropTypes.object.isRequired,
};

const defaultStyles = {
	arrow: {
		background: 'none',
		border: 'none',
		borderRadius: 4,
		cursor: 'pointer',
		outline: 'none',
		padding: 0,
		position: 'absolute',
		top: `calc(50% - ${defaults.thumbnail.size + defaults.thumbnail.gutter * 2}px)`,

		// disable user select
		WebkitTouchCallout: 'none',
		userSelect: 'none',
	},

	// sizes
	arrow__size__medium: {
		height: defaults.arrow.height,
		marginTop: defaults.thumbnail.size / -2,
		width: 40,
		'@media (minWidth: 768px)': {
			width: 70,
		},
	},
	arrow__size__small: {
		height: defaults.thumbnail.size,
		marginTop: defaults.thumbnail.size / -2,
		width: 30,
		padding: 5,
		'@media (minWidth: 500px)': {
			width: 40,
		},
	},

	// direction
	arrow__direction__right: {
		right: defaults.container.gutter.horizontal,
	},
	arrow__direction__left: {
		left: defaults.container.gutter.horizontal,
	},
};

export default Arrow;
