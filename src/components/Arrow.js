import PropTypes from 'prop-types';
import React from 'react';

import defaults from '../theme';
import Icon from './Icon';

import styles from './Arrow.css';

function Arrow ({
	direction,
	icon,
	onClick,
	size,
	...props
},
{
	theme,
}) {
	return (
		<button
			type="button"
			className={`arrow ${styles.arrow} ${styles[`arrow__size__${size}`]}`}
			onClick={onClick}
			onTouchEnd={onClick}
			style={{
				top: `calc(50% - ${defaults.thumbnail.size + defaults.thumbnail.gutter * 2}px)`,
				right: direction === 'right' ? defaults.container.gutter.horizontal : 'auto',
				left: direction === 'left' ? defaults.container.gutter.horizontal : 'auto',
				height: size === 'medium' ? defaults.arrow.height : defaults.thumbnail.size,
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
	style: {},
};
Arrow.contextTypes = {
	theme: PropTypes.object.isRequired,
};

export default Arrow;
